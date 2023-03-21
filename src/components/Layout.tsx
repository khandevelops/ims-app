import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Master from '../pages/Master';
import Navbar from './NavbarTop';
import Department from '../pages/Department';
import DepartmentExperience from '../pages/DepartmentMaster';
import RequestsAdmin from '../pages/RequestItemList';
import Requests from '../pages/RequestItemMake';
import { AuthenticatedTemplate } from '@azure/msal-react';
import Auth from '../pages/Auth';
import { useIsAuthenticated } from '@azure/msal-react';
import Home from '../pages/Home';
import NavbarBottom from './NavbarBottom';
import NavbarTop from './NavbarTop';
import { Drawer } from '@mui/material';
import MasterForm from './UpdateMasterForm';
import { selectMasterItems } from '../app/master/masterItemSlice';
import { selectMasterFormDrawer } from '../app/master/masterFormDrawerUpdateSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

const Layout = () => {
    const masterItemsSelector = useAppSelector(selectMasterItems);
    const rightDrawerSelector = useAppSelector(selectMasterFormDrawer);
    const isAuthenticated = useIsAuthenticated();
    const [profile, setProfile] = useState<{role: string, department: string}>({role: 'admin', department: 'extractions'})


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
                <Route path='/' element={<Home/>}/>
                <Route path='department-master'>
                    <Route path="extractions" element={<DepartmentExperience />} />
                    <Route path="mass-spec" element={<DepartmentExperience />} />
                    <Route path="receiving" element={<DepartmentExperience />} />
                    <Route path="rd" element={<DepartmentExperience />} />
                    <Route path="screening" element={<DepartmentExperience />} />
                    <Route path="shipping" element={<DepartmentExperience />} />
                    <Route path="quality" element={<DepartmentExperience />} />
                </Route>
                <Route path="master" element={<Master/>}/>
                <Route path="request">
                    <Route path="list">
                        <Route path="general" element={<RequestsAdmin />} />
                        <Route path="office-supply" element={<RequestsAdmin />} />
                        <Route path="store-room" element={<RequestsAdmin />} />
                    </Route>
                </Route>
                <Route path="department">
                    <Route path="request">
                        <Route path="make">
                            <Route path="general" element={<Requests />} />
                            <Route path="office-supply" element={<Requests />} />
                            <Route path="store-room" element={<Requests />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>

   

            <NavbarBottom/>
        </div>
    );
};

export default Layout;
