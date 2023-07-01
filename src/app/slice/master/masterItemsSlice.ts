import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import { IMaster } from '../../api/properties/IMaster';
import { getMasterItems } from '../../api/master';

export interface MasterState {
    response: {
        content: IMaster[],
        number: number,
        totalElements: number,
        size: number,
    };
    status: 'idle' | 'loading' | 'success' | 'failed';
}


const initialState: MasterState = {
    response: {
        content: [],
        number: 0,
        totalElements: 0,
        size: 0
    },
    status: 'idle'
}

export const getMasterItemsThunk = createAsyncThunk(
    'getMasterItemsThunk',
    async (page: number) => {
        const response = await getMasterItems(page)
        return response.data
    }
)

// export const getMasterItemsFilteredThunk = createAsyncThunk(
//     'getMasterItemsFilteredThunk',
//     async (params: { page: number, keyword: string }) => {
//         const response = await getMasterItemsFiltered(params.page, params.keyword)
//         return response.data
//     }
// )

export const masterItemsSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        changeMasterItems: (state, action: PayloadAction<IMaster[]>) => {
            state.response.content = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMasterItemsThunk.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(getMasterItemsThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.response = action.payload
            })
            .addCase(getMasterItemsThunk.rejected, (state) => {
                state.status = 'failed'
            })
        // .addCase(getMasterItemsFilteredThunk.pending, (state) => {
        //     state.status = 'loading'
        // })
        // .addCase(getMasterItemsFilteredThunk.fulfilled, (state, action) => {
        //     state.status = 'success';
        //     state.response = action.payload
        // })
        // .addCase(getMasterItemsFilteredThunk.rejected, (state) => {
        //     state.status = 'failed'
        // })
    }
})

export const { changeMasterItems } = masterItemsSlice.actions;
export const selectMasterItems = (state: RootState) => state.masterItemsStore
export default masterItemsSlice.reducer



