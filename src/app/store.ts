import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import masterReducer from './master/masterItemSlice';
import masterFormReducer from "./master/masterFormSlice";
import departmentMasterReducer from "./departmentMaster/departmentMasterSlice";
import updateQuantityReducer from './departmentMaster/updateQuantitySlice';
import pageReducer from './common/pageSlice';
import departmentUpdateReducer from './department/departmentUpdateSlice';
import masterDepartmentReducer from './masterDepartment/masterDepartmentSlice';
import departmentItemsReducer from './department/departmentItemsSlice';
import requestMasterItemsReducer from './requestMaster/requestMasterItemsSlice';
import requestTabReducer from './common/requestTabSlice';
import profileReducer from './profileSlice';
import searchReducer from './search';
import storeRooomMasterItemsReducer from './storeRoom/storeRoomMasterItemsSlice'
import storeRooomUpdateReducer from './storeRoom/storeRoomUpdateSlice'
import requestItemsUpdateReducer from './requestMaster/requestMasterItemsUpdateSlice'
import requestMasterItemsAdminReducer from './requestAdminMaster/requestMasterAdminItemsSlice'
import bottomToolbarItemsReducer from './bottomToolbar/bottomToolbarItems'
import requestMasterItemsCheckedReducer from './requestMaster/requestMasterItemsCheckedSlice'
import drawerToggleTypeReducer from './drawerToggle/drawerToggleTypeSlice'
import requestMasterItemsCreateReducer from './requestMaster/requestMasterItemsCreateSlice'
import requestMasterItemsCompleteReducer from './requestMaster/requestMasterItemsCompleteSlice'
import requestMasterItemsPendingReducer from './requestMaster/requestMasterItemsPendingSlice'
import requestMasterItemsUpdateReducer from './requestMaster/requestMasterItemsUpdateSlice'
import requestMasterItemUpdateReducer from './requestMaster/requestMasterItemUpdateSlice'

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
    requestItemsUpdateStore: requestItemsUpdateReducer,
    requestMasterItemsAdminStore: requestMasterItemsAdminReducer,
    bottomToolbarItemsStore: bottomToolbarItemsReducer,
    requestMasterItemsCheckedStore: requestMasterItemsCheckedReducer,
    drawerToggleTypeStore: drawerToggleTypeReducer,
    requestMasterItemsCreateStore: requestMasterItemsCreateReducer,
    requestMasterItemsCompleteStore: requestMasterItemsCompleteReducer,
    requestMasterItemsPendingStore: requestMasterItemsPendingReducer,
    requestMasterItemsUpdateStore: requestMasterItemsUpdateReducer,
    requestMasterItemUpdateStore: requestMasterItemUpdateReducer
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