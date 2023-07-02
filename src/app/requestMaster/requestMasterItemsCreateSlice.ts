import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { IRequestMasterItem } from './requestMasterItemsSlice';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createRequestMasterItems = (state: string, requestMasterItems: IRequestMasterItem[]) => {
    return axios.post(`${baseUrl}/request-master/${state}/create`, requestMasterItems);
};

export interface IRequestMasterItemsCreateState {
    response: IRequestMasterItem[];
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMasterItemsCreateState = {
    response: [],
    status: 'idle'
};

export const createRequestMasterItemsThunk = createAsyncThunk(
    'createRequestItemsThunk',
    async (params: { state: string; requestMasterItems: IRequestMasterItem[] }) => {
        const response = await createRequestMasterItems(params.state, params.requestMasterItems);
        return response.data;
    }
);

export const requestMasterItemsCreateSlice = createSlice({
    name: 'requestItemsCreateSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRequestMasterItemsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createRequestMasterItemsThunk.fulfilled, (state, action) => {
                state.response = action.payload;
            })
            .addCase(createRequestMasterItemsThunk.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const selectRequestMasterItemsCreate = (state: RootState) => state.requestMasterItemsCreateStore;
export default requestMasterItemsCreateSlice.reducer;
