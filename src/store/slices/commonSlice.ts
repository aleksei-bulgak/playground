import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
export interface CommonState {
    loader: boolean;
    errorMessage: string | null;
}

let initialState: CommonState = {
    loader: true,
    errorMessage: null,
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        loader(state, action: PayloadAction<boolean>) {
            state.loader = action.payload;
        },
        error(state, action: PayloadAction<string | null>) {
            state.errorMessage = action.payload;
        },
        cleareError(state, action: PayloadAction<void>) {
            state.errorMessage = null;
        },
    },
});

export const selectError = createSelector(
    (state: RootState) => state.common,
    (commonState: CommonState) => commonState.errorMessage,
);

export const { loader, error, cleareError } = commonSlice.actions;

export default commonSlice.reducer;
