import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { iProfileDetail } from "./profileDetailSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createProfileDetails = (users: iProfileDetail[]) => {
  return axios.post(`${baseUrl}/profile-details/create`, users);
};

export const syncProfileDetails = (users: iProfileDetail[]) => {
  return axios.post(`${baseUrl}/profile-details/sync`, users);
};

export const getProfileDetails = () => {
  return axios.get(`${baseUrl}/profile-details/list`);
};

export interface iProfileDetailState {
  profileDetails: iProfileDetail[];
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: iProfileDetailState = {
  profileDetails: [],
  status: "idle",
};

export const getProfileDetailsThunk = createAsyncThunk(
  "getProfileDetailsThunk",
  async () => {
    const response = await getProfileDetails();
    return response.data;
  }
);

export const createProfileDetailsThunk = createAsyncThunk(
  "createProfileDetailsThunk",
  async (profileDetails: iProfileDetail[]) => {
    const response = await createProfileDetails(profileDetails);
    return response.data;
  }
);

export const syncProfileDetailsThunk = createAsyncThunk(
  "createProfileDetailsThunk",
  async (profileDetails: iProfileDetail[]) => {
    const response = await syncProfileDetails(profileDetails);
    return response.data;
  }
);

export const profileDetailsSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    changeProfileDetails: (state, action) => {
      state.profileDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileDetailsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfileDetailsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.profileDetails = action.payload;
      })
      .addCase(getProfileDetailsThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createProfileDetailsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProfileDetailsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.profileDetails = action.payload;
      })
      .addCase(createProfileDetailsThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { changeProfileDetails } = profileDetailsSlice.actions;
export const selectProfileDetails = (state: RootState) =>
  state.profileDetailsStore;
export default profileDetailsSlice.reducer;
