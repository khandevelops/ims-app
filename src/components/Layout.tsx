import { Outlet } from 'react-router-dom';
import NavbarBottom from './NavbarBottom';
import { Box, Drawer } from '@mui/material';
import MenuSub from './MenuSub';
import MenuAdmin from './MenuAdmin';
import MenuDepartment from './MenuDepartment';
import { selectProfileDetail } from '../app/profileDetail/profileDetailSlice';
import { useAppSelector } from '../app/hooks';
import { drawerToggleType, role } from '../common/constants';
import { selectDrawerToggleType } from '../app/drawerToggle/drawerToggleTypeSlice';
import MasterForm from './UpdateMasterForm';
import AssignItemForm from './AssignItemForm';
import UpdateItemForm from './department/UpdateItemForm';

const Layout = () => {
    const profileDetailSelector = useAppSelector(selectProfileDetail);
    const drawerToggleTypeSelector = useAppSelector(selectDrawerToggleType);

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
            <Drawer anchor="bottom" open={drawerToggleTypeSelector.type === drawerToggleType.UPDATE_MASTER_ITEM_FORM}>
                <MasterForm />
            </Drawer>
            <Drawer anchor="bottom" open={drawerToggleTypeSelector.type === drawerToggleType.ADD_MASTER_ITEM_FORM}>
                <MasterForm />
            </Drawer>
            <Drawer anchor="right" open={drawerToggleTypeSelector.type === drawerToggleType.ASSIGN_MASTER_ITEM_FORM}>
                <AssignItemForm />
            </Drawer>
            <Drawer anchor="bottom" open={drawerToggleTypeSelector.type === drawerToggleType.UPDATE_DEPARTMENT_ITEM_FORM}>
                <UpdateItemForm />
            </Drawer>
        </Box>
    );
};

export default Layout;
