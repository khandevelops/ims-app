import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const getDepartmentMasterItems = (params: { pathName: string, page: number, size: number }) => {
    // return axios.get(`http://192.168.1.137:8000/ims/api/v1${params.pathName}/list/transformed?page=${params.page}&size=${params.size}`)
    return axios.get(`http://localhost:8000/ims/api/v1${params.pathName}/list/transformed?page=${params.page}&size=${params.size}`)
}

export interface IDepartmentMasterItem {
    department_id: number;
    item_id: number;
    item: string;
    purchase_unit: string;
    part_number: string
    recent_cn: string;
    location: string;
    total_quantity: number;
    usage_level: string;
    min_quantity: number;
    max_quantity: number;
    order_quantity: number;
    unit_price: number;
    total_price: number;
    lot_number: number;
    comments: string;
    category: string;
}

export interface IDepartmentMasterState {
    response: {
        content: IDepartmentMasterItem[],
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

const initialState: IDepartmentMasterState = {
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

export const getDepartmentMasterThunk = createAsyncThunk(
    'getDepartmentMasterThunk',
    async (params: { pathName: string, page: number, size: number }) => {
        const response = await getDepartmentMasterItems(params)
        return response.data
    }
)

export const departmentMasterSlice = createSlice({
    name: 'transformedSlice',
    initialState,
    reducers: {
        changeDepartmentExperienceItems: (state, action) => {
            state.response = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDepartmentMasterThunk.pending, (state) => {
            state.status = 'loading'
        }).addCase(getDepartmentMasterThunk.fulfilled, (state, action) => {
            state.status = 'success'
            state.response = action.payload
        }).addCase(getDepartmentMasterThunk.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export const selectDepartmentItems = (state: RootState) => state.transformedItemsStore
export const { changeDepartmentExperienceItems } = departmentMasterSlice.actions
export default departmentMasterSlice.reducer