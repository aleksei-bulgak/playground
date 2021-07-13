import { useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const url = (url: string, id: number) => `${url}/game/${id}/player`;

export type ServerEvent = 'message' | 'open' | 'close' | 'error';
export type Props = {
    gameId?: number;
    serverUrl?: string;
};

export const useWebSockets = ({ serverUrl, gameId }: Props) => {
    const [status, setStatus] = useState<ServerEvent | undefined>();
    const server = useRef<WebSocket>();

    useEffect(() => {
        const serverEventListener = (event: Event) => setStatus(event.type as ServerEvent);
        if (!status && !!gameId && !!serverUrl) {
            console.log(`Trying to establish connection with server with gameId ${gameId}`);
            server.current = new WebSocket(url(serverUrl, gameId));
            server.current.addEventListener('message', serverEventListener);
            server.current.addEventListener('open', serverEventListener);
            server.current.addEventListener('close', serverEventListener);
            server.current.addEventListener('error', serverEventListener);
        }
        console.log('rerender websocket effect', server.current, status, gameId, serverUrl);
        return () => {
            if (!!server.current && status === 'error') {
                console.log(`Closing connection with server`);
                server.current.removeEventListener('message', serverEventListener);
                server.current.removeEventListener('open', serverEventListener);
                server.current.removeEventListener('close', serverEventListener);
                server.current.removeEventListener('error', serverEventListener);
                server.current.close();
            }
        };
    }, [status, gameId, serverUrl]);

    useEffect(() => {
        //close connection on component destroy
        return () => server.current?.close();
    }, []);

    const onAction = useCallback(
        (data: string) => {
            if (!!server.current && status === 'open') {
                server.current.send(data);
            }
        },
        [status],
    );

    return { status, onAction };
};
