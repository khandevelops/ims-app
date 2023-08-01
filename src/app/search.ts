import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface SearchState {
    keyword: string;
}

const initialState: SearchState = {
    keyword: ''
};

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        getKeyword: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
        }
    }
});

export const { getKeyword } = searchSlice.actions;

export const selectKeyword = (state: RootState) => state.searchStore;

export default searchSlice.reducer;
