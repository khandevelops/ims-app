import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { IRequestItem } from "../request/requestItems";
import { RootState } from "../store"

const baseUrl = process.env.REACT_APP_BASE_URL

export const createRequestItems = (pathName: string, requestItems: IRequestItem[]) => {
    return axios.post(`${baseUrl}${pathName}/create`, requestItems)
}

export const updateRequestItems = (pathName: string, requestItems: IRequestItem[]) => {
    return axios.patch(`${baseUrl}${pathName}/create`, requestItems)
}


export interface IRequestMakeItemCreateState {
    response: IRequestItem[]
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMakeItemCreateState = {
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
    name: 'requestMakeItemCreateConfirmationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createRequestItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(createRequestItemsThunk.fulfilled, (state, action) => { state.response = action.payload; state.status = 'success' })
            .addCase(createRequestItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestItemsCreate = (state: RootState) => state.requestItemsCreateStore

export default requestItemsCreateSlice.reducer