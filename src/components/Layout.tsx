import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Master from '../pages/Master';
import DepartmentExperience from '../pages/DepartmentMaster';
import { useIsAuthenticated } from '@azure/msal-react';
import Home from '../pages/Home';
import NavbarBottom from './NavbarBottom';
import NavbarTop from './NavbarTop';
import { Box, Drawer } from '@mui/material';
import MasterForm from './UpdateMasterForm';
import { useAppSelector } from '../app/hooks';
import StoreRoomMaster from '../pages/StoreRoomMaster';
import RequestList from '../pages/RequestMasterAdmin';
import RequestMasterDepartment from '../pages/RequestMasterDepartment';
import DepartmentPage from '../pages/DepartmentPage';
import Departments from '../pages/Departments';

const Layout = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <div>
            {/* <AuthenticatedTemplate>
                <Navbar />
            </AuthenticatedTemplate> */}
            <NavbarTop />

            <Routes>
                {/* <Route path="auth" element={isAuthenticated ? <Home/> : <Auth /> } /> */}
                {/* <Route path="*" element={<Navigate to="auth" />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="department-master">
                    <Route path="extractions" element={<DepartmentExperience />} />
                    <Route path="mass-spec" element={<DepartmentExperience />} />
                    <Route path="receiving" element={<DepartmentExperience />} />
                    <Route path="rd" element={<DepartmentExperience />} />
                    <Route path="screening" element={<DepartmentExperience />} />
                    <Route path="shipping" element={<DepartmentExperience />} />
                    <Route path="quality" element={<DepartmentExperience />} />
                </Route>
                <Route path="department">
                    <Route path="extractions" element={<Departments />} />
                    <Route path="mass-spec" element={<DepartmentPage />} />
                    <Route path="receiving" element={<DepartmentPage />} />
                    <Route path="rd" element={<DepartmentPage />} />
                    <Route path="screening" element={<DepartmentPage />} />
                    <Route path="shipping" element={<DepartmentPage />} />
                    <Route path="quality" element={<DepartmentPage />} />
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
                <Route path="store-room-master" element={<StoreRoomMaster />} />
                <Route path="request">
                    <Route path="admin"></Route>
                </Route>
                <Route path="request-master">
                    <Route path="general/admin" element={<RequestList />} />
                    <Route path="office-supply/admin" element={<RequestList />} />
                    <Route path="store-room/admin" element={<RequestList />} />
                </Route>
                <Route path="request">
                    <Route path="general" element={<RequestMasterDepartment />} />
                    <Route path="office-supply" element={<RequestMasterDepartment />} />
                    <Route path="store-room" element={<RequestMasterDepartment />} />
                </Route>
            </Routes>

            <NavbarBottom />
        </div>
    );
};

export default Layout;
