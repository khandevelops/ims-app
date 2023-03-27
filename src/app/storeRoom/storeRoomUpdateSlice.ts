import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const updateStoreRoomItem = (id: number, storeRoomMasterItem: IStoreRoomItem) => {
    return axios.patch(`${baseUrl}/store-room/${id}`, storeRoomMasterItem)
}

export interface IStoreRoomItem {
    id?: number,
    location?: string,
    quantity?: number,
    min_quantity?: number,
    max_quantity?: number,
    usage_level?: string
}

export interface IStoreRoomUpdateState {
    response: null | IStoreRoomItem,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

export const initialState: IStoreRoomUpdateState = {
    response: null,
    status: 'idle'
}

export const updateStoreRoomUpdateThunk = createAsyncThunk(
    'updateStoreRoomUpdateThunk',
    async (params: {id: number, storeRoomItem: IStoreRoomItem}) => {
        const response = await updateStoreRoomItem(params.id, params.storeRoomItem)
        return response.data
    }
)

export const storeRoomUpdateSlice = createSlice({
    name: 'storeRoomSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateStoreRoomUpdateThunk.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(updateStoreRoomUpdateThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.response = action.payload
            })
            .addCase(updateStoreRoomUpdateThunk.rejected, (state) => {
                state.status = 'failed'
            })
    }
})


export const selectStoreRoomUpdate = (state: RootState) => state.storeRooomUpdateStore

export default storeRoomUpdateSlice.reducer



