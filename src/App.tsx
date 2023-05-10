import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { selectProfileDetail } from './app/profileDetail/profileDetailSlice';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import DepartmentExperience from './pages/DepartmentMaster';
import Departments from './pages/Departments';
import Master from './pages/Master';
import StoreRoomMaster from './pages/StoreRoomMaster';
import RequestMasterDepartment from './pages/RequestMasterDepartment';
import RequestMasterAdmin from './pages/RequestMasterAdmin';
import { useAppSelector } from './app/hooks';
import Layout from './components/Layout';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="department">
                <Route path="extractions" element={<DepartmentExperience />} />
                <Route path="mass-spec" element={<DepartmentExperience />} />
                <Route path="receiving" element={<DepartmentExperience />} />
                <Route path="rd" element={<DepartmentExperience />} />
                <Route path="screening" element={<DepartmentExperience />} />
                <Route path="shipping" element={<DepartmentExperience />} />
                <Route path="quality" element={<DepartmentExperience />} />
            </Route>
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
            <Route path="request">
                <Route path="general" element={<RequestMasterDepartment />} />
                <Route path="office-supply" element={<RequestMasterDepartment />} />
                <Route path="store-room" element={<RequestMasterDepartment />} />
            </Route>
        </Route>
    )
);

const App = () => {
    const isAuthenticated = useIsAuthenticated();
    const profileDetailSelector = useAppSelector(selectProfileDetail);

    return <RouterProvider router={router} />;
};

export default App;
