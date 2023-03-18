import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IDepartmentItem } from "../department/departmentItemsSlice";
import { RootState } from "../store";

export const getMasterDepartmentItemById = (id: number) => {
    // return axios.get(`http://192.168.1.137:8000/ims/api/v1/master/${id}`)
    return axios.get(`http://localhost:8000/ims/api/v1/master-department/${id}`)
}

export interface IMasterDepartmentItem {
    id: number;
    item: string;
    manufacturer: string
    recent_cn: string
    part_number: string
    recent_vendor: string
    fisher_cn: string
    vwr_cn: string
    lab_source_cn: string
    next_advance_cn: string
    purchase_unit: string;
    average_unit_price: number;
    category: string;
    comments: string;
    type: string;
    group: string;
    extractionsItems: IDepartmentItem[];
    massSpecItems: IDepartmentItem[];
    receivingItems: IDepartmentItem[];
    rdItems: IDepartmentItem[];
    screeningItems: IDepartmentItem[];
    shippingItems: IDepartmentItem[];
    qualityItems: IDepartmentItem[];
}

export interface IMasterDepartmentState {
    response: IMasterDepartmentItem | undefined
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IMasterDepartmentState = {
    response: undefined,
    status: 'idle'
}

export const getMasterDepartmentItemThunk = createAsyncThunk(
    'getMasterDepartmentItemThunk',
    async (id: number) => {
        const response = await getMasterDepartmentItemById(id)
        return response.data
    })

export const masterDepartmentSlice = createSlice({
    name: 'masterDepartmentSlice',
    initialState,
    reducers: {
        changeMasterDepartmentItem: (state, action) => {
            state.response = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMasterDepartmentItemThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getMasterDepartmentItemThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getMasterDepartmentItemThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const { changeMasterDepartmentItem } = masterDepartmentSlice.actions

export const selectMasterDepartmentItem = (state: RootState) => state.masterDepartmentStore

export default masterDepartmentSlice.reducer;