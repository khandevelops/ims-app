import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { IMasterItem } from "../master/masterItemSlice";
import { RootState } from "../store"

export const createRequestItems = (params: { pathName: string, departmentMasterItems: IRequestAdminMadeItem[] }) => {
    return axios.post(`http://http://192.168.1.137:8000/ims/api/v1${params.pathName}/create`, params.departmentMasterItems)
}

export interface IRequestAdminMadeItem {
    id: number,
    order_quantity: number,
    department: string,
    status: string,
    location: string,
    time_requested: Date | null,
    time_updated: Date | null,
    confirmation: string,
    user: string,
    comment: string,
    custom_text: string,
    masterItem: IMasterItem,
    checked: boolean
}

export interface IRequestDepartmentConfirmationItemsState {
    response: IRequestAdminMadeItem[]
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestDepartmentConfirmationItemsState = {
    response: [],
    status: 'idle'
}

// export const createSrrTopicThunk = createAsyncThunk(
//     'createRequestThunk',
//     async (params: { pathName: string, departmentMasterItems: IRequestAdminMadeItem[] }) => {
//         const response = await createSrrTopic({ pathName: params.pathName, departmentMasterItems: params.departmentMasterItems })
//         return response.data
//     }
// )

export const requestItemsConfirmationSlice = createSlice({
    name: 'createStoreRoomRequestSlice',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder.addCase(createSrrTopicThunk.pending, (state) => { state.status = 'loading' })
    //         .addCase(createSrrTopicThunk.fulfilled, (state, action) => { state.response = action.payload })
    //         .addCase(createSrrTopicThunk.rejected, (state) => { state.status = 'failed' })
    // }
})

export const selectRequestItemsConfirmation = (state: RootState) => state.requestItemsConfirmationStore

export default requestItemsConfirmationSlice.reducer