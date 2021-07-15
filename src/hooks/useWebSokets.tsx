import { useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { error } from '../store/slices/commonSlice';
import { onGameInfoChange } from '../store/slices/gameSlice';

const url = (url: string, id: number) => `${url}/game/${id}/player`;

export type ServerEvent = 'message' | 'open' | 'close' | 'error';
export type Props = {
    gameId?: number;
    serverUrl?: string;
};

export const useWebSockets = ({ serverUrl, gameId }: Props) => {
    const [status, setStatus] = useState<ServerEvent | undefined>();
    const server = useRef<WebSocket>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const serverEventListener = (event: Event) => {
            setStatus(event.type as ServerEvent);
        };
        const serverErrorListener = (event: CloseEvent) => {
            dispatch(error(event.reason));
            setStatus(event.type as ServerEvent);
        };
        if (!status && gameId && serverUrl) {
            console.log(`Trying to establish connection with server with gameId ${gameId}`);
            console.log('rerender websocket effect', server.current, status, gameId, serverUrl);
            server.current = new WebSocket(url(serverUrl, gameId));
            server.current.addEventListener('message', serverEventListener);
            server.current.addEventListener('open', serverEventListener);
            server.current.addEventListener('close', serverErrorListener);
            server.current.addEventListener('error', serverEventListener);
        }
        return () => {
            if (!!server.current && (status === 'error' || status === 'close')) {
                console.log('Closing connection with server');
                server.current.removeEventListener('message', serverEventListener);
                server.current.removeEventListener('open', serverEventListener);
                server.current.removeEventListener('error', serverEventListener);
                server.current.removeEventListener('close', serverErrorListener);
                server.current.close();
                dispatch(onGameInfoChange({}));
            }
        };
    }, [status, gameId, serverUrl, dispatch]);

    useEffect(() => {
        const tearDown = () => {
            console.log('Closing connection with server');
            server.current?.close();
        }
        window.addEventListener('beforeunload', tearDown);
        //close connection on component destroy
        return () => {
            tearDown();
            window.removeEventListener('beforeunload', tearDown);
        };
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
