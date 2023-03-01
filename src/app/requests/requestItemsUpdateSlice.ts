import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IRequestItem, updateRequestItem } from "./requestItemsSlice";



export interface IUpdateRequestItemState {
    response: IRequestItem | undefined,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IUpdateRequestItemState = {
    response: undefined,
    status: 'idle'
}

export const updateRequestItemThunk = createAsyncThunk(
    'updateRequestItem',
    async (params: { pathName: string, requestItem: IRequestItem }) => {
        const response = await updateRequestItem({ pathName: params.pathName, requestItem: params.requestItem })
        return response.data
    }
)

export const requestUpdateSlice = createSlice({
    name: 'updateStoreRoomRequestSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateRequestItemThunk.pending, (state) => { state.status = 'loading' })
            .addCase(updateRequestItemThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(updateRequestItemThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestUpdateStore = (state: RootState) => state.requestUpdateStore
export default requestUpdateSlice.reducer

