import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IRequestMasterItem } from "./requestMasterItemsSlice";

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
        changeRequestItemsChecked: (state, action) => {
            state.requestMasterItemsChecked = action.payload
        }
    },
})

export const selectRequestMasterItemsChecked = (state: RootState) => state.requestMasterItemsCheckedStore

export const { changeRequestItemsChecked } = requestMasterItemsCheckedSlice.actions

export default requestMasterItemsCheckedSlice.reducer