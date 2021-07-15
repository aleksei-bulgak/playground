import Player from '../components/player';
import Controls from '../components/controls';

import { useWebSockets } from '../hooks/useWebSokets';
import { useCallback } from 'react';
import { OnActionType } from '../components/controls/Controls';
import { KeyCode, KeyType } from '../types/key';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { onGameInfoChange, selectGameInfo } from '../store/slices/gameSlice';

function Game() {
    const { serverUrl, gameId } = useAppSelector(selectGameInfo);
    const { status, onAction } = useWebSockets({ serverUrl, gameId });
    const history = useHistory();
    const dispatch = useAppDispatch();

    const onKeyPress: OnActionType = useCallback(
        (keyCode: KeyCode, type: KeyType) => {
            onAction(`${keyCode.toUpperCase()}_${type === 'keyup' ? 'UP' : 'DOWN'}`);
        },
        [onAction],
    );

    useEffect(() => {
        if (status === 'close' || status === 'error' || (!serverUrl && !gameId && !status)) {
            dispatch(onGameInfoChange({}));
            history.replace('/login');
        }
    }, [status, history, dispatch, gameId, serverUrl]);

    return (
        <div className="game">
            <Player />
            <Controls onAction={onKeyPress} />
        </div>
    );
}

export default Game;
