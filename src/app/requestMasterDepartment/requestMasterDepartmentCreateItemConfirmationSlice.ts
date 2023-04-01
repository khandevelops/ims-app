import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { IRequestMasterItem } from "../requestMaster/requestMasterItems";
import { RootState } from "../store"

const baseUrl = process.env.REACT_APP_BASE_URL

export const createRequestItems = (pathName: string, requestItems: IRequestMasterItem[]) => {
    return axios.post(`${baseUrl}${pathName}/create`, requestItems)
}

export const updateRequestItems = (pathName: string, requestItems: IRequestMasterItem[]) => {
    return axios.patch(`${baseUrl}${pathName}/create`, requestItems)
}


export interface IRequestMakeItemCreateState {
    response: IRequestMasterItem[]
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMakeItemCreateState = {
    response: [],
    status: 'idle'
}

export const createRequestItemsThunk = createAsyncThunk(
    'createRequestItemsThunk',
    async (params: { pathName: string, requestItems: IRequestMasterItem[] }) => {
        const response = await createRequestItems(params.pathName, params.requestItems)
        return response.data
    }
)

export const updateRequestItemsThunk = createAsyncThunk(
    'confirmRequestMakeItemsThunk',
    async (params: { pathName: string, requestItems: IRequestMasterItem[] }) => {
        const response = await updateRequestItems(params.pathName, params.requestItems)
        return response.data
    }
)

export const requestItemsConfirmationSlice = createSlice({
    name: 'requestMakeItemCreateConfirmationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createRequestItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(createRequestItemsThunk.fulfilled, (state, action) => { state.response = action.payload; state.status = 'success' })
            .addCase(createRequestItemsThunk.rejected, (state) => { state.status = 'failed' })
            .addCase(updateRequestItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(updateRequestItemsThunk.fulfilled, (state, action) => { state.response = action.payload; state.status = 'success' })
            .addCase(updateRequestItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestItemsConfirmation = (state: RootState) => state.requestItemsConfirmationStore

export default requestItemsConfirmationSlice.reducer