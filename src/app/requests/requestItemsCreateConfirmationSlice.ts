import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { confirmRequestItems, createRequestItems, IRequestItem } from "./requestItemsSlice";


export interface IRequestCreateState {
    response: IRequestItem[]
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestCreateState = {
    response: [],
    status: 'idle'
}

export const createRequestThunk = createAsyncThunk(
    'createRequestThunk',
    async (params: {pathName: string, requestItems: IRequestItem[]}) => {
        const response = await createRequestItems({pathName: params.pathName, requestItems: params.requestItems})
        return response.data
    }
)

export const confirmRequestThunk = createAsyncThunk(
    'confirmRequestThunk',
    async (params: {pathName: string, requestItems: IRequestItem[]}) => {
        const response = await confirmRequestItems({pathName: params.pathName, requestItems: params.requestItems})
        return response.data
    }
)

export const storeRoomRequestCreateConfirmationSlice = createSlice({
    name: 'createStoreRoomRequestSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createRequestThunk.pending, (state) => { state.status = 'loading' })
            .addCase(createRequestThunk.fulfilled, (state, action) => { state.response = action.payload; state.status = 'success' })
            .addCase(createRequestThunk.rejected, (state) => { state.status = 'failed' })
            .addCase(confirmRequestThunk.pending, (state) => { state.status = 'loading' })
            .addCase(confirmRequestThunk.fulfilled, (state, action) => { state.response = action.payload; state.status = 'success' })
            .addCase(confirmRequestThunk.rejected, (state) => { state.status = 'failed' })
            
    }
})

export const selectCreateStoreRoomRequestItem = (state: RootState) => state.requestsCreateStore

export default storeRoomRequestCreateConfirmationSlice.reducer