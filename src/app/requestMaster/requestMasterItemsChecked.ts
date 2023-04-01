import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IRequestMasterItem } from "./requestMasterItems";

export interface IRequestMasterCheckedState {
    requestMasterItemsChecked: IRequestMasterItem[]
}

const initialState: IRequestMasterCheckedState = {
    requestMasterItemsChecked: []
}

export const requestMasterItemsCheckedSlice = createSlice({
    name: 'requestMasterItemsCheckedSlice',
    initialState,
    reducers: {
        addRequestItemsChecked: (state, action) => {
            state.requestMasterItemsChecked = action.payload
        }
    },
})

export const selectRequestMasterItemsChecked = (state: RootState) => state.requestMasterItemsCheckedStore

export const { addRequestItemsChecked } = requestMasterItemsCheckedSlice.actions

export default requestMasterItemsCheckedSlice.reducer