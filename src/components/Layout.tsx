import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Master from '../pages/admin/Master';
import Navbar from './Navbar';
import Department from '../pages/admin/Department';
import DepartmentExperience from '../pages/department/DepartmentExperience';
import RequestsAdmin from '../pages/admin/RequestsAdmin';
import Requests from '../pages/department/Requests';
import { AuthenticatedTemplate } from '@azure/msal-react';
import Auth from '../pages/Auth';
import { useIsAuthenticated } from "@azure/msal-react";
import Home from '../pages/Home';

const Layout = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <div>
            <AuthenticatedTemplate>
                <Navbar />
            </AuthenticatedTemplate>

            <Routes>
                <Route path="auth" element={isAuthenticated ? <Home/> : <Auth /> } />
                <Route path="*" element={<Navigate to="auth" />} />
                <Route path="departments">
                    <Route path="master" element={<Master />} />
                    <Route path="extractions" element={<Department />} />
                    <Route path="mass-spec" element={<Department />} />
                    <Route path="receiving" element={<Department />} />
                    <Route path="rd" element={<Department />} />
                    <Route path="screening" element={<Department />} />
                    <Route path="shipping" element={<Department />} />
                    <Route path="quality" element={<Department />} />
                </Route>
                <Route path="department-master">
                    <Route path="extractions" element={<DepartmentExperience />} />
                    <Route path="mass-spec" element={<DepartmentExperience />} />
                    <Route path="receiving" element={<DepartmentExperience />} />
                    <Route path="rd" element={<DepartmentExperience />} />
                    <Route path="screening" element={<DepartmentExperience />} />
                    <Route path="shipping" element={<DepartmentExperience />} />
                    <Route path="quality" element={<DepartmentExperience />} />
                </Route>
                <Route path="request">
                    <Route path="list">
                        <Route path="general" element={<RequestsAdmin />} />
                        <Route path="office-supply" element={<RequestsAdmin />} />
                        <Route path="store-room" element={<RequestsAdmin />} />
                    </Route>
                    <Route path="make">
                        <Route path="general" element={<Requests />} />
                        <Route path="office-supply" element={<Requests />} />
                        <Route path="store-room" element={<Requests />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
};

export default Layout;
