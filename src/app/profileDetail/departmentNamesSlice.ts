import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getDepartmentNames = () => {
    return axios.get(`${baseUrl}/profile-details/department-names/list`);
};

export interface IDepartmentName {
    id?: string;
    name: string;
    key: string
}

export interface DepartmentNameState {
    departmentNames: IDepartmentName[]
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: DepartmentNameState = {
    departmentNames: [],
    status: 'idle'
};

export const getDepartmentNamesThunk = createAsyncThunk('getDepartmentNamesThunk', async (id: string) => {
    const response = await getDepartmentNames();
    return response.data;
});

export const getDepartmentNamesSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDepartmentNamesThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDepartmentNamesThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.departmentNames = action.payload;
            })
            .addCase(getDepartmentNamesThunk.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const { } = getDepartmentNamesSlice.actions;
export const selectDepartmentNames = (state: RootState) => state.departmentNamesStore;
export default getDepartmentNamesSlice.reducer;
