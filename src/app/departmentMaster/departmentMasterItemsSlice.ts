import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IMasterItem } from "../master/masterSlice";
import { RootState } from "../store";

export const getDepartmentMasterItems = (params: { pathName: string, page: number, size: number }) => {
    return axios.get(`http://localhost:8070/ims/api/v1${params.pathName}/list?page=${params.page}&size=${params.size}`)
}


export interface IDepartmentMasterItem {
    id: number,
    location: string,
    quantity: number,
    min_quantity: number,
    max_quantity: number,
    usage_level: string,
    lot_number: string,
    expiration_date: string,
    received_date: string,
    order_quantity: number,
    checked: boolean,
    masterItem: IMasterItem
}

export interface IDepartmentMasterState {
    response: {
        content: IDepartmentMasterItem[],
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
    };
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IDepartmentMasterState = {
    response: {
        content: [],
        pageable: {
            sort: {
                empty: false,
                sorted: false,
                unsorted: false
            },
            offset: 0,
            pageNumber: 0,
            pageSize: 0,
            paged: false,
            unpaged: false
        },
        last: false,
        totalPages: 0,
        totalElements: 0,
        first: false,
        size: 0,
        number: 0,
        sort: {
            empty: false,
            sorted: false,
            unsorted: false
        },
        numberOfElements: 0,
        empty: false
    },
    status: 'idle'
}

export const getDepartmentMasterItemsThunk = createAsyncThunk(
    'getDepartmentMasterItemsThunk',
   async (params: { pathName: string, page: number, size: number }) => {
        const response = await getDepartmentMasterItems({ pathName: params.pathName, page: params.page, size: params.size })
        return response.data
   }
)

export const departmentMasterItemsSlice = createSlice({
    name: 'departmentMasterItemsSlice',
    initialState,
    reducers: {
        updateDepartmentMasterItems: (state, action) => {state.response.content = action.payload}
    },
    extraReducers: (builder) => {
        builder.addCase(getDepartmentMasterItemsThunk.pending, (state) => { state.status = 'loading'})
        builder.addCase(getDepartmentMasterItemsThunk.fulfilled, (state, action) => { state.response = action.payload})
        builder.addCase(getDepartmentMasterItemsThunk.rejected, (state) => { state.status = 'failed'})
    }
})

export const { updateDepartmentMasterItems } = departmentMasterItemsSlice.actions

export const selectDepartmentMasterItems = (state: RootState) => state.departmentMasterItemsStore

export default departmentMasterItemsSlice.reducer