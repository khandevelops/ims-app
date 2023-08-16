import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IRequestMaster } from '../../api/properties/IRequest';

export interface IRequestMasterState {
    response: {
        content: IRequestMaster[];
        pageable: {
            sort: {
                empty: boolean;
                sorted: boolean;
                unsorted: boolean;
            };
            offset: number;
            pageNumber: number;
            pageSize: number;
            paged: boolean;
            unpaged: boolean;
        };
        last: boolean;
        totalPages: number;
        totalElements: number;
        first: boolean;
        size: number;
        number: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        numberOfElements: number;
        empty: boolean;
    };
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRequestMasterState = {
    response: {
        content: [],
        pageable: {
            sort: {
                empty: false,
                sorted: false,
                unsorted: false
            },
            offset: 0,
            pageNumber: 0,
            pageSize: 0,
            paged: false,
            unpaged: false
        },
        last: false,
        totalPages: 0,
        totalElements: 0,
        first: false,
        size: 0,
        number: 0,
        sort: {
            empty: false,
            sorted: false,
            unsorted: false
        },
        numberOfElements: 0,
        empty: false
    },
    status: 'idle'
};

export const getRequestMasterItemsThunk = createAsyncThunk(
    'getRequestMasterItemsThunk',
    async (params: { pathName: string; page: number }) => {
        const response = await getRequestMasterItems(params.pathName, params.page);
        return response.data;
    }
);

export const requestMasterItemsSlice = createSlice({
    name: 'requestListSlice',
    initialState,
    reducers: {
        updateRequestItemList: (state, action) => {
            state.response.content = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRequestMasterItemsThunk.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getRequestMasterItemsThunk.fulfilled, (state, action) => {
            state.response = action.payload;
        });
        builder.addCase(getRequestMasterItemsThunk.rejected, (state) => {
            state.status = 'failed';
        });
    }
});

export const { updateRequestItemList } = requestMasterItemsSlice.actions;

export const selectRequestMasterAdminItems = (state: RootState) => state.requestMasterItemsAdminStore;

export default requestMasterItemsSlice.reducer;
