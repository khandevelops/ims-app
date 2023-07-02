import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IRequestMasterItem } from './requestMasterItemsSlice';
import { RootState } from '../store';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const updateRequestMasterItems = (state: string, requestItems: IRequestMasterItem[]) => {
    return axios.patch(`${baseUrl}/request-master/${state}/update/items`, requestItems);
};

export interface IRequestMakeItemUpdateState {
    response: IRequestMasterItem[];
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMakeItemUpdateState = {
    response: [],
    status: 'idle'
};

export const updateRequestMasterItemsThunk = createAsyncThunk(
    'updateRequestMasterItemsThunk',
    async (params: { state: string; requestItems: IRequestMasterItem[] }) => {
        const response = await updateRequestMasterItems(params.state, params.requestItems);
        return response.data;
    }
);

export const requestMasterItemsUpdateSlice = createSlice({
    name: 'updateStoreRoomRequestSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateRequestMasterItemsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateRequestMasterItemsThunk.fulfilled, (state, action) => {
                state.response = action.payload;
            })
            .addCase(updateRequestMasterItemsThunk.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const selectRequestMasterItemsUpdate = (state: RootState) => state.requestMasterItemsUpdateStore;
export default requestMasterItemsUpdateSlice.reducer;
