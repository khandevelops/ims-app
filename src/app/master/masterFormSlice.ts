import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IMasterItem } from "./masterItemSlice";
import { updateMasterItemById } from "./masterItemSlice";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

export const createMasterItem = (props: {masterItem: IMasterItem, departments: string[]}) => {
    return axios.post(`${baseUrl}/master/create`, props)
}

export const updateMasterItem = (params: { id: number, masterItem: IMasterItem }) => {
    return axios.put(`${baseUrl}/${params.id}`, params.masterItem)
}
interface IMasterFormState {
    masterItem: IMasterItem,
    status: 'idle' | 'loading' | 'success' | 'failed';
}



export const initialState: IMasterFormState = {
    masterItem: {
        'id': 0,
        'item': '',
        'manufacturer': '',
        'recent_cn': '',
        'part_number': '',
        'recent_vendor': '',
        'fisher_cn': '',
        'vwr_cn': '',
        'lab_source_cn': '',
        'next_advance_cn': '',
        'purchase_unit': '',
        'average_unit_price': 0,
        'category': '',
        'comment': '',
        'type': '',
        'group': '',
        'drug_class': '',
        'usage_level': '',
        'expiration_date': null,
        'received_date': null
    },
    status: 'idle'
}

export const updateMasterItemThunk = createAsyncThunk(
    'updateMasterItemThunk',
    async (params: { id: number, masterItem: IMasterItem }) => {
        const response = await updateMasterItemById(params)
        return response.data
    }
)

export const createMasterItemThunk = createAsyncThunk(
    'createMasterItemThunk',
    async (props: {masterItem: IMasterItem, departments: string[]}) => {
        const response = await createMasterItem(props)
        return response.data
    }
)


const masterFormSlice = createSlice({
    name: 'masterFormSlice',
    initialState,
    reducers: {
        populateMasterItem: (state, action: PayloadAction<IMasterItem>) => {
            state.masterItem.id = action.payload.id ? action.payload.id : 0
            state.masterItem.item = action.payload.item ? action.payload.item : ''
            state.masterItem.manufacturer = action.payload.manufacturer ? action.payload.manufacturer : ''
            state.masterItem.recent_cn = action.payload.recent_cn ? action.payload.recent_cn : ''
            state.masterItem.part_number = action.payload.part_number ? action.payload.part_number : ''
            state.masterItem.recent_vendor = action.payload.recent_vendor ? action.payload.recent_vendor : ''
            state.masterItem.fisher_cn = action.payload.fisher_cn ? action.payload.fisher_cn : ''
            state.masterItem.vwr_cn = action.payload.vwr_cn ? action.payload.vwr_cn : ''
            state.masterItem.lab_source_cn = action.payload.lab_source_cn ? action.payload.lab_source_cn : ''
            state.masterItem.next_advance_cn = action.payload.next_advance_cn ? action.payload.next_advance_cn : ''
            state.masterItem.purchase_unit = action.payload.purchase_unit ? action.payload.purchase_unit : ''
            state.masterItem.average_unit_price = action.payload.average_unit_price ? action.payload.average_unit_price : 0
            state.masterItem.category = action.payload.category ? action.payload.category : ''
            state.masterItem.comment = action.payload.comment ? action.payload.comment : ''
            state.masterItem.type = action.payload.type ? action.payload.type : ''
            state.masterItem.group = action.payload.group ? action.payload.group : ''
        }
    },
    extraReducers(builder) {
        builder
            .addCase(updateMasterItemThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateMasterItemThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.masterItem = action.payload
            })
            .addCase(updateMasterItemThunk.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(createMasterItemThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createMasterItemThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.masterItem = action.payload
            })
            .addCase(createMasterItemThunk.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const { populateMasterItem } = masterFormSlice.actions

export const selectMasterForm = (state: RootState) => state.masterFormStore

export default masterFormSlice.reducer