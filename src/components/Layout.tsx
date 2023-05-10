import { Outlet, Route, Routes } from 'react-router-dom';
import Master from '../pages/Master';
import DepartmentExperience from '../pages/DepartmentMaster';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
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
import { Container, Grid } from '@mui/material';

const Layout = () => {
    const isAuthenticated = useIsAuthenticated();
    const profileDetailSelector = useAppSelector(selectProfileDetail);

    return (
        <div style={{display: 'grid', gridTemplateRows: 'auto 1fr auto', border: '2px solid red', height: '100vh'}}>
            <div>
                <NavbarTop/>
            </div>
            <div>
                <Outlet/>
            </div>
            <div>
                <NavbarBottom/>
            </div>
        </div>
        // <Grid container direction="column" justifyContent="space-between" sx={{ border: '2px solid red', height: '100vh' }} alignItems="stretch">
        //     <Grid item sx={{ border: '2px solid green', height: 50 }}></Grid>
        //     <Grid item xl='auto' sx={{ border: '2px solid blue' }} justifySelf='stretch'></Grid>
        //     <Grid item sx={{ border: '2px solid orange', height: 50 }}></Grid>
        // </Grid>
    );
};

export default Layout;
