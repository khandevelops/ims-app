import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { IRequestItemList } from "../requestList/requestListItemSlice";
import { RootState } from "../store"

export const createSrrTopic = (params: { pathName: string, departmentMasterItems: IRequestItemList[] }) => {
    return axios.post(`http://http://192.168.1.137:8000/ims/api/v1${params.pathName}/create`, params.departmentMasterItems)
}


export interface IRequestItemsConfirmationState {
    response: IRequestItemList[]
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestItemsConfirmationState = {
    response: [],
    status: 'idle'
}

export const createSrrTopicThunk = createAsyncThunk(
    'createRequestThunk',
    async (params: { pathName: string, departmentMasterItems: IRequestItemList[] }) => {
        const response = await createSrrTopic({ pathName: params.pathName, departmentMasterItems: params.departmentMasterItems })
        return response.data
    }
)

export const requestItemsConfirmationSlice = createSlice({
    name: 'createStoreRoomRequestSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createSrrTopicThunk.pending, (state) => { state.status = 'loading' })
            .addCase(createSrrTopicThunk.fulfilled, (state, action) => { state.response = action.payload })
            .addCase(createSrrTopicThunk.rejected, (state) => { state.status = 'failed' })
    }
})

export const selectRequestItemsConfirmation = (state: RootState) => state.requestItemsConfirmationStore

export default requestItemsConfirmationSlice.reducer