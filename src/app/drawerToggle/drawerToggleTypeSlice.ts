import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IDepartmentItem } from "../department/departmentItemsSlice";
import { IStoreRoomItem } from "../storeRoom/storeRoomUpdateSlice";
import { IMasterItem } from "../master/masterItemSlice";
import { drawerToggleType } from "../../common/constants";

export interface IDrawerToggleType {
    type: keyof typeof drawerToggleType;
    storeRoomItem?: IStoreRoomItem | null;
    departmentItem?: IDepartmentItem | null;
    masterItem?: IMasterItem | null
}

export const initialState: IDrawerToggleType = {
    type: 'NONE'
}

export const drawerToggleTypeSlice = createSlice({
    name: 'drawerToggleSlice',
    initialState,
    reducers: {
        toggleDrawer: (state, action) => {
            state = action.payload
        }
    }
})

export const { toggleDrawer } = drawerToggleTypeSlice.actions;

export const selectDrawerToggleType = (state: RootState) => state.drawerToggleTypeStore

export default drawerToggleTypeSlice.reducer