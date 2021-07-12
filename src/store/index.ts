import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import commonSlice from './slices/commonSlice';
import gameSlice from './slices/gameSlice';

export const store = configureStore({
    reducer: {
        common: commonSlice,
        game: gameSlice,
    },
    middleware: getDefaultMiddleware({ thunk: true }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
