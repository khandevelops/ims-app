import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IMasterDepartment } from '../../api/properties/IMaster';
import { getMasterDepartmentItems } from '../../api/master';

export interface MasterDepartmentItemsState {
    response: {
        content: IMasterDepartment[];
        last: boolean;
        totalPages: number;
        totalElements: number;
        first: boolean;
        size: number;
        number: number;
        sorted: boolean;
        numberOfElements: number;
        empty: boolean;
    };
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: MasterDepartmentItemsState = {
    response: {
        content: [],
        last: false,
        totalPages: 0,
        totalElements: 0,
        first: false,
        size: 0,
        number: 0,
        sorted: false,
        numberOfElements: 0,
        empty: false
    },
    status: 'idle'
};

export const getMasterDepartmentItemsThunk = createAsyncThunk(
    'getMasterDepartmentItemThunk',
    async (params: { state: string; page: number }) => {
        const response = await getMasterDepartmentItems(params);
        return response.data;
    }
);

export const masterDepartmentItemsSlice = createSlice({
    name: 'masterDepartmentSlice',
    initialState,
    reducers: {
        changeMasterDepartmentItems: (state, action) => {
            state.response.content = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMasterDepartmentItemsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMasterDepartmentItemsThunk.fulfilled, (state, action) => {
                state.response = action.payload;
            })
            .addCase(getMasterDepartmentItemsThunk.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { changeMasterDepartmentItems } = masterDepartmentItemsSlice.actions;
export const selectMasterDepartmentItems = (state: RootState) => state.masterDepartmentItemsStore;
export default masterDepartmentItemsSlice.reducer;
