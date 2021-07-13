import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export type GameStatus = 'error' | 'open' | 'close' | 'init';

export interface GameReducerType {
    gameId?: number;
    serverUrl?: string;
    videoUrl?: string;
}

let initialState: GameReducerType = {};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        onGameInfoChange(state, action: PayloadAction<{ gameId?: number; serverUrl?: string }>) {
            state.gameId = action.payload.gameId;
            state.serverUrl = action.payload.serverUrl;
        },
        setVideoUrl(state, action: PayloadAction<string>) {
            state.videoUrl = action.payload;
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

export const { onGameInfoChange, setVideoUrl } = gameSlice.actions;

export default gameSlice.reducer;
