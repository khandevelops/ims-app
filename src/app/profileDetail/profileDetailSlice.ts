import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createProfileDetail = (profileDetail: iProfileDetail) => {
    return axios.post(`${baseUrl}/profile-details/create`, profileDetail)
}

export const updateProfileDetail = (profileDetail: iProfileDetail, id: string) => {
    return axios.patch(`${baseUrl}/profile-details/${id}/update`, profileDetail)
}

export const fetchProfileDetail = (id: string) => {
    return axios.get(`${baseUrl}/profile-details/${id}`)
}

export interface iProfileDetail {
    id?: string;
    department?: string;
    role?: string;
    permission?: string;
}

export interface iProfileDetailState {
    profileDetail: iProfileDetail | null,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: iProfileDetailState = {
    profileDetail: null,
    status: 'idle'
}

export const getProfileDetailThunk = createAsyncThunk(
    'getProfileDetailThunk',
    async (id: string) => {
        const response = await fetchProfileDetail(id)
        return response.data
    }
)

export const createProfileDetailThunk = createAsyncThunk(
    'createUsersThunk',
    async (profileDetail: iProfileDetail) => {
        const response = await createProfileDetail(profileDetail)
        return response.data
    }
)

export const updateProfileDetailThunk = createAsyncThunk(
    'updateProfileDetailThunk',
    async (params: { profileDetail: iProfileDetail, id: string }) => {
        const response = await updateProfileDetail(params.profileDetail, params.id)
        return response.data
    }
)

export const profileDetailSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProfileDetailThunk.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(getProfileDetailThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.profileDetail = action.payload
            })
            .addCase(getProfileDetailThunk.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(createProfileDetailThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createProfileDetailThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.profileDetail = action.payload
            })
            .addCase(createProfileDetailThunk.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(updateProfileDetailThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateProfileDetailThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.profileDetail = action.payload
            })
            .addCase(updateProfileDetailThunk.rejected, (state) => {
                state.status = 'failed'
            })

    }
})

export const { } = profileDetailSlice.actions
export const selectProfileDetail = (state: RootState) => state.profileDetailStore;
export default profileDetailSlice.reducer;