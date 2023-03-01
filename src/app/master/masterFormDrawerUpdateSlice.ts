import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface RightDrawer {
    open: boolean,
    form: 'idle' | 'add' | 'update'
}

const initialState: RightDrawer = {
    open: false,
    form: 'idle'
}

export const masterFormDrawerSlice = createSlice({
    name: "toggleRightDrawer",
    initialState,
    reducers: {
        toggleDrawer: (state, action) => {
            state.open = action.payload
        },
        setForm: (state, action) => {
            state.form = action.payload
        }
    }
})

export const { toggleDrawer, setForm } = masterFormDrawerSlice.actions

export const selectMasterFormDrawer = (state: RootState) => state.masterFormDrawerStore

export default masterFormDrawerSlice.reducer