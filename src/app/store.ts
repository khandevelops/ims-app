import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import masterReducer from './master/masterItemSlice';
import masterFormReducer from "./master/masterFormSlice";
import departmentMasterReducer from "./departmentMaster/departmentMasterSlice";
import updateQuantityReducer from './departmentMaster/updateQuantitySlice';
import pageReducer from './common/pageSlice';
import departmentUpdateReducer from './department/departmentUpdateSlice';
import masterDepartmentReducer from './masterDepartment/masterDepartmentSlice';
import departmentItemsReducer from './department/departmentItemsSlice';
import requestMasterItemsReducer from './requestMaster/requestMasterItems';
import requestTabReducer from './common/requestTabSlice';
import profileReducer from './profileSlice';
import searchReducer from './search';
import storeRooomMasterItemsReducer from './storeRoom/storeRoomMasterItemsSlice'
import storeRooomUpdateReducer from './storeRoom/storeRoomUpdateSlice'
import requestMasterDepartmentItemsReducer from './requestMasterDepartment/requestMasterDepartmentItemsSlice'
import requestItemsUpdateReducer from './requestMaster/requestMasterItemsUpdate'
import requestItemsCreateReducer from './request/requestItemsCreateSlice'
import requestMasterItemsAdminReducer from './requestAdminMaster/requestMasterAdminItemsSlice'
import bottomToolbarItemsReducer from './bottomToolbar/bottomToolbarItems'
import requestMasterItemsCheckedReducer from './requestMaster/requestMasterItemsChecked'
import drawerToggleTypeReducer from './drawerToggle/drawerToggleTypeSlice'
import requestItemsReducer from './request/requestItemsSlice'
import requestMasterItemsCreateReducer from './requestMaster/requestMasterItemsCreateSlice'

export const store = configureStore({
  reducer: {
    masterItemsStore: masterReducer,
    masterFormStore: masterFormReducer,
    masterDepartmentStore: masterDepartmentReducer,
    departmentMasterStore: departmentMasterReducer,
    updateQuantityStore: updateQuantityReducer,
    pageStore: pageReducer,
    departmentUpdateStore: departmentUpdateReducer,
    departmentItemsStore: departmentItemsReducer,
    requestMasterItemsStore: requestMasterItemsReducer,
    requestTabStore: requestTabReducer,
    profileStore: profileReducer,
    searchStore: searchReducer,
    storeRooomMasterItemsStore: storeRooomMasterItemsReducer,
    storeRooomUpdateStore: storeRooomUpdateReducer,
    requestMasterDepartmentItemsStore: requestMasterDepartmentItemsReducer,
    requestItemsUpdateStore: requestItemsUpdateReducer,
    requestItemsCreateStore: requestItemsCreateReducer,
    requestMasterItemsAdminStore: requestMasterItemsAdminReducer,
    bottomToolbarItemsStore: bottomToolbarItemsReducer,
    requestMasterItemsCheckedStore: requestMasterItemsCheckedReducer,
    drawerToggleTypeStore: drawerToggleTypeReducer,
    requestItemsStore: requestItemsReducer,
    requestMasterItemsCreateStore: requestMasterItemsCreateReducer
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