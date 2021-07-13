import { createSlice, PayloadAction, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { KeyCode } from '../../types/key';
import { RootState } from '../index';
import { error, loader } from './commonSlice';

export type GameStatus = 'error' | 'open' | 'close' | 'init';

export interface GameReducerType {
    gameId?: number;
    serverUrl?: string;
    videoUrl?: string;
    actionKey?: KeyCode;
}

let initialState: GameReducerType = {};

export const onGameInfoChange = createAsyncThunk<
    string | void,
    { gameId?: number; serverUrl?: string },
    { rejectValue: string }
>('game/infoChange', async (params, thunkApi) => {
    try {
        thunkApi.dispatch(loader(true));
        thunkApi.dispatch(setGameInfo(params));
    } catch (err) {
        const errorMessage = err.message || 'Failed to update game info';
        thunkApi.dispatch(error(errorMessage));
        return thunkApi.rejectWithValue(errorMessage);
    } finally {
        thunkApi.dispatch(loader(false));
    }
});

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameInfo(state, action: PayloadAction<{ gameId?: number; serverUrl?: string }>) {
            state.gameId = action.payload.gameId;
            state.serverUrl = action.payload.serverUrl;
        },
        setVideoUrl(state, action: PayloadAction<string>) {
            state.videoUrl = action.payload;
        },
        setActionKey(state, action: PayloadAction<KeyCode | undefined>) {
            state.actionKey = action.payload;
        },
    },
});

export const selectGameInfo = createSelector(
    (state: RootState) => state.game,
    (gameState: GameReducerType) => ({
        gameId: gameState.gameId,
        serverUrl: gameState.serverUrl,
    }),
);

export const selectVideoUrl = createSelector(
    (state: RootState) => state.game,
    (gameState: GameReducerType) => ({
        videoUrl: gameState.videoUrl,
    }),
);

export const selectionActionKey = createSelector(
    (state: RootState) => state.game,
    (gameState: GameReducerType) => gameState.actionKey,
);

export const { setGameInfo, setVideoUrl, setActionKey } = gameSlice.actions;

export default gameSlice.reducer;
