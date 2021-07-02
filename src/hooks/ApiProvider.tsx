import React, { createContext, useEffect, useMemo, useRef } from 'react';
import ApiServer from '../api/webSocketServer';

import { KeyCode, KeyType } from '../types/key';
import { Api } from '../types/api';
import { Store } from '../types/store';
import { useState } from 'react';

export const ApiContext = createContext<(Api & Store) | undefined>(undefined);

const ApiProvider: React.FC<{ sessionId?: number; videoId?: string; onError: () => void }> = ({
    sessionId,
    videoId,
    onError,
    children,
}) => {
    const serverRef = useRef<ApiServer>();
    const [store, setStore] = useState<Store>({});

    useEffect(() => {
        if (sessionId) {
            serverRef.current = new ApiServer(sessionId);
            serverRef.current.subscribe((status) => {
                if (status === 'close' || status === 'error') {
                    onError();
                }
            });
        }
        return () => serverRef.current?.close();
    }, [sessionId, onError]);

    useEffect(() => {
        setStore((prev) => ({ ...prev, sessionId, videoId }));
    }, [sessionId, videoId]);

    const api: Api = useMemo(
        () => ({
            onAction: (key: KeyCode, type: KeyType) =>
                serverRef.current?.sendMessage(`${key.toUpperCase()}_${type === 'keyup' ? 'UP' : 'DOWN'}`),
            subscribe: (callback) => console.log('subscription event', callback),
        }),
        [],
    );

    console.log('RERENDER !!!!!!!');

    return <ApiContext.Provider value={{ ...api, ...store }}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
