import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { IRequestItem } from "./requestItemsSlice";

const baseUrl = process.env.REACT_APP_BASE_URL

export const createRequestItems = (pathName: string, requestItems: IRequestItem[]) => {
    return axios.post(`${baseUrl}${pathName}/create`, requestItems)
}

export interface IRequestItemsUpdateState {
    response: IRequestItem[],
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestItemsUpdateState = {
    response: [],
    status: 'idle'
}

export const createRequestItemsThunk = createAsyncThunk(
    'createRequestItemsThunk',
    async (params: { pathName: string, requestItems: IRequestItem[] }) => {
        const response = await createRequestItems(params.pathName, params.requestItems)
        return response.data
    }
)

export const requestItemsCreateSlice = createSlice({
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

export const selectRequestItemsUpdateStore = (state: RootState) => state.requestItemsCreateStore
export default requestItemsCreateSlice.reducer

