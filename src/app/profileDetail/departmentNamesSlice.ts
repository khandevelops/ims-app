import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getDepartmentNames = () => {
    return axios.get(`${baseUrl}/profile-details/department-names/list`);
};

export interface IDepartmentName {
    id?: number;
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

export const getDepartmentNamesThunk = createAsyncThunk('getDepartmentNamesThunk', async () => {
    const response = await getDepartmentNames();
    return response.data;
});

export const departmentNamesSlice = createSlice({
    name: 'departmentNamesSlice',
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

export const { } = departmentNamesSlice.actions;
export const selectDepartmentNames = (state: RootState) => state.departmentNamesStore;
export default departmentNamesSlice.reducer;
