import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IRequestMakeItem, updateRequestMakeItem } from "./requestMakeItemSlice";



export interface IRequestMakeItemUpdateState {
    response: IRequestMakeItem | undefined,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMakeItemUpdateState = {
    response: undefined,
    status: 'idle'
}

export const updateRequestMakeItemThunk = createAsyncThunk(
    'updateRequestMakeItemThunk',
    async (params: { pathName: string, requestItem: IRequestMakeItem }) => {
        const response = await updateRequestMakeItem({ pathName: params.pathName, requestItem: params.requestItem })
        return response.data
    }
)

export const requestUpdateSlice = createSlice({
    name: 'updateStoreRoomRequestSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateRequestMakeItemThunk.pending, (state) => { state.status = 'loading' })
            .addCase(updateRequestMakeItemThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(updateRequestMakeItemThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestUpdateStore = (state: RootState) => state.requestMakeItemUpdateStore
export default requestUpdateSlice.reducer

