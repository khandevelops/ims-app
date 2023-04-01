import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import logo from '../images/logo.png';
import Profile from './Profile';

const MenuDepartment = () => {
    return (
        <AppBar position="static" elevation={5} sx={{ backgroundColor: '#1347a4' }}>
            <Toolbar sx={{ margin: 'auto' }}>
                <Box sx={{ position: 'fixed', left: 20 }}>
                    <img src={logo} alt={'USDTL IMS'} style={{ height: 40 }} />
                </Box>

                <Button sx={{ color: '#fff' }} component={Link} to="department-master/extractions" state="extractions">
                    extractions
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/mass-spec" state="mass-spec">
                    mass-spec
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/receiving" state="receiving">
                    receiving
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/rd" state="rd">
                    r&d
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/screening" state="screening">
                    screening
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/shipping" state="shipping">
                    shipping
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/quality" state="quality">
                    quality
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/general" state="general">
                    general-request
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/office-supply" state="office-supply">
                    office-supply-request
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/store-room/" state="store-room">
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
