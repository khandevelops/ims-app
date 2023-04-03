import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { IRequestMasterItem } from "./requestMasterItemsSlice";

const baseUrl = process.env.REACT_APP_BASE_URL


export const getRequestMasterItemsPending = (state: string, page: number) => {
    return axios.get(`${baseUrl}/request-master/${state}/list/transformed/pending?page=${page}`)
}

export interface IRequestMasterItemsPendingState {
    response: {
        content: IRequestMasterItem[],
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

const initialState: IRequestMasterItemsPendingState = {
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

export const getRequestMasterItemsPendingThunk = createAsyncThunk(
    'getRequestMasterDepartmentItemsThunk',
    async (params: { state: string, page: number }) => {
        const response = await getRequestMasterItemsPending(params.state, params.page)
        return response.data
    }
)

export const requestMasterItemsPendingSlice = createSlice({
    name: 'requestItemsSlice',
    initialState,
    reducers: {
        changeRequestMasterItemsPending: (state, action) => {
            state.response = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRequestMasterItemsPendingThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getRequestMasterItemsPendingThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getRequestMasterItemsPendingThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestMasterItemsPending = (state: RootState) => state.requestMasterItemsPendingStore

export const { changeRequestMasterItemsPending } = requestMasterItemsPendingSlice.actions

export default requestMasterItemsPendingSlice.reducer