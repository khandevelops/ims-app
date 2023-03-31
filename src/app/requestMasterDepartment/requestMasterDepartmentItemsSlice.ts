import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL


export const getRequestMasterDepartmentItems = (params: { pathName: string, page: number }) => {
    return axios.get(`${baseUrl}${params.pathName}/list/trasnformed?page=${params.page}`)
}
export interface IRequestMasterDepartmentItem {
    item: string,
    request_item_id: number,
    master_item_id: number,
    recent_cn: number,
    purchase_unit: string,
    part_number: string,
    status: string,
    quantity: number, 
    time_requested: Date,
    time_updated: Date,
    detail: string,
    custom_text: string,
    checked: boolean
}

export interface IRequestMasterDepartmentState {
    response: {
        content: IRequestMasterDepartmentItem[],
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

const initialState: IRequestMasterDepartmentState = {
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

export const getRequestMasterDepartmentItemsThunk = createAsyncThunk(
    'getRequestMasterDepartmentItemsThunk',
    async (params: { pathName: string, page: number }) => {
        const response = await getRequestMasterDepartmentItems(params)
        return response.data
    }
)


export const requestMasterDepartmentItemsSlice = createSlice({
    name: 'requestItemsSlice',
    initialState,
    reducers: {
        changeRequestItems: (state, action) => {
            state.response = action.payload
        },
        changeCheckbox: (state, action) => {
            state.response.content = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRequestMasterDepartmentItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getRequestMasterDepartmentItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getRequestMasterDepartmentItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestMasterDepartmentItems = (state: RootState) => state.requestMasterDepartmentItemsStore

export const { changeRequestItems, changeCheckbox } = requestMasterDepartmentItemsSlice.actions

export default requestMasterDepartmentItemsSlice.reducer