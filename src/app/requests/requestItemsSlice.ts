import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { IMasterItem } from "../master/masterSlice";

const baseUrl = 'http://192.168.1.137:8000/ims/api/v1'


export const getRequestsItems = (params: { pathName: string, page: number, size: number }) => {
    return axios.get(`${baseUrl}${params.pathName}/list?page=${params.page}&size=${params.size}`)
}

export const getRequestsCompletedItems = (params: { pathName: string, page: number, size: number }) => {
    return axios.get(`${baseUrl}${params.pathName}/list/completed?page=${params.page}&size=${params.size}`)
}

export const getRequestsPendingItems = (params: { pathName: string, page: number, size: number }) => {
    return axios.get(`${baseUrl}${params.pathName}/list/pending?page=${params.page}&size=${params.size}`)
}

export const updateRequestItem = (params: { pathName: string, requestItem: IRequestItem }) => {
    return axios.put(`${baseUrl}${params.pathName}/update`, params.requestItem)
}

export const confirmRequestItems = (params: { pathName: string, requestItems: IRequestItem[] }) => {
    return axios.put(`${baseUrl}${params.pathName}/confirm`, params.requestItems)
}

export const createRequestItems = (params: { pathName: string, requestItems: IRequestItem[] }) => {
    return axios.post(`${baseUrl}${params.pathName}/create`, params.requestItems)
}


export interface IRequestItem {
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

export interface IRequestState {
    response: {
        content: IRequestItem[],
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

const initialState: IRequestState = {
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

export const getRequestItemsThunk = createAsyncThunk(
    'getRequestItemsThunk',
    async (params: { pathName: string, page: number, size: number }) => {
        const response = await getRequestsItems(params)
        return response.data
    }
)

export const getRequestCompletedItemsThunk = createAsyncThunk(
    'getStoreRoomRequestCompletedItems',
    async (params: { pathName: string, page: number, size: number }) => {
        const response = await getRequestsCompletedItems(params)
        return response.data
    }
)

export const getRequestPendingItemsThunk = createAsyncThunk(
    'getStoreRoomRequestPendingItems',
    async (params: { pathName: string, page: number, size: number }) => {
        const response = await getRequestsPendingItems(params)
        return response.data
    }
)

export const requestItemsSlice = createSlice({
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
        builder.addCase(getRequestCompletedItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getRequestCompletedItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getRequestCompletedItemsThunk.rejected, (state) => { state.status = 'failed' })
            .addCase(getRequestPendingItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getRequestPendingItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getRequestPendingItemsThunk.rejected, (state) => { state.status = 'failed' })
            .addCase(getRequestItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getRequestItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getRequestItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestItems = (state: RootState) => state.requestItemsStore

export const { changeRequestItems, changeCheckbox } = requestItemsSlice.actions

export default requestItemsSlice.reducer