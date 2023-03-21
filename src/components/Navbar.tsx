import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useState } from 'react';
import AdminMenu from './AdminMenu';
import RestoreIcon from '@mui/icons-material/Restore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import DownloadIcon from '@mui/icons-material/Download';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getSearchValue, selectSearchValue } from '../app/search';
import { getMasterFilterItems } from '../app/master/masterItemSlice';

const Search = styled('div')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch'
        }
    }
}));

export default function Navbar() {
    const dispatch = useAppDispatch();
    const searchValueSelector = useAppSelector(selectSearchValue);
    const { instance } = useMsal();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [profile, setProfile] = useState<{ role: string; department: string }>({
        role: 'admin',
        department: 'extractions'
    });

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

    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getSearchValue(event.target.value));
        if(location.pathname === 'master') {
            dispatch(getMasterFilterItems({page: 1, size: 10}))
        }
        
    };

    return (
        <Box>
            {profile.role === 'admin' && <AdminMenu />}
            {/* <div>{searchValueSelector.searchValue}</div> */}
            <AppBar position="static" elevation={5}>
                <Toolbar variant="dense" sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleChange}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <AuthenticatedTemplate>
                <Button onClick={handleLogout}>Logout</Button>
            </AuthenticatedTemplate>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 100 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}>
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Download" icon={<DownloadIcon />} />
                    <BottomNavigationAction label="Add Item" icon={<AddBoxIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
