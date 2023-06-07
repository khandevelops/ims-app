import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL

export const getDepartmentItemsTransformed = (state: string, page: number) => {
    return axios.get(`${baseUrl}/department/${state}/list/transformed?page=${page}`)
}

export interface IDepartmenItemTransformed {
    department_item_id: number;
    master_item_id: number;
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
    expiration_date: Date;
    received_date: Date;
    category: string;
}

export interface IDepartmentItemTransformedState {
    response: {
        content: IDepartmenItemTransformed[],
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

const initialState: IDepartmentItemTransformedState = {
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

export const getDepartmentItemsTransformedThunk = createAsyncThunk(
    'getDepartmentItemsTransformedThunk',
    async (params: { state: string, page: number }) => {
        const response = await getDepartmentItemsTransformed(params.state, params.page)
        return response.data
    }
)

export const departmentItemsTransformedSlice = createSlice({
    name: 'transformedSlice',
    initialState,
    reducers: {
        changeDepartmentExperienceItems: (state, action) => {
            state.response = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDepartmentItemsTransformedThunk.pending, (state) => {
            state.status = 'loading'
        }).addCase(getDepartmentItemsTransformedThunk.fulfilled, (state, action) => {
            state.status = 'success'
            state.response = action.payload
        }).addCase(getDepartmentItemsTransformedThunk.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export const selectDepartmentItemsTransformed = (state: RootState) => state.departmentItemsTransformedStore
export const { changeDepartmentExperienceItems } = departmentItemsTransformedSlice.actions
export default departmentItemsTransformedSlice.reducer