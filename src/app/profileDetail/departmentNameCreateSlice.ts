import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createDepartmentName = (params: { name: string, key: string }) => {
    return axios.post(`${baseUrl}/profile-details/department-names/create`, params);
};

export interface IDepartmentName {
    id?: string;
    name: string;
    key: string
}

export interface DepartmentNameCreateState {
    departmentName: IDepartmentName | null,
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: DepartmentNameCreateState = {
    departmentName: null,
    status: 'idle'
};

export const departmentNameCreateThunk = createAsyncThunk('departmentNameCreateThunk', async (params: { name: string, key: string }) => {
    const response = await createDepartmentName(params);
    return response.data;
});

export const departmentNameCreateSlice = createSlice({
    name: 'departmentNameCreateSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(departmentNameCreateThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(departmentNameCreateThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.departmentName = action.payload;
            })
            .addCase(departmentNameCreateThunk.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const { } = departmentNameCreateSlice.actions;
export const selectDepartmentNameCreate = (state: RootState) => state.departmentNameCreateStore;
export default departmentNameCreateSlice.reducer;
