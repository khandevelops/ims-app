import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { loginRequest } from '../config/authConfig';
import { callMeMsGraph } from '../config/graph';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProfile, selectProfile } from '../app/profileSlice';
import { Avatar } from '@mui/material';

const Profile = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { instance, accounts } = useMsal();
    const dispatch = useAppDispatch();
    const profileSelector = useAppSelector(selectProfile);

    useEffect(() => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance
            .acquireTokenSilent(request)
            .then((response) => {
                callMeMsGraph(response.accessToken).then((response) => dispatch(getProfile(response)));
            })
            .catch((e) => {
                instance.acquireTokenPopup(request).then((response) => {
                    callMeMsGraph(response.accessToken).then((error) => console.error(error));
                });
            });
    }, [accounts, dispatch, instance]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        const currentAccount = instance.getAccountByHomeId(accounts[0].homeAccountId);
        // The account's ID Token must contain the login_hint optional claim to avoid the account picker
        await instance.logoutRedirect({ account: currentAccount });
        setAnchorElUser(null);
    };

    const stringAvatar = (name: string) => {
        if (name) {
            return {
                sx: {
                    bgcolor: 'white',
                    color: 'black',
                    fontSize: 15,
                    width: 30,
                    height: 30
                },
                children: name !== '' ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : ''
            };
        }
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Avatar {...stringAvatar(profileSelector.profile ? profileSelector.profile.displayName : '')} onClick={handleOpenUserMenu} color="inherit" />
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                <MenuItem key="name">
                    <Typography textAlign="center">{profileSelector && profileSelector.profile && profileSelector.profile.displayName}</Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Profile;
