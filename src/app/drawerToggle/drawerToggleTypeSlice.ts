import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IDepartmentItem } from "../department/departmentItemsSlice";
import { IMasterItem } from "../master/masterItemSlice";
import { IStoreRoom } from "../api/properties/IStoreRoom";

export interface DrawerToggleTypeState {
    type: string;
    departmentItem?: IDepartmentItem;
    masterItem?: IMasterItem;
    storeRoomItem?: IStoreRoom
}

export const initialState: DrawerToggleTypeState = {
    type: ''
}

export const drawerToggleTypeSlice = createSlice({
    name: 'drawerToggleSlice',
    initialState,
    reducers: {
        toggleDrawer: (state, action: PayloadAction<DrawerToggleTypeState>) => {
            state.type = action.payload.type;
            state.departmentItem = action.payload.departmentItem;
            state.masterItem = action.payload.masterItem;
        }
    }
})

export const { toggleDrawer } = drawerToggleTypeSlice.actions;
export const selectDrawerToggleType = (state: RootState) => state.drawerToggleTypeStore
export default drawerToggleTypeSlice.reducer