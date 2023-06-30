import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Dashboard from './pages/Dashboard';
import { useAppSelector } from './app/hooks';
import Departments from './pages/DepartmentsMaster';
import Master from './pages/Master';
import StoreRoomMaster from './pages/StoreRoomMaster';
import RequestMasterDepartment from './pages/RequestMasterDepartment';
import RequestMasterAdmin from './pages/RequestMasterAdmin';
import Layout from './components/Layout';
import { Box } from '@mui/material';
import Auth from './pages/Auth';
import RequestMasterDepartmentItems from './components/RequestMasterDepartmentItems';
import RequestMasterDepartmentComplete from './components/RequestMasterDepartmentComplete';
import RequestMasterDepartmentPending from './components/RequestMasterDepartmentPending';
import { DRAWER_TOGGLE_TYPE } from './common/constants';
import { selectDrawerToggleType } from './app/slice/drawerToggle/drawerToggleTypeSlice';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="admin">
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="master" element={<Master />} />
                <Route path="store-room" element={<StoreRoomMaster />} />
                <Route path="request">
                    <Route path="general" element={<RequestMasterAdmin />} />
                    <Route path="office-supply" element={<RequestMasterAdmin />} />
                    <Route path="store-room" element={<RequestMasterAdmin />} />
                </Route>
            </Route>

            <Route path="departments">
                <Route path="extractions" element={<Departments />} />
                <Route path="mass-spec" element={<Departments />} />
                <Route path="specimen-processing" element={<Departments />} />
                <Route path="rd" element={<Departments />} />
                <Route path="screening" element={<Departments />} />
                <Route path="shipping" element={<Departments />} />
                <Route path="shipping" element={<Departments />} />
                <Route path="qc-internal-standards" element={<Departments />} />
                <Route path="quality" element={<Departments />} />
                <Route path="general-request" element={<RequestMasterDepartment />}>
                    <Route path="list" element={<RequestMasterDepartmentItems />} />
                    <Route path="confirmation" element={<RequestMasterDepartmentPending />} />
                    <Route path="status" element={<RequestMasterDepartmentComplete />} />
                </Route>
                <Route path="office-supply-request" element={<RequestMasterDepartment />}>
                    <Route path="list" element={<RequestMasterDepartmentItems />} />
                    <Route path="confirmation" element={<RequestMasterDepartmentPending />} />
                    <Route path="status" element={<RequestMasterDepartmentComplete />} />
                </Route>
                <Route path="store-room-request" element={<RequestMasterDepartment />}>
                    <Route path="list" element={<RequestMasterDepartmentItems />} />
                    <Route path="confirmation" element={<RequestMasterDepartmentPending />} />
                    <Route path="status" element={<RequestMasterDepartmentComplete />} />
                </Route>
            </Route>
        </Route>
    )
);

const App = () => {
    const { type } = useAppSelector(selectDrawerToggleType);
    return (
        <Box>
            <UnauthenticatedTemplate>
                <Auth />
            </UnauthenticatedTemplate>
            <AuthenticatedTemplate>
                <RouterProvider router={router} />
            </AuthenticatedTemplate>
        </Box>
    );
};

export default App;
