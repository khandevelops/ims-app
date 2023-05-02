import { Route, Routes } from 'react-router-dom';
import Master from '../pages/Master';
import DepartmentExperience from '../pages/DepartmentMaster';
import { AuthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import NavbarBottom from './NavbarBottom';
import NavbarTop from './NavbarTop';
import StoreRoomMaster from '../pages/StoreRoomMaster';
import RequestList from '../pages/RequestMasterAdmin';
import RequestMasterDepartment from '../pages/RequestMasterDepartment';
import Departments from '../pages/Departments';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import { useAppSelector } from '../app/hooks';
import { selectProfileDetail } from '../app/profileDetail/profileDetailSlice';
import { department } from '../common/constants';

const Layout = () => {
    const isAuthenticated = useIsAuthenticated();
    const profileDetailSelector = useAppSelector(selectProfileDetail);

    return (
        <div>
            <AuthenticatedTemplate>
                <NavbarTop />
            </AuthenticatedTemplate>

            <Routes>
                <Route path="*" element={isAuthenticated ? <Dashboard /> : <Auth />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="department">
                    <Route path="extractions" element={profileDetailSelector.profileDetail?.department === department.EXTRACTIONS && <DepartmentExperience />} />
                    <Route path="mass-spec" element={profileDetailSelector.profileDetail?.department === department.MASS_SPEC && <DepartmentExperience />} />
                    <Route path="receiving" element={profileDetailSelector.profileDetail?.department === department.RECEIVING && <DepartmentExperience />} />
                    <Route path="rd" element={profileDetailSelector.profileDetail?.department === department.RD && <DepartmentExperience />} />
                    <Route path="screening" element={profileDetailSelector.profileDetail?.department === department.SCREENING && <DepartmentExperience />} />
                    <Route path="shipping" element={profileDetailSelector.profileDetail?.department === department.SHIPPING && <DepartmentExperience />} />
                    <Route path="quality" element={profileDetailSelector.profileDetail?.department === department.QUALITY && <DepartmentExperience />} />
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
            <AuthenticatedTemplate>
                <NavbarBottom />
            </AuthenticatedTemplate>
        </div>
    );
};

export default Layout;
