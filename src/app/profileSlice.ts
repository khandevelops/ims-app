import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface iProfile {
    name: string
}

export interface iProfileState {
    profile: iProfile,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: iProfileState = {
    profile: {
        name: ''
    },
    status: 'idle'
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getProfile: (state, action) => {
            state.profile = action.payload
        }
    }
})

export const { getProfile } = profileSlice.actions
export const selectProfile = (state: RootState) => state.profileStore;
export default profileSlice.reducer;