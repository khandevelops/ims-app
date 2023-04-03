import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IRequestMasterItem } from "./requestMasterItemsSlice";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL

export const updateRequestMasterItem = (state: string, requestMasterItem: IRequestMasterItem) => {
    return axios.patch(`${baseUrl}/request-master/${state}/update/item/${requestMasterItem.request_item_id}`, requestMasterItem)
}

export interface IRequestMakeItemUpdateState {
    response: IRequestMasterItem | undefined,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMakeItemUpdateState = {
    response: undefined,
    status: 'idle'
}

export const updateRequestMasterItemThunk = createAsyncThunk(
    'updateRequestMasterItemThunk',
    async (params: { state: string, requestMasterItem: IRequestMasterItem }) => {
        const response = await updateRequestMasterItem(params.state, params.requestMasterItem)
        return response.data
    }
)

export const requestMasterItemUpdateSlice = createSlice({
    name: 'requestMasterItemUpdateSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateRequestMasterItemThunk.pending, (state) => { state.status = 'loading' })
            .addCase(updateRequestMasterItemThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(updateRequestMasterItemThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestMasterItemUpdate = (state: RootState) => state.requestMasterItemUpdateStore
export default requestMasterItemUpdateSlice.reducer

