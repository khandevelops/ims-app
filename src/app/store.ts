import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import masterReducer from './master/masterItemSlice';
import masterFormReducer from "./master/masterFormSlice";
import updateMasterFormDrawerReducer from './master/masterFormDrawerUpdateSlice';
import departmentMasterReducer from "./departmentMaster/departmentMasterSlice";
import updateTotalQuantityFromDrawerReducer from './master/quantityFormDrawerSlice';
import requestMakeItemCreateReducer from './requestDepartment/requestMakeItemCreateConfirmationSlice';
import updateQuantityReducer from './departmentMaster/updateQuantitySlice';
import pageReducer from './common/pageSlice';
import requestMakeItemUpdateReducer from "./requestDepartment/requestMakeItemUpdateSlice";
import departmentUpdateReducer from './department/departmentUpdateSlice';
import masterDepartmentReducer from './masterDepartment/masterDepartmentSlice';
import departmentItemsReducer from './department/departmentItemsSlice';
import requestMakeItemReducer from './requestDepartment/requestMakeItemSlice';
import requestMasterItemsReducer from './requestMaster/requestMasterItemsSlice';
import requestItemsConfirmationReducer from './requestDepartment/requestMakeItemConfirmation';
import requestTabReducer from './common/requestTabSlice';
import profileReducer from './profileSlice';
import searchReducer from './search';
import storeRooomMasterItemsReducer from './storeRoom/storeRoomMasterItemsSlice'
import storeRooomUpdateReducer from './storeRoom/storeRoomUpdateSlice'

export const store = configureStore({
  reducer: {
    masterItemsStore: masterReducer,
    masterFormStore: masterFormReducer,
    masterDepartmentStore: masterDepartmentReducer,
    masterFormDrawerStore: updateMasterFormDrawerReducer,
    departmentMasterStore: departmentMasterReducer,
    quantityFormDrawerStore: updateTotalQuantityFromDrawerReducer,
    updateQuantityStore: updateQuantityReducer,
    requestMakeItemUpdateStore: requestMakeItemUpdateReducer,
    requestMakeItemCreateStore: requestMakeItemCreateReducer,
    requestMakeItemStore: requestMakeItemReducer,
    pageStore: pageReducer,
    departmentUpdateStore: departmentUpdateReducer,
    departmentItemsStore: departmentItemsReducer,
    requestMasterItemsStore: requestMasterItemsReducer,
    requestItemsConfirmationStore: requestItemsConfirmationReducer,
    requestTabStore: requestTabReducer,
    profileStore: profileReducer,
    searchStore: searchReducer,
    storeRooomMasterItemsStore: storeRooomMasterItemsReducer,
    storeRooomUpdateStore: storeRooomUpdateReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;