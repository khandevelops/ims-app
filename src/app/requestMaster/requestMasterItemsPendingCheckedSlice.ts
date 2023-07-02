import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IRequestMasterItem } from "./requestMasterItemsSlice";

export interface IRequestMasterItemsPendingCheckedState {
  requestMasterItemsPendingChecked: IRequestMasterItem[];
}

const initialState: IRequestMasterItemsPendingCheckedState = {
  requestMasterItemsPendingChecked: [],
};

export const requestMasterItemsPendingCheckedSlice = createSlice({
  name: "requestMasterItemsPendingCheckedSlice",
  initialState,
  reducers: {
    changeRequestItemsPendingChecked: (state, action) => {
      state.requestMasterItemsPendingChecked = action.payload;
    },
  },
});

export const selectRequestMasterItemsPendingChecked = (state: RootState) =>
  state.requestMasterItemsPendingCheckedStore;

export const { changeRequestItemsPendingChecked } =
  requestMasterItemsPendingCheckedSlice.actions;

export default requestMasterItemsPendingCheckedSlice.reducer;
