import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IStoreRoomMaster } from "../../api/properties/IStoreRoom";
import { getStoreRoomMasterItems } from "../../api/storeRoom";

export interface StoreRoomMasterState {
  response: null | {
    content: IStoreRoomMaster[];
    pageable: {
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  };
  status: "idle" | "loading" | "success" | "failed";
}

export const initialState: StoreRoomMasterState = {
  response: null,
  status: "idle",
};

export const getStoreRoomMasterItemsThunk = createAsyncThunk(
  "getStoreRoomMasterItemsThunk",
  async (page: number) => {
    const response = await getStoreRoomMasterItems(page);
    return response.data;
  }
);

export const storeRoomMasterItemsSlice = createSlice({
  name: "storeRoomSlice",
  initialState,
  reducers: {
    changeStoreRoomMasterItems: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreRoomMasterItemsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStoreRoomMasterItemsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.response = action.payload;
      })
      .addCase(getStoreRoomMasterItemsThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { changeStoreRoomMasterItems } = storeRoomMasterItemsSlice.actions;
export const selectStoreRoomMasterItems = (state: RootState) =>
  state.storeRooomMasterItemsStore;
export default storeRoomMasterItemsSlice.reducer;
