import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { open: boolean } = {
    open: false
}

export const quantityFormDrawerSlice = createSlice({
    name: 'updateTotalQuantityFormSlice',
    initialState,
    reducers: {
        toggleDrawer: (state, action) => { state.open = action.payload }
    }
})

export const { toggleDrawer } = quantityFormDrawerSlice.actions

export const selectUpdateTotalQuantityFormDrawer = (state: RootState) => state.quantityFormDrawerStore

export default quantityFormDrawerSlice.reducer;