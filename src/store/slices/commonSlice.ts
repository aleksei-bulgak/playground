import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    },
});

export const { loader, error } = commonSlice.actions;

export default commonSlice.reducer;
