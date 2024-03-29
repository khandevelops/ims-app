import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const baseUrl = 'http://localhost:8020/ims/api/v1'

export const getDepartmentItem = (params: { pathName: string, page: number, size: number }) => {
    return axios.put(`${baseUrl}${params.pathName}/list?page=${params.page}&size=${params.size}`)
}

export const updateDepartmentItem = (params: { pathName: string, id: number, departmentItem: IDepartmentItem }) => {
    return axios.put(`${baseUrl}${params.pathName}/${params.id}`, params.departmentItem)
}

export const getDepartmentItems = (params: { pathName: string, page: number, size: number }) => {
    return axios.get(`${baseUrl}${params.pathName}/list?page=${params.page}&size=${params.size}`)
}

export interface IDepartmentItem {
    id: number,
    location: string,
    quantity: number,
    min_quantity: number,
    max_quantity: number,
    usage_level: string,
    lot_number: string,
    expiration_date: string,
    received_date: string,
    order_quantity: number
}

export interface IDepartmentState {
    response: {
        content: IDepartmentItem[],
        pageable: {
            sort: {
                empty: boolean,
                sorted: boolean,
                unsorted: boolean
            },
            offset: number,
            pageNumber: number,
            pageSize: number,
            paged: boolean,
            unpaged: boolean
        },
        last: boolean,
        totalPages: number,
        totalElements: number,
        first: boolean,
        size: number,
        number: number,
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        numberOfElements: number,
        empty: boolean
    } | undefined;
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IDepartmentState = {
    response: undefined,
    status: 'idle'
}


export const getDepartmentItemsThunk = createAsyncThunk(
    'getDepartmentItemsThunk',
    async (params: { pathName: string, page: number, size: number }) => {
        const response = await getDepartmentItems({pathName: params.pathName, page: params.page, size: params.size})
        return response.data
    }
)

export const dpeartmentItemsSlice = createSlice({
    name: 'departmentMaster',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDepartmentItemsThunk.pending, (state) => {
            state.status = 'loading'
        }).addCase(getDepartmentItemsThunk.fulfilled, (state, action) => {
            state.response = action.payload
        }).addCase(getDepartmentItemsThunk.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export const selectDepartmentItems = (state: RootState) => state.departmentItemsStore

export default dpeartmentItemsSlice.reducer

