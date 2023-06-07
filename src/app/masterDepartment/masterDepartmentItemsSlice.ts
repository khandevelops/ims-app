import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IDepartmentItem } from "../department/departmentItemsSlice";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL

export const getMasterDepartmentItems = (state: string, page: number) => {
    return axios.get(`${baseUrl}/master-department/${state}/list?page=${page}`)
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
    usage_level: string;
    minimum_quantity: number;
    maximum_quantity: number;
    comment: string;
    type: string;
    group: string;
    drug_class: string;
    departmentItems: IDepartmentItem[];
}

export interface IMasterDepartmentItemsState {
    response: {
        content: IMasterDepartmentItem[],
        last: boolean,
        totalPages: number,
        totalElements: number,
        first: boolean,
        size: number,
        number: number,
        sorted: boolean,
        numberOfElements: number,
        empty: boolean
    };
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IMasterDepartmentItemsState = {
    response: {
        content: [],
        last: false,
        totalPages: 0,
        totalElements: 0,
        first: false,
        size: 0,
        number: 0,
        sorted: false,
        numberOfElements: 0,
        empty: false,
    },
    status: 'idle'
}

export const getMasterDepartmentItemsThunk = createAsyncThunk(
    'getMasterDepartmentItemThunk',
    async (params: { state: string, page: number }) => {
        const response = await getMasterDepartmentItems(params.state, params.page)
        return response.data
    })

export const masterDepartmentItemsSlice = createSlice({
    name: 'masterDepartmentSlice',
    initialState,
    reducers: {
        changeMasterDepartmentItems: (state, action) => {
            state.response.content = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMasterDepartmentItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getMasterDepartmentItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getMasterDepartmentItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const { changeMasterDepartmentItems } = masterDepartmentItemsSlice.actions

export const selectMasterDepartmentItems = (state: RootState) => state.masterDepartmentItemsStore

export default masterDepartmentItemsSlice.reducer;