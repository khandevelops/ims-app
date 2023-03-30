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
import { selectMasterFormDrawer } from '../app/master/masterFormDrawerUpdateSlice';
import { useAppSelector } from '../app/hooks';
import StoreRoomMaster from '../pages/StoreRoomMaster';
import RequestList from '../pages/RequestMasterAdmin';
import RequestMake from '../pages/RequestMasterDepartment';

const Layout = () => {
    const rightDrawerSelector = useAppSelector(selectMasterFormDrawer);
    const isAuthenticated = useIsAuthenticated();

    return (
        <div>
            {/* <AuthenticatedTemplate>
                <Navbar />
            </AuthenticatedTemplate> */}
            <NavbarTop />
            <Drawer anchor="right" open={rightDrawerSelector.open}>
                <MasterForm />
            </Drawer>

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
                <Route path="master" element={<Master />} />
                <Route path="store-room-master" element={<StoreRoomMaster />} />
                <Route path="request">
                    <Route path="admin"></Route>
                </Route>
                <Route path="request-master">
                    <Route path="general" element={<RequestList />} />
                    <Route path="office-supply" element={<RequestList />} />
                    <Route path="store-room" element={<RequestList />} />
                    <Route path="make">
                        <Route path="general" element={<RequestMake />} />
                        <Route path="office-supply" element={<RequestMake />} />
                        <Route path="store-room" element={<RequestMake />} />
                    </Route>
                </Route>
            </Routes>

            <NavbarBottom />
        </div>
    );
};

export default Layout;
