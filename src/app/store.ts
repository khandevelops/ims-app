import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import masterReducer from './slice/master/masterItemsSlice';
import pageReducer from './common/pageSlice';
import masterDepartmentItemReducer from './slice/masterDepartment/masterDepartmentItemSlice';
import departmentItemsReducer from './departments/departmentItemsSlice';
import requestMasterItemsReducer from './requestMaster/requestMasterItemsSlice';
import requestTabReducer from './common/requestTabSlice';
import profileReducer from './profileSlice';
import searchReducer from './search';
import storeRooomMasterItemsReducer from './slice/storeRoom/storeRoomMasterItemsSlice'
import storeRooomUpdateReducer from './slice/storeRoom/storeRoomUpdateSlice'
import requestItemsUpdateReducer from './requestMaster/requestMasterItemsUpdateSlice'
import requestMasterItemsAdminReducer from './requestAdminMaster/requestMasterAdminItemsSlice'
import bottomToolbarItemsReducer from './bottomToolbar/bottomToolbarItems'
import requestMasterItemsCheckedReducer from './requestMaster/requestMasterItemsCheckedSlice'
import drawerToggleTypeReducer from './slice/drawerToggle/drawerToggleTypeSlice'
import requestMasterItemsCreateReducer from './requestMaster/requestMasterItemsCreateSlice'
import requestMasterItemsCompleteReducer from './requestMaster/requestMasterItemsCompleteSlice'
import requestMasterItemsPendingReducer from './requestMaster/requestMasterItemsPendingSlice'
import requestMasterItemsUpdateReducer from './requestMaster/requestMasterItemsUpdateSlice'
import requestMasterItemUpdateReducer from './requestMaster/requestMasterItemUpdateSlice'
import masterDepartmentItemsReducer from './slice/master/masterDepartmentItemsSlice'
import masterItemUpdateReducer from './slice/master/masterItemUpdateSlice'
import profileDetailsReducer from './profileDetail/profileDetailsSlice'
import updateProfileDetailReducer from './profileDetail/updateProfileDetailSlice'
import profilesReducer from './profilesSlice'
import profileDetailReducer from './profileDetail/profileDetailSlice'
import requestMasterItemsPendingCheckedReducer from './requestMaster/requestMasterItemsPendingCheckedSlice'
import downloadDepartmentMasterItemsReducer from './download/downloadDepartmentMasterItemsSlice'
import departmentMasterItemsReducer from './slice/department/departmentMasterItemsSlice'
import departmentItemUpdateReducer from './slice/department/departmentItemUpdateSlice'
import departmentItemReducer from './slice/department/departmentItemSlice'
import masterItemCreateReducer from './slice/master/masterItemCreateSlice'
import masterItemAssignReducer from './slice/master/masterItemAssignSlice'
import totalAmountReducer from './slice/totalAmount'
import masterItemsFilterReducer from './slice/master/masterItemsFilterSlice'

export const store = configureStore({
  reducer: {
    masterItemAssignStore: masterItemAssignReducer,
    masterItemsStore: masterReducer,
    masterItemCreateStore: masterItemCreateReducer,
    masterDepartmentItemStore: masterDepartmentItemReducer,
    pageStore: pageReducer,
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
    requestMasterItemUpdateStore: requestMasterItemUpdateReducer,
    masterDepartmentItemsStore: masterDepartmentItemsReducer,
    masterItemUpdateStore: masterItemUpdateReducer,
    profileDetailsStore: profileDetailsReducer,
    updateProfileDetailStore: updateProfileDetailReducer,
    profilesStore: profilesReducer,
    profileDetailStore: profileDetailReducer,
    requestMasterItemsPendingCheckedStore: requestMasterItemsPendingCheckedReducer,
    downloadDepartmentMasterItemsStore: downloadDepartmentMasterItemsReducer,
    departmentMasterItemsStore: departmentMasterItemsReducer,
    departmentItemUpdateStore: departmentItemUpdateReducer,
    departmentItemStore: departmentItemReducer,
    totalAmountStore: totalAmountReducer,
    masterItemsFilterStore: masterItemsFilterReducer
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