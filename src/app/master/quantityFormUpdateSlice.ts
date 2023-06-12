import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { IDepartmentItem } from "../department/departmentItemsSlice";
import { getMasterDepartmentItemById, IMasterDepartmentState } from "../slice/masterDepartment/masterDepartmentItemSlice";

export const updateQuantity = (departmentItems: IDepartmentItem[]) => {
    return axios.put('http://192.168.1.137:8000/api/inventory/services/extractions/update-total-quantity', departmentItems)
}



// export const getMasterDepartmentItemThunk = createAsyncThunk(
//     'getMasterDepartmentItemThunk',
//     async (id: number) => {
//         const response = await getMasterDepartmentItemById(id)
//         return response.data
//     })

// export const quantityFormUpdateSlice = createSlice({
//     name: 'updateTotalQuantityForm',
//     initialState,
//     reducers: {
//         changeMasterDepartmentItem: (state, action) => {
//             state.response = action.payload
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getMasterDepartmentItemThunk.pending, (state) => { state.status = 'loading' })
//             .addCase(getMasterDepartmentItemThunk.fulfilled, (state, action) => { state.response = action.payload })
//             .addCase(getMasterDepartmentItemThunk.rejected, (state) => { state.status = 'failed' })
//     }
// })

// export const { changeMasterDepartmentItem } = quantityFormUpdateSlice.actions

// export const selectUpdateMasterExperienceItem = (state: RootState) => state.quantityFormStore

// export default quantityFormUpdateSlice.reducer;