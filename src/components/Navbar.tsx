import { AppBar, BottomNavigation, BottomNavigationAction, Box, Container, Paper, Toolbar } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleBottomToolbarItemClick } from '../app/bottomToolbar/bottomToolbarItems';
import { bottomToolbarButtons, confirmation, drawerToggleType, role } from '../common/constants';
import { toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { selectRequestMasterItemsChecked } from '../app/requestMaster/requestMasterItemsCheckedSlice';
import EditIcon from '@mui/icons-material/Edit';
import { IRequestMasterItem } from '../app/requestMaster/requestMasterItemsSlice';
import { useLocation } from 'react-router-dom';
import { selectProfileDetail } from '../app/profileDetail/profileDetailSlice';
import { ChangeEvent } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { getMasterItemsFilteredThunk } from '../app/master/masterItemSlice';
import MenuAdmin from './MenuAdmin';
import MenuDepartment from './MenuDepartment';

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
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch'
        }
    }
}));

const Navbar = () => {
    const profileDetailSelector = useAppSelector(selectProfileDetail);
    const [value, setValue] = useState<number>(0);
    const dispatch = useAppDispatch();
    const requestMasterItemsCheckedSelector = useAppSelector(selectRequestMasterItemsChecked);
    const location = useLocation();

    const handleAddClick = () => {
        dispatch(toggleDrawer(drawerToggleType.ADD_MASTER_ITEM_FROM));
    };

    const handleReviewClick = () => {
        dispatch(toggleDrawer(drawerToggleType.UPDATE_REQUEST_REVIEW_FORM));
    };

    const handleDownloadClick = () => {
        dispatch(handleBottomToolbarItemClick(bottomToolbarButtons.DOWNLOAD));
    };

    const handleEditClick = () => {
        dispatch(toggleDrawer(drawerToggleType.UPDATE_REQUEST_EDIT_FORM));
    };

    const handlekeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(getMasterItemsFilteredThunk({ page: 0, keyword: event.target.value }));
    };

    return (
        <Container>
            <Box>
                <div>{profileDetailSelector.profileDetail?.role}</div>
                {profileDetailSelector.profileDetail?.role === role.ADMINISTRATION ? <MenuAdmin /> : <MenuDepartment />}
            </Box>
            <AppBar position="static" elevation={5} sx={{ alignItems: 'center', backgroundColor: '#1347a4' }}>
                <Toolbar variant="dense">
                    <Search onChange={handlekeywordChange}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                </Toolbar>
            </AppBar>
            <Paper>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}>
                    {/* <BottomNavigationAction label="Review" onClick={handleReviewClick} icon={<RestoreIcon />} disabled={requestMasterItemsCheckedSelector.requestMasterItemsChecked.length === 0} /> */}
                    {(location.pathname === '/departments/extractions' ||
                        location.pathname === '/departments/mass-spec' ||
                        location.pathname === '/departments/receiving' ||
                        location.pathname === '/departments/rd' ||
                        location.pathname === '/departments/screening' ||
                        location.pathname === '/departments/shipping' ||
                        location.pathname === '/departments/quality') && <BottomNavigationAction label="Download" onClick={handleDownloadClick} icon={<DownloadIcon />} />}
                    {/* <BottomNavigationAction label="Edit" onClick={handleEditClick} icon={<EditIcon />} />

                <BottomNavigationAction label="Add Item" onClick={handleAddClick} icon={<AddBoxIcon />} /> */}
                </BottomNavigation>
            </Paper>
        </Container>
    );
};

export default Navbar;
