import { Outlet } from 'react-router-dom';
import NavbarBottom from './NavbarBottom';
import { Box } from '@mui/material';
import MenuSub from './MenuSub';
import MenuAdmin from './MenuAdmin';
import MenuDepartment from './MenuDepartment';
import { selectProfileDetail } from '../app/profileDetail/profileDetailSlice';
import { useAppSelector } from '../app/hooks';
import { role } from '../common/constants';

const Layout = () => {
    const profileDetailSelector = useAppSelector(selectProfileDetail);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box>
                {profileDetailSelector.profileDetail?.role === role.ADMINISTRATION ? <MenuAdmin /> : <MenuDepartment />}
                <MenuSub />
            </Box>
            <Box sx={{ padding: 1, flex: 1 }}>
                <Outlet />
            </Box>
            <NavbarBottom />
        </Box>
    );
};

export default Layout;
