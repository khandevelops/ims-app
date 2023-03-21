import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const DepartmentMenu = () => {
    return (
        <AppBar position="static">
            <Toolbar>
            <Button sx={{ color: '#fff' }} component={Link} to="master">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        master
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/extractions">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        extractions
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/mass-spec">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        mass-spec
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/receiving">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        receiving
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/rd">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        r&d
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/screening">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        screening
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/shipping">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        shipping
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="department-master/quality">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        quality
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/make/general">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        general-request
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/make/office-supply">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        office-supply-request
                    </Typography>
                </Button>
                <Button sx={{ color: '#fff' }} component={Link} to="/request/make/store-room">
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        store-room-request
                    </Typography>
                </Button>
            </Toolbar>
            <Outlet />
        </AppBar>
    );
};

export default DepartmentMenu;
