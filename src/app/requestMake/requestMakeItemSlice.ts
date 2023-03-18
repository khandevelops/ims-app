import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { IMasterItem } from "../master/masterItemSlice";

// const baseUrl = 'http://192.168.1.137:8000/ims/api/v1'
const baseUrl = 'http://localhost:8000/ims/api/v1'


export const getRequestMakeItems = (params: { pathName: string, page: number, size: number }) => {
    return axios.get(`${baseUrl}${params.pathName}/list?page=${params.page}&size=${params.size}`)
}

export const getRequestMakeCompleteItems = (params: { pathName: string, page: number, size: number }) => {
    return axios.get(`${baseUrl}${params.pathName}/list/completed?page=${params.page}&size=${params.size}`)
}

export const getRequestMakePendingItems = (params: { pathName: string, page: number, size: number }) => {
    return axios.get(`${baseUrl}${params.pathName}/list/pending?page=${params.page}&size=${params.size}`)
}

export const updateRequestMakeItem = (params: { pathName: string, requestItem: IRequestMakeItem }) => {
    return axios.put(`${baseUrl}${params.pathName}/update`, params.requestItem)
}

export const confirmRequestMakeItems = (params: { pathName: string, requestItems: IRequestMakeItem[] }) => {
    return axios.put(`${baseUrl}${params.pathName}/confirm`, params.requestItems)
}

export const createRequestMakeItems = (params: { pathName: string, requestItems: IRequestMakeItem[] }) => {
    return axios.post(`${baseUrl}${params.pathName}/create`, params.requestItems)
}


export interface IRequestMakeItem {
    id: number,
    order_quantity: number,
    department: string,
    status: string,
    location: string,
    time_requested: Date | null,
    time_updated: Date | null,
    confirmation: string,
    user: string,
    comment: string,
    custom_text: string,
    masterItem: IMasterItem,
    checked: boolean
}

export interface IRequestMakeState {
    response: {
        content: IRequestMakeItem[],
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

const initialState: IRequestMakeState = {
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

export const getRequestMakeItemsThunk = createAsyncThunk(
    'getRequestMakeItemsThunk',
    async (params: { pathName: string, page: number, size: number }) => {
        const response = await getRequestMakeItems(params)
        return response.data
    }
)

export const getRequestMakeCompletedItemsThunk = createAsyncThunk(
    'getRequestMakeCompletedItemsThunk',
    async (params: { pathName: string, page: number, size: number }) => {
        const response = await getRequestMakeCompleteItems(params)
        return response.data
    }
)

export const getRequestMakePendingItemsThunk = createAsyncThunk(
    'getRequestMakePendingItemsThunk',
    async (params: { pathName: string, page: number, size: number }) => {
        const response = await getRequestMakePendingItems(params)
        return response.data
    }
)

export const requestMakeItemSlice = createSlice({
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
        builder.addCase(getRequestMakeCompletedItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getRequestMakeCompletedItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getRequestMakeCompletedItemsThunk.rejected, (state) => { state.status = 'failed' })
            .addCase(getRequestMakePendingItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getRequestMakePendingItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getRequestMakePendingItemsThunk.rejected, (state) => { state.status = 'failed' })
            .addCase(getRequestMakeItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getRequestMakeItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getRequestMakeItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestItems = (state: RootState) => state.requestMakeItemStore

export const { changeRequestItems, changeCheckbox } = requestMakeItemSlice.actions

export default requestMakeItemSlice.reducer