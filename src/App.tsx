import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Dashboard from './pages/Dashboard';
import DepartmentExperience from './pages/DepartmentMaster';
import Departments from './pages/Departments';
import Master from './pages/Master';
import StoreRoomMaster from './pages/StoreRoomMaster';
import RequestMasterDepartment from './pages/RequestMasterDepartment';
import RequestMasterAdmin from './pages/RequestMasterAdmin';
import Layout from './components/Layout';
import { Box } from '@mui/material';
import Auth from './pages/Auth';
import RequestMasterDepartmentItems from './components/RequestMasterDepartmentItems';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="departments">
                <Route path="extractions" element={<Departments />} />
                <Route path="mass-spec" element={<Departments />} />
                <Route path="receiving" element={<Departments />} />
                <Route path="rd" element={<Departments />} />
                <Route path="screening" element={<Departments />} />
                <Route path="shipping" element={<Departments />} />
                <Route path="quality" element={<Departments />} />
            </Route>
            <Route path="master" element={<Master />} />
            <Route path="store-room" element={<StoreRoomMaster />} />
            <Route path="request">
                <Route path="admin"></Route>
            </Route>
            <Route path="request-master">
                <Route path="general/admin" element={<RequestMasterAdmin />} />
                <Route path="office-supply/admin" element={<RequestMasterAdmin />} />
                <Route path="store-room/admin" element={<RequestMasterAdmin />} />
            </Route>
            <Route path="general-request" element={<RequestMasterDepartment />}>
                <Route path="list" element={<RequestMasterDepartmentItems />} />
            </Route>
            <Route path="office-supply-request" element={<RequestMasterDepartment />} />
            <Route path="store-room-request" element={<RequestMasterDepartment />} />
        </Route>
    )
);

const App = () => {
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
