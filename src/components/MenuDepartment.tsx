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
                    <Typography variant="subtitle2">extractions</Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/mass-spec" state="mass-spec">
                    <Typography variant="subtitle2">mass-spec</Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/receiving" state="receiving">
                    <Typography variant="subtitle2">receiving</Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/rd" state="rd">
                    <Typography variant="subtitle2">r&d</Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/screening" state="screening">
                    <Typography variant="subtitle2">screening</Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/shipping" state="shipping">
                    <Typography variant="subtitle2">shipping</Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/quality" state="quality">
                    <Typography variant="subtitle2">quality</Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/general" state="general">
                    <Typography variant="subtitle2">general-request</Typography>
                </Button>
                <Button
                    sx={{ color: '#fff' }}
                    component={Link}
                    to="/request/office-supply"
                    state="office-supply">
                    <Typography variant="subtitle2">office-supply-request</Typography>
                </Button>
                <Button
                    sx={{ color: '#fff' }}
                    component={Link}
                    to="/request/store-room/"
                    state="store-room">
                    <Typography variant="subtitle2">store-room-request</Typography>
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
