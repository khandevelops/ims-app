import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IMasterItem } from "./masterItemSlice";
import { updateMasterItemById } from "./masterItemSlice";
import axios from "axios";
import { DEPARTMENT } from "../../common/constants";

const baseUrl = process.env.REACT_APP_BASE_URL

export const createMasterItem = (props: { masterItem: IMasterItem, departments: string[] }) => {
    return axios.post(`${baseUrl}/master/create`, props)
}

export const assignMasterItem = (props: { department: string, masterItemId: number }) => {
    return axios.post(`${baseUrl}/master/assign`, props)
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
        'other_cn': '',
        'purchase_unit': '',
        'unit_price': 0,
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
    async (props: { masterItem: IMasterItem, departments: string[] }) => {
        const response = await createMasterItem(props)
        return response.data
    }
)

export const assignMasterItemThunk = createAsyncThunk(
    'assignMasterItemThunk',
    async (props: { department: string, masterItemId: number }) => {
        const response = await assignMasterItem(props)
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
            state.masterItem.other_cn = action.payload.other_cn ? action.payload.other_cn : ''
            state.masterItem.purchase_unit = action.payload.purchase_unit ? action.payload.purchase_unit : ''
            state.masterItem.unit_price = action.payload.unit_price ? action.payload.unit_price : 0
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
            .addCase(assignMasterItemThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(assignMasterItemThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.masterItem = action.payload
            })
            .addCase(assignMasterItemThunk.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const { populateMasterItem } = masterFormSlice.actions

export const selectMasterForm = (state: RootState) => state.masterFormStore

export default masterFormSlice.reducer