import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface IRequestItem {
    item?: string,
    quantity: number,
    department: string,
    status?: string,
    location: string,
    time_requested?: string,
    time_update?: string,
    confiration?: string,
    user: string,
    detail: string,
    custom_text: string
    request_item_id: number,
    master_item_id: number,
}

export interface IRequestItemState {
    requestItems: IRequestItem[]
}

export const initialState: IRequestItemState = {
    requestItems: []
}

export const requestItemsSlice = createSlice({
    name: 'requestItemsSlice',
    initialState,
    reducers: {
        changeRequestItems: (state, action) => {
            state.requestItems = action.payload
        }
    }
})

export const { changeRequestItems } = requestItemsSlice.actions
export const selectRequestItems = (state: RootState) => state.requestItemsStore
export default requestItemsSlice.reducer