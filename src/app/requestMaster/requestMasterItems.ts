import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BASE_URL


export const getRequestMasterItems = (pathName: string, page: number) => {
    return axios.get(`${baseUrl}${pathName}/list/transformed?page=${page}`)
}
export interface IRequestMasterItem {
    item: string,
    request_item_id: number,
    master_item_id: number,
    recent_cn: number,
    purchase_unit: string,
    part_number: string,
    comment: string,
    checked: boolean
}

export interface IRequestMasterState {
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

const initialState: IRequestMasterState = {
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

export const getRequestMasterItemsThunk = createAsyncThunk(
    'getRequestMasterDepartmentItemsThunk',
    async (params: { pathName: string, page: number }) => {
        const response = await getRequestMasterItems(params.pathName, params.page)
        return response.data
    }
)

export const requestMasterItemsSlice = createSlice({
    name: 'requestItemsSlice',
    initialState,
    reducers: {
        changeRequestMasterItems: (state, action) => {
            state.response = action.payload
        },
        changeCheckbox: (state, action) => {
            state.response.content = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRequestMasterItemsThunk.pending, (state) => { state.status = 'loading' })
            .addCase(getRequestMasterItemsThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(getRequestMasterItemsThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestMasterItems = (state: RootState) => state.requestMasterItemsStore

export const { changeRequestMasterItems, changeCheckbox } = requestMasterItemsSlice.actions

export default requestMasterItemsSlice.reducer