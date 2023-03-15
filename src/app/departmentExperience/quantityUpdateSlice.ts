import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IDepartmentItem } from "../department/departmentItemsSlice";
import { RootState } from "../store";

export const updateQuantity = (departmentItems: IDepartmentItem[]) => {
    return axios.put('http://192.168.1.137:8000/api/inventory/services/extractions/update-quantity', departmentItems)
}

export interface quantityUpdateState {
    response: IDepartmentItem[],
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: quantityUpdateState = {
    response: [],
    status: 'idle'
}

export const updateQuantityThunk = createAsyncThunk(
    'updateQuantity',
    async (departmentItems: IDepartmentItem[]) => {
        const response = await updateQuantity(departmentItems)
        return response.data
    }
)

export const quantityUpdateSlice = createSlice({
    name: 'updateQuantityByListSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateQuantityThunk.pending, (state) => { state.status = 'loading' })
        builder.addCase(updateQuantityThunk.fulfilled, (state, action) => { state.response = action.payload })
        builder.addCase(updateQuantityThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectUpdateQuantity = (state: RootState) => state.quantityUpdateStore

export default quantityUpdateSlice.reducer