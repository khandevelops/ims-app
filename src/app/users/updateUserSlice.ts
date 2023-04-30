import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const updateUser = (id: number, user: iUser) => {
    return axios.patch(`${baseUrl}/ims/api/v1/users/${id}/update`, user)
}

export interface iUser {
    id: string;
    department: string;
    role: string;
    group: string;
}

export interface iUpdateUserState {
    user: iUser | null,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: iUpdateUserState = {
    user: null,
    status: 'idle'
}

export const updateUserThunk = createAsyncThunk(
    'updateUserThunk',
    async (params: {id: number, user: iUser}) => {
        const response = await updateUser(params.id, params.user)
        return response.data
    }
)

export const updateUserSlice = createSlice({
    name: 'updateUserSlice',
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

export const {  } = updateUserSlice.actions
export const selectUpdateUsers = (state: RootState) => state.updateUserStore;
export default updateUserSlice.reducer;