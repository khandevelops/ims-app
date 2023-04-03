import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { IRequestItem } from "./requestItemsSlice";

const baseUrl = process.env.REACT_APP_BASE_URL

export const updateRequestItems = (pathName: string, requestItems: IRequestItem[]) => {
    return axios.patch(`${baseUrl}${pathName}/update`, requestItems)
}

export interface IRequestMakeItemUpdateState {
    response: IRequestItem[],
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMakeItemUpdateState = {
    response: [],
    status: 'idle'
}

export const updateRequestItemsThunk = createAsyncThunk(
    'confirmRequestMakeItemsThunk',
    async (params: { pathName: string, requestItems: IRequestItem[] }) => {
        const response = await updateRequestItems(params.pathName, params.requestItems)
        return response.data
    }
)

export const requestItemsUpdateSlice = createSlice({
    name: 'updateStoreRoomRequestSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateRequestItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(updateRequestItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(updateRequestItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestItemsUpdateStore = (state: RootState) => state.requestItemsUpdateStore
export default requestItemsUpdateSlice.reducer

