import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { iProfileDetail } from "./profileDetailSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const updateProfileDetail = (id: number, user: iProfileDetail) => {
    return axios.patch(`${baseUrl}/ims/api/v1/users/${id}/update`, user)
}


export interface iUpdateDetailState {
    user: iProfileDetail | null,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: iUpdateDetailState = {
    user: null,
    status: 'idle'
}

export const updateUserThunk = createAsyncThunk(
    'updateUserThunk',
    async (params: {id: number, user: iProfileDetail}) => {
        const response = await updateProfileDetail(params.id, params.user)
        return response.data
    }
)

export const profileDetailSlice = createSlice({
    name: 'profileDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateUserThunk.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload
            })
            .addCase(updateUserThunk.rejected, (state) => {
                state.status = 'failed'
            })

    }
})

export const {  } = profileDetailSlice.actions
export const selectUpdateProfileDetail = (state: RootState) => state.updateProfileDetailStore;
export default profileDetailSlice.reducer;