import { useLocation } from 'react-router-dom';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useState } from 'react';
import AdminMenu from './MenuAdmin';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getSearchValue, selectSearchValue } from '../app/search';
import MenuSub from './MenuSub';
import { Box } from '@mui/material';
import MenuDepartment from './MenuDepartment';

export default function NavbarTop() {
    const dispatch = useAppDispatch();
    const searchValueSelector = useAppSelector(selectSearchValue);
    const { instance } = useMsal();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [profile, setProfile] = useState<{ role: string; department: string }>({
        role: 'admin',
        department: 'extractions'
    });

    const location = useLocation();

    return (
        <Box>
            {/* {profile.role === 'admin' && <AdminMenu />} */}
            {<MenuDepartment />}
            <AdminMenu />
            <MenuSub/>
        </Box>
    );
}
