import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import Profile from './Profile';
import { selectProfileDetail } from '../app/profileDetail/profileDetailSlice';
import { department } from '../common/constants';
import { useAppSelector } from '../app/hooks';
import { useEffect } from 'react';

const MenuDepartment = () => {
    const location = useLocation();
    const profileDetailSelector = useAppSelector(selectProfileDetail);

    return (
        <AppBar position="static" elevation={5} sx={{ backgroundColor: '#1347a4' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <img src={logo} alt={'USDTL IMS'} style={{ height: 40 }} />
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    {profileDetailSelector.profileDetail?.department === department.EXTRACTIONS && (
                        <Button
                            sx={{ color: location.pathname === '/departments/extractions' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/extractions' ? 'bolder' : 'normal' }}
                            component={Link}
                            to="/departments/extractions"
                            state="extractions">
                            extractions
                        </Button>
                    )}
                    {profileDetailSelector.profileDetail?.department === department.MASS_SPEC && (
                        <Button
                            sx={{ color: location.pathname === '/departments/mass-spec' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/mass-spec' ? 'bolder' : 'normal' }}
                            component={Link}
                            to="/departments/mass-spec"
                            state="mass-spec">
                            mass-spec
                        </Button>
                    )}
                    {profileDetailSelector.profileDetail?.department === department.SPECIMEN_PROCESSING && (
                        <Button
                            sx={{
                                color: location.pathname === '/departments/specimen-processing' ? 'yellow' : '#fff',
                                fontWeight: location.pathname === '/departments/specimen-processing' ? 'bolder' : 'normal'
                            }}
                            component={Link}
                            to="/departments/specimen-processing"
                            state="specimen-processing">
                            Specimen Processing
                        </Button>
                    )}
                    {profileDetailSelector.profileDetail?.department === department.RD && (
                        <Button
                            sx={{ color: location.pathname === '/departments/rd' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/rd' ? 'bolder' : 'normal' }}
                            component={Link}
                            to="/departments/rd"
                            state="rd">
                            r&d
                        </Button>
                    )}
                    {profileDetailSelector.profileDetail?.department === department.SCREENING && (
                        <Button
                            sx={{ color: location.pathname === '/departments/screening' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/screening' ? 'bolder' : 'normal' }}
                            component={Link}
                            to="/departments/screening"
                            state="screening">
                            screening
                        </Button>
                    )}
                    {profileDetailSelector.profileDetail?.department === department.SHIPPING && (
                        <Button
                            sx={{ color: location.pathname === '/departments/shipping' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/shipping' ? 'bolder' : 'normal' }}
                            component={Link}
                            to="/departments/shipping"
                            state="shipping">
                            shipping
                        </Button>
                    )}
                    {profileDetailSelector.profileDetail?.department === department.SHIPPING && (
                        <Button
                            sx={{
                                color: location.pathname === '/departments/qc-internal-standards' ? 'yellow' : '#fff',
                                fontWeight: location.pathname === '/departments/qc-internal-standards' ? 'bolder' : 'normal'
                            }}
                            component={Link}
                            to="/departments/qc-internal-standards"
                            state="qc-internal-standards">
                            qc internal standards
                        </Button>
                    )}
                    {profileDetailSelector.profileDetail?.department === department.QUALITY && (
                        <Button
                            sx={{ color: location.pathname === '/departments/quality' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/quality' ? 'bolder' : 'normal' }}
                            component={Link}
                            to="/departments/quality"
                            state="quality">
                            quality
                        </Button>
                    )}
                    {profileDetailSelector.profileDetail?.department === department.SHIPPING && (
                        <Button
                            sx={{ color: location.pathname === '/departments/shipping' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/shipping' ? 'bolder' : 'normal' }}
                            component={Link}
                            to="/departments/shipping"
                            state="shipping">
                            shipping
                        </Button>
                    )}
                    <Button
                        sx={{ color: location.pathname === '/departments/request/general' ? 'yellow' : '#fff', fontWeight: location.pathname === '/departments/request/general' ? 'bolder' : 'normal' }}
                        component={Link}
                        to="/departments/general-request/list"
                        state="general">
                        general request
                    </Button>
                    <Button
                        sx={{
                            color: location.pathname === '/departments/request/office-supply' ? 'yellow' : '#fff',
                            fontWeight: location.pathname === '/departments/request/office-supply' ? 'bolder' : 'normal'
                        }}
                        component={Link}
                        to="/departments/office-supply-request/list"
                        state="office-supply">
                        office supply request
                    </Button>
                    <Button
                        sx={{
                            color: location.pathname === '/departments/request/store-room' ? 'yellow' : '#fff',
                            fontWeight: location.pathname === '/departments/request/store-room' ? 'bolder' : 'normal'
                        }}
                        component={Link}
                        to="/departments/store-room-request/list"
                        state="store-room">
                        store room request
                    </Button>
                </Box>

                <Box>
                    <Profile />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MenuDepartment;
