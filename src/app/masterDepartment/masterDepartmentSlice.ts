import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IDepartmentItem } from "../department/departmentItemsSlice";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL

export const getMasterDepartmentItemById = (id: number, departmentName: string) => {
    return axios.get(`${baseUrl}/master-department/${departmentName}/${id}`)
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
    other_cn: string
    purchase_unit: string;
    unit_price: number;
    category: string;
    comments: string;
    type: string;
    group: string;
    extractionsItems: IDepartmentItem[];
    massSpecItems: IDepartmentItem[];
    specimenProcessingItems: IDepartmentItem[];
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
    async (params: { id: number, departmentName: string }) => {
        const response = await getMasterDepartmentItemById(params.id, params.departmentName)
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