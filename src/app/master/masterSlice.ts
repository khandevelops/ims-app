import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store';

import axios from "axios"
import { IDepartmentItem } from '../department/departmentItemsSlice';

const baseUrl = 'http://localhost:8040/ims/api/v1/master'

export const fetchMasterItems = (pagination: { page: number, size: number }) => {
    return axios.get(`${baseUrl}/list?page=${pagination.page}&size=${pagination.size}`)
}

export const updateMasterItemById = (params: { id: number, masterItem: IMasterItem }) => {
    return axios.put(`http://localhost:9080/api/services/admin/master/${params.id}`, params.masterItem)
}

export const createMasterItem = (masterItem: IMasterItem) => {
    return axios.post('http://localhost:9080/api/inventory/services/admin/master', masterItem)
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
    comments: string;
    type: string;
    group: string;
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

export const getMasterItems = createAsyncThunk(
    'getMasterItems',
    async (pagination: { page: number, size: number }) => {
        const response = await fetchMasterItems({ page: pagination.page, size: pagination.size })
        return response.data
    }
)

export const masterItemsSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMasterItems.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(getMasterItems.fulfilled, (state, action) => {
                state.status = 'success';
                state.response = action.payload
            })
            .addCase(getMasterItems.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const selectMasterItems = (state: RootState) => state.masterItemsStore

export default masterItemsSlice.reducer



