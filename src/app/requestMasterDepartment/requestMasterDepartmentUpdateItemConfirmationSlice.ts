import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IRequestItem } from "../request/requestItems";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL

export const updateRequestItems = (pathName: string, requestItems: IRequestItem[]) => {
    return axios.patch(`${baseUrl}${pathName}/create`, requestItems)
}

export interface IRequestMakeItemUpdateState {
    response: IRequestItem | undefined,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMakeItemUpdateState = {
    response: undefined,
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

