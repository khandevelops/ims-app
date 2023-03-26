import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IDepartmentItem, updateDepartmentItem } from "./departmentItemsSlice";

export interface IDepartmentUpdateState {
    response: IDepartmentItem | undefined,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IDepartmentUpdateState = {
    response: undefined,
    status: 'idle'
}

export const updateDepartmentItemThunk = createAsyncThunk(
    'updateDepartmentItemById',
    async (params: { deapartmentName: string, id: number, departmentItem: IDepartmentItem }) => {
        const response = await updateDepartmentItem({departmentName: params.deapartmentName, id: params.id, departmentItem: params.departmentItem})
        return response.data
    }
)

export const departmentUpdateSlice = createSlice({
    name: 'updateDepartmentSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateDepartmentItemThunk.pending, (state) => { state.status = 'loading' })
            .addCase(updateDepartmentItemThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(updateDepartmentItemThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectDepartmentUpdate = (state: RootState) => state.departmentUpdateStore

export default departmentUpdateSlice.reducer