import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createUsers = (users: iUser[]) => {
    return axios.post(`${baseUrl}/users/create`, users)
}

export const getUsers = () => {
    return axios.get(`${baseUrl}/users`)
}

export interface iUser {
    id: string;
    department: string;
    role: string;
    group: string;
}

export interface iUserState {
    users: iUser[],
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: iUserState = {
    users: [],
    status: 'idle'
}

export const getUsersThunk = createAsyncThunk(
    'getUsersThunk',
    async () => {
        const response = await getUsers()
        return response.data
    }
)

export const createUsersThunk = createAsyncThunk(
    'createUsersThunk',
    async (users: iUser[]) => {
        const response = await createUsers(users)
        return response.data
    }
)

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        getProfile: (state, action) => {
            state.users = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsersThunk.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload
            })
            .addCase(getUsersThunk.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(createUsersThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createUsersThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload
            })
            .addCase(createUsersThunk.rejected, (state) => {
                state.status = 'failed'
            })

    }
})

export const { getProfile } = usersSlice.actions
export const selectUsers = (state: RootState) => state.usersStore;
export default usersSlice.reducer;