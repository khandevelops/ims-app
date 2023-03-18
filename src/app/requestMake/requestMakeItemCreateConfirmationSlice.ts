import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { confirmRequestMakeItems, createRequestMakeItems, IRequestMakeItem } from "./requestMakeItemSlice";


export interface IRequestMakeItemCreateState {
    response: IRequestMakeItem[]
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMakeItemCreateState = {
    response: [],
    status: 'idle'
}

export const createRequestMakeItemsThunk = createAsyncThunk(
    'createRequestMakeItemsThunk',
    async (params: { pathName: string, requestItems: IRequestMakeItem[] }) => {
        const response = await createRequestMakeItems({ pathName: params.pathName, requestItems: params.requestItems })
        return response.data
    }
)

export const confirmRequestMakeItemsThunk = createAsyncThunk(
    'confirmRequestMakeItemsThunk',
    async (params: { pathName: string, requestItems: IRequestMakeItem[] }) => {
        const response = await confirmRequestMakeItems({ pathName: params.pathName, requestItems: params.requestItems })
        return response.data
    }
)

export const requestMakeItemCreateConfirmationSlice = createSlice({
    name: 'requestMakeItemCreateConfirmationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createRequestMakeItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(createRequestMakeItemsThunk.fulfilled, (state, action) => { state.response = action.payload; state.status = 'success' })
            .addCase(createRequestMakeItemsThunk.rejected, (state) => { state.status = 'failed' })
            .addCase(confirmRequestMakeItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(confirmRequestMakeItemsThunk.fulfilled, (state, action) => { state.response = action.payload; state.status = 'success' })
            .addCase(confirmRequestMakeItemsThunk.rejected, (state) => { state.status = 'failed' })

    }
})

export const selectRequestMakeItemCreate = (state: RootState) => state.requestMakeItemCreateStore

export default requestMakeItemCreateConfirmationSlice.reducer