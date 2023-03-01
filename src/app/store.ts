import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import masterReducer from './master/masterSlice';
import masterFormReducer from "./master/masterFormSlice";
import updateMasterFormDrawerReducer from './master/masterFormDrawerUpdateSlice';
import departmentExperienceItemsReducer from "./departmentExperience/departmentExperienceSlice";
import updateTotalQuantityFromDrawerReducer from './master/quantityFormDrawerSlice';
import requestsCreateReducer from './requests/requestItemsCreateConfirmationSlice';
import updateQuantityByListReducer from './departmentExperience/quantityUpdateSlice';
import pageReducer from './common/pageSlice';
import requestItemsUpdateReducer from "./requests/requestItemsUpdateSlice";
import departmentUpdateReducer from './department/departmentUpdateSlice';
import masterDepartmentReducer from './masterDepartment/masterDepartmentSlice';
import departmentItemsReducer from './department/departmentItemsSlice';
import requestItemsReducer from './requests/requestItemsSlice';
import departmentMasterItemsReducer from './departmentMaster/departmentMasterItemsSlice';
import requestItemsConfirmationReducer from './requests/requestItemsConfirmation';
import requestTabReducer from './common/requestTabSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    masterItemsStore: masterReducer,
    masterFormStore: masterFormReducer,
    masterDepartmentStore: masterDepartmentReducer,
    masterFormDrawerStore: updateMasterFormDrawerReducer,
    departmentExperienceItemsStore: departmentExperienceItemsReducer,
    quantityFormDrawerStore: updateTotalQuantityFromDrawerReducer,
    quantityUpdateStore: updateQuantityByListReducer,
    requestsCreateStore: requestsCreateReducer,
    requestUpdateStore: requestItemsUpdateReducer,
    requestItemsStore: requestItemsReducer,
    pageStore: pageReducer,
    departmentUpdateStore: departmentUpdateReducer,
    departmentItemsStore: departmentItemsReducer,
    departmentMasterItemsStore: departmentMasterItemsReducer,
    requestItemsConfirmationStore: requestItemsConfirmationReducer,
    requestTabStore: requestTabReducer,
    profileStore: profileReducer,
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