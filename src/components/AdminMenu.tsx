import { AppBar, Button, Toolbar } from '@mui/material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense" sx={{ margin: 'auto' }}>
                <Button sx={{ color: '#fff' }} component={Link} to="master">
                    master
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/extractions">
                    extractions
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/mass-spec">
                    mass-spec
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/receiving">
                    receiving
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/rd">
                    r&d
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/screening">
                    screening
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/shipping">
                    shipping
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/quality">
                    quality
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/list/general">
                    general-request
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/list/office-supply">
                    office-supply-request
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/list/store-room">
                    store-room-request
                </Button>
            </Toolbar>
            <Outlet />
        </AppBar>
    );
};

export default AdminMenu;
