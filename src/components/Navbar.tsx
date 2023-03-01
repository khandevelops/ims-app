import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useState } from 'react';
import AdminMenu from './AdminMenu';
import DepartmentMenu from './DepartmentMenu';

export default function Navbar() {
    const { instance } = useMsal();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const location = useLocation();

    const handleLogout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: '/auth',
            mainWindowRedirectUri: '/auth' // redirects the top level app after logout
        });
    };

    return (
        <Box>
            <AdminMenu />
            <DepartmentMenu />
            <AuthenticatedTemplate>
                <Button onClick={handleLogout}>Logout</Button>
            </AuthenticatedTemplate>
        </Box>
    );
}
