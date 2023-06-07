import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store';

import axios from "axios"
import { IDepartmentItem } from '../department/departmentItemsSlice';

const baseUrl = process.env.REACT_APP_BASE_URL

export const updateMasterItem = (masterItem: IMasterItem) => {
    return axios.patch(`${baseUrl}/master/${masterItem.id}/update`, masterItem)
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
    other_cn: string
    purchase_unit: string;
    unit_price: number;
    category: string;
    minimum_quantity: number;
    maximum_quantity: number;
    expiration_date: Date;
    received_date: Date;
    comment: string;
    type: string;
    group: string;
    drug_class: string;
}

export interface IMasterItemState {
    masterItem: IMasterItem | undefined,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IMasterItemState = {
    masterItem: undefined,
    status: 'idle'
}

export const updateMasterItemThunk = createAsyncThunk(
    'getMasterItemsFilterThunk',
    async (masterItem: IMasterItem) => {
        const response = await updateMasterItem(masterItem)
        return response.data
    }
)

export const masterItemUpdateSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateMasterItemThunk.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(updateMasterItemThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.masterItem = action.payload
            })
            .addCase(updateMasterItemThunk.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const selectMasterItemUpdate = (state: RootState) => state.masterItemUpdateStore

export default masterItemUpdateSlice.reducer



