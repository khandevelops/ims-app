import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface IStoreRoomItem {
    id: number;
    item: string;
    manufacturer: string
    recent_cn: string
    part_number: string
    recent_vendor: string
    fisher_cn: string
    vwr_cn: string
    lab_source_cn: string
    next_advance_cn: string
    purchase_unit: string;
    average_unit_price: number;
    category: string;
    comments: string;
    type: string;
    group: string;
}

export interface IStoreRoomState {
    response: {} | {
        content: IStoreRoomItem[],
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

export const initialState: IStoreRoomState = {
    response: {},
    status: 'idle'
}

const baseUrl = process.env.REACT_APP_BASE_URL

export const getStoreRoomItems = (pagination: { page: number, size: number }) => {
    return axios.get(`${baseUrl}/master/list?page=${pagination.page}&size=${pagination.size}`)
}

export const getStoreRoomItemsThunk = createAsyncThunk(
    'getStoreRoomItemsThunk',
    async (pagination: { page: number, size: number }) => {
        const response = await getStoreRoomItems({ page: pagination.page, size: pagination.size })
        return response.data
    }
)

export const storeRoomSlice = createSlice({
    name: 'storeRoomSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStoreRoomItemsThunk.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(getStoreRoomItemsThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.response = action.payload
            })
            .addCase(getStoreRoomItemsThunk.rejected, (state) => {
                state.status = 'failed'
            })
    }
})


export const selectStoreRoomItems = (state: RootState) => state.storeRooomItemsStore

export default storeRoomSlice.reducer



