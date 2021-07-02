import { useEffect, useState } from 'react';
import Player from './components/player';
import Controls from './components/controls';
import ApiProvider from './hooks/ApiProvider';
import Loader from './components/loader';

import './App.css';
import { useCallback } from 'react';

type Info = {
    sessionId?: number;
    videoId?: string;
};

function App() {
    const [info, setInfo] = useState<Info>();
    const [failed, setFailed] = useState<boolean>(false);

    useEffect(() => {
        const sessionIdString = process.env.REACT_APP_SESSION_ID;
        const sessionId = sessionIdString ? +sessionIdString : undefined;
        const videoId = process.env.REACT_APP_VIDEO_ID;
        setInfo({ sessionId, videoId });
    }, []);

    const onError = useCallback(() => {
        setFailed((prev) => !prev);
    }, []);

    if (failed || !info?.sessionId || !info.videoId) {
        return <Loader />;
    }

    return (
        <ApiProvider sessionId={info.sessionId} videoId={info.videoId} onError={onError}>
            <div className="App">
                <Player />
                <Controls />
            </div>
        </ApiProvider>
    );
}

export default App;
