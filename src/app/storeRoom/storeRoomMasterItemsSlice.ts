import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getStoreRoomMasterItems = (page: number) => {
    return axios.get(`${baseUrl}/store-room-master/list/transformed?page=${page}`)
}

export interface IStoreRoomMasterItem {
    store_room_item_id: number;
    master_item_id: number;
    item: string;
    purchase_unit: string;
    part_number: string;
    recent_cn: string;
    location: string;
    total_quantity: number;
    usage_level: string;
    min_quantity: number;
    max_quantity: number;
    order_quantity: number;
    unit_price: number;
    total_price: number;
    issued: number;
    received: number;
    comments: string;
}

export interface IStoreRoomMasterState {
    response: null | {
        content: IStoreRoomMasterItem[],
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
    },
    status: 'idle' | 'loading' | 'success' | 'failed';
}

export const initialState: IStoreRoomMasterState = {
    response: null,
    status: 'idle'
}

export const getStoreRoomMasterItemsThunk = createAsyncThunk(
    'getStoreRoomMasterItemsThunk',
    async (page: number) => {
        const response = await getStoreRoomMasterItems(page)
        return response.data
    }
)

export const storeRoomMasterItemsSlice = createSlice({
    name: 'storeRoomSlice',
    initialState,
    reducers: {
        changeStoreRoomMasterItems: (state, action) => {
            state.response = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStoreRoomMasterItemsThunk.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(getStoreRoomMasterItemsThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.response = action.payload
            })
            .addCase(getStoreRoomMasterItemsThunk.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const { changeStoreRoomMasterItems} = storeRoomMasterItemsSlice.actions;


export const selectStoreRoomMasterItemsItems = (state: RootState) => state.storeRooomMasterItemsStore

export default storeRoomMasterItemsSlice.reducer



