import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store';

import axios from "axios"
import { IDepartmentItem } from '../department/departmentItemsSlice';

const baseUrl = process.env.REACT_APP_BASE_URL

export const getMasterItems = (page: number) => {
    return axios.get(`${baseUrl}/master/list?page=${page}`)
}

export const getMasterItemsFiltered = (page: number, keyword: string) => {
    return axios.get(`${baseUrl}/master/list/filter?keyword=${keyword}&page=${page}`)
}

export const updateMasterItemById = (params: { id: number, masterItem: IMasterItem }) => {
    return axios.put(`${baseUrl}/master/${params.id}`, params.masterItem)
}

export const createMasterItem = (masterItem: IMasterItem) => {
    return axios.post(`baseUrl/create`, masterItem)
}

export interface IMasterItem {
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
    comment: string;
    type: string;
    group: string;
    drug_class: string;
    usage_level: string;
    expiration_date: Date | null;
    received_date: Date | null;
}

export interface IMasterState {
    response: {
        content: IMasterItem[],
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

export interface IMasterExperience {
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
    extractionsItems: IDepartmentItem[]
}

export interface IMasterExperienceState {
    response: IMasterExperience;
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IMasterState = {
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

export const getMasterItemsThunk = createAsyncThunk(
    'getMasterItemsThunk',
    async (page: number) => {
        const response = await getMasterItems(page)
        return response.data
    }
)

export const getMasterItemsFilteredThunk = createAsyncThunk(
    'getMasterItemsFilteredThunk',
    async (params: {page: number, keyword: string }) => {
        const response = await getMasterItemsFiltered(params.page, params.keyword)
        return response.data
    }
)

export const masterItemsSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMasterItemsThunk.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(getMasterItemsThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.response = action.payload
            })
            .addCase(getMasterItemsThunk.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(getMasterItemsFilteredThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getMasterItemsFilteredThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.response = action.payload
            })
            .addCase(getMasterItemsFilteredThunk.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const selectMasterItems = (state: RootState) => state.masterItemsStore

export default masterItemsSlice.reducer



