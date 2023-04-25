import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import Profile from './Profile';

const MenuDepartment = () => {
    const location = useLocation();

    return (
        <AppBar position="static" elevation={5} sx={{ backgroundColor: '#1347a4' }}>
            <Toolbar sx={{ margin: 'auto' }}>
                <Box sx={{ position: 'fixed', left: 20 }}>
                    <img src={logo} alt={'USDTL IMS'} style={{ height: 40 }} />
                </Box>

                <Button
                    sx={{ color: location.pathname === '/departments/extractions' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/extractions' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/departments/extractions"
                    state="extractions">
                    extractions
                </Button>
                <Button
                    sx={{ color: location.pathname === '/departments/mass-spec' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/mass-spec' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/departments/mass-spec"
                    state="mass-spec">
                    mass-spec
                </Button>
                <Button
                    sx={{ color: location.pathname === '/departments/receiving' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/receiving' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/departments/receiving"
                    state="receiving">
                    receiving
                </Button>
                <Button
                    sx={{ color: location.pathname === '/departments/rd' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/rd' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/departments/rd"
                    state="rd">
                    r&d
                </Button>
                <Button
                    sx={{ color: location.pathname === '/departments/screening' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/screening' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/departments/screening"
                    state="screening">
                    screening
                </Button>
                <Button
                    sx={{ color: location.pathname === '/departments/shipping' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/shipping' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/departments/shipping"
                    state="shipping">
                    shipping
                </Button>
                <Button
                    sx={{ color: location.pathname === '/departments/quality' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/quality' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/departments/quality"
                    state="quality">
                    quality
                </Button>
                <Button
                    sx={{ color: location.pathname === '/request/general' ? 'yellow' : '#fff', fontWeight: location.pathname === '/request/general' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/request/general"
                    state="general">
                    general-request
                </Button>
                <Button
                    sx={{ color: location.pathname === '/request/office-supply' ? 'yellow' : '#fff', fontWeight: location.pathname === '/request/office-supply' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/request/office-supply"
                    state="office-supply">
                    office-supply-request
                </Button>
                <Button
                    sx={{ color: location.pathname === '/request/store-room' ? 'yellow' : '#fff', fontWeight: location.pathname === '/request/store-room' ? 'bolder' : 'normal' }}
                    component={Link}
                    to="/request/store-room"
                    state="store-room">
                    store-room-request
                </Button>
                <Box sx={{ position: 'fixed', right: 20 }}>
                    <Profile />
                </Box>
            </Toolbar>
            <Outlet />
        </AppBar>
    );
};

export default MenuDepartment;
