import { AppBar, BottomNavigation, BottomNavigationAction, Box, Container, Drawer, Paper, Toolbar } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleBottomToolbarItemClick } from '../app/bottomToolbar/bottomToolbarItems';
import { bottomToolbarButtons, confirmation, drawerToggleType } from '../common/constants';
import { selectDrawerToggleType, toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { selectRequestMasterItemsChecked } from '../app/requestMaster/requestMasterItemsCheckedSlice';
import { IRequestMasterItem } from '../app/requestMaster/requestMasterItemsSlice';
import { useLocation } from 'react-router-dom';
import { selectProfileDetail } from '../app/profileDetail/profileDetailSlice';
import { ChangeEvent } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { getMasterItemsFilteredThunk } from '../app/master/masterItemSlice';
import SendIcon from '@mui/icons-material/Send';
import MenuAdmin from './MenuAdmin';
import PreviewIcon from '@mui/icons-material/Preview';
import { selectRequestMasterItemsPendingChecked } from '../app/requestMaster/requestMasterItemsPendingCheckedSlice';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MasterForm from './UpdateMasterForm';
import AssignItemForm from './AssignItemForm';

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

const NavbarBottom = () => {
    const drawerToggleTypeSelector = useAppSelector(selectDrawerToggleType)
    const profileDetailSelector = useAppSelector(selectProfileDetail);
    const [value, setValue] = useState<number>(0);
    const dispatch = useAppDispatch();
    const requestMasterItemsCheckedSelector = useAppSelector(selectRequestMasterItemsChecked);
    const requestMasterItemsPendingCheckedSelector = useAppSelector(selectRequestMasterItemsPendingChecked);
    const location = useLocation();

    const handleAddClick = () => {
        dispatch(toggleDrawer(drawerToggleType.ADD_MASTER_ITEM_FORM));
    };

    const handleAssignClick = () => {
        dispatch(toggleDrawer(drawerToggleType.ASSIGN_MASTER_ITEM_FORM));
    }

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
        <Paper variant="elevation" elevation={5} sx={{ height: 75 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                {(location.pathname === '/departments/extractions' ||
                    location.pathname === '/departments/mass-spec' ||
                    location.pathname === '/departments/receiving' ||
                    location.pathname === '/departments/rd' ||
                    location.pathname === '/departments/screening' ||
                    location.pathname === '/departments/shipping' ||
                    location.pathname === '/departments/quality') && <BottomNavigationAction label="Download" onClick={handleDownloadClick} icon={<DownloadIcon />} />}
                {(location.pathname === '/general-request/list' || location.pathname === '/office-supply-request/list' || location.pathname === '/store-room-request/list') && (
                    <BottomNavigationAction label="Review" onClick={handleReviewClick} icon={<PreviewIcon />} disabled={requestMasterItemsCheckedSelector.requestMasterItemsChecked.length === 0} />
                )}
                      {(location.pathname === '/general-request/confirmation' || location.pathname === '/office-supply-request/confirmation' || location.pathname === '/store-room-request/confirmation') && (
                    <BottomNavigationAction label="Send" onClick={handleEditClick} icon={<EditIcon />} disabled={requestMasterItemsPendingCheckedSelector.requestMasterItemsPendingChecked.length === 0} />
                )}
                {(location.pathname === '/general-request/confirmation' || location.pathname === '/office-supply-request/confirmation' || location.pathname === '/store-room-request/confirmation') && (
                    <BottomNavigationAction label="Send" onClick={handleEditClick} icon={<SendIcon />} disabled={requestMasterItemsPendingCheckedSelector.requestMasterItemsPendingChecked.length === 0} />
                )}
                {location.pathname === '/master' && (
                    <Box>
                        <BottomNavigationAction label="Edit" onClick={handleAssignClick} icon={<AssignmentIcon />} />
                        <BottomNavigationAction label="Add Item" onClick={handleAddClick} icon={<AddBoxIcon />} />
                    </Box>
                )}
            </BottomNavigation>
            <Drawer anchor='bottom' open={drawerToggleTypeSelector.drawerToggleType === drawerToggleType.UPDATE_MASTER_ITEM_FORM}>
                <MasterForm />
            </Drawer>
            <Drawer anchor='bottom' open={drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FORM}>
                <MasterForm />
            </Drawer>
            <Drawer anchor='right' open={drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ASSIGN_MASTER_ITEM_FORM}>
                <AssignItemForm />
            </Drawer>
        </Paper>
    );
};

export default NavbarBottom;
