import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { IRequestMasterItem } from "./requestMasterItemsSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getRequestMasterItems = (state: string, page: number) => {
  return axios.get(
    `${baseUrl}/request-master/${state}/list/transformed/complete?page=${page}`
  );
};

export interface IRequestMasterState {
  response: {
    content: IRequestMasterItem[];
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

const initialState: IRequestMasterState = {
  response: {
    content: [],
    pageable: {
      sort: {
        empty: false,
        sorted: false,
        unsorted: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      paged: false,
      unpaged: false,
    },
    last: false,
    totalPages: 0,
    totalElements: 0,
    first: false,
    size: 0,
    number: 0,
    sort: {
      empty: false,
      sorted: false,
      unsorted: false,
    },
    numberOfElements: 0,
    empty: false,
  },
  status: "idle",
};

export const getRequestMasterItemsCompleteThunk = createAsyncThunk(
  "getRequestMasterDepartmentItemsThunk",
  async (params: { state: string; page: number }) => {
    const response = await getRequestMasterItems(params.state, params.page);
    return response.data;
  }
);

export const requestMasterItemsCompleteSlice = createSlice({
  name: "requestItemsSlice",
  initialState,
  reducers: {
    changeRequestMasterItems: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRequestMasterItemsCompleteThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getRequestMasterItemsCompleteThunk.fulfilled,
        (state, action) => {
          state.response = action.payload;
        }
      )
      .addCase(getRequestMasterItemsCompleteThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectRequestMasterItemsComplete = (state: RootState) =>
  state.requestMasterItemsCompleteStore;

export const { changeRequestMasterItems } =
  requestMasterItemsCompleteSlice.actions;

export default requestMasterItemsCompleteSlice.reducer;
