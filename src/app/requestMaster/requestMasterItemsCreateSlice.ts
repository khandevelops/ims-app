import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { IRequestMasterItem } from "./requestMasterItems";

const baseUrl = process.env.REACT_APP_BASE_URL

export const createRequestMasterItems = (pathName: string, requestItems: IRequestMasterItem[]) => {
    return axios.post(`${baseUrl}/request-master/${pathName}/create`, requestItems)
}

export interface IRequestMasterItemsCreateState {
    response: IRequestMasterItem[],
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMasterItemsCreateState = {
    response: [],
    status: 'idle'
}

export const createRequestItemsThunk = createAsyncThunk(
    'createRequestItemsThunk',
    async (params: {pathName: string, requestItems: IRequestMasterItem[]}) => {
        const response = await createRequestMasterItems(params.pathName, params.requestItems)
        return response.data
    }
)

export const requestMasterItemsCreateSlice = createSlice({
    name: 'requestItemsCreateSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRequestItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(createRequestItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(createRequestItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestMasterItemsCreate = (state: RootState) => state.requestMasterItemsCreateStore
export default requestMasterItemsCreateSlice.reducer

