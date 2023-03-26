import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IDepartmentItem } from "../department/departmentItemsSlice";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL

export const updateQuantity = (departmentName: string, departmentItems: IDepartmentItem[]) => {
    return axios.patch(`${baseUrl}/departments/${departmentName}/update-quantity`, departmentItems)
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
    async (params: {departmentName: string, departmentItems: IDepartmentItem[]}) => {
        const response = await updateQuantity(params.departmentName, params.departmentItems)
        return response.data
    }
)

export const updateQuantitySlice = createSlice({
    name: 'updateQuantityByListSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateQuantityThunk.pending, (state) => { state.status = 'loading' })
        builder.addCase(updateQuantityThunk.fulfilled, (state, action) => { state.response = action.payload })
        builder.addCase(updateQuantityThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectUpdateQuantity = (state: RootState) => state.updateQuantityStore

export default updateQuantitySlice.reducer