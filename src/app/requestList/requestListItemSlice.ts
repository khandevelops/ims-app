import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IMasterItem } from "../master/masterItemSlice";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL

export const getRequestListItems = (params: { pathName: string, page: number }) => {
    return axios.get(`${baseUrl}${params.pathName}/list?page=${params.page}}`)
}


export interface IRequestItemList {
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

export interface IRequestListState {
    response: {
        content: IRequestItemList[],
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

const initialState: IRequestListState = {
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

export const getRequestListItemsThunk = createAsyncThunk(
    'getRequestListItemsThunk',
    async (params: { pathName: string, page: number}) => {
        const response = await getRequestListItems({ pathName: params.pathName, page: params.page })
        return response.data
    }
)

export const requestListItemSlice = createSlice({
    name: 'requestListSlice',
    initialState,
    reducers: {
        updateRequestItemList: (state, action) => { state.response.content = action.payload }
    },
    extraReducers: (builder) => {
        builder.addCase(getRequestListItemsThunk.pending, (state) => { state.status = 'loading' })
        builder.addCase(getRequestListItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
        builder.addCase(getRequestListItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const { updateRequestItemList } = requestListItemSlice.actions

export const selectRequestItemList = (state: RootState) => state.requestListItemStore

export default requestListItemSlice.reducer