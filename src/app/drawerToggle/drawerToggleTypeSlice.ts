import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const initialState: {drawerToggleType: string} = {
    drawerToggleType: ''
}

export const drawerToggleTypeSlice = createSlice({
    name: 'drawerToggleSlice',
    initialState,
    reducers: {
        toggleDrawer: (state, action) => {
            state.drawerToggleType = action.payload
        }
    }
})

export const { toggleDrawer } = drawerToggleTypeSlice.actions;

export const selectDrawerToggleType = (state: RootState) => state.drawerToggleTypeStore

export default drawerToggleTypeSlice.reducer