import { BottomNavigation, BottomNavigationAction, Box, Button, Drawer, Paper } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DownloadIcon from '@mui/icons-material/Download';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleBottomToolbarItemClick } from '../app/bottomToolbar/bottomToolbarItems';
import { bottomToolbarButtons, drawerToggleType, role } from '../common/constants';
import { selectDrawerToggleType, toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { selectRequestMasterItemsChecked } from '../app/requestMaster/requestMasterItemsCheckedSlice';
import { Link, useLocation } from 'react-router-dom';
import { selectProfileDetail } from '../app/profileDetail/profileDetailSlice';
import { ChangeEvent } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { getMasterItemsFilteredThunk } from '../app/master/masterItemSlice';
import SendIcon from '@mui/icons-material/Send';
import PreviewIcon from '@mui/icons-material/Preview';
import { selectRequestMasterItemsPendingChecked } from '../app/requestMaster/requestMasterItemsPendingCheckedSlice';
import EditIcon from '@mui/icons-material/Edit';
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
    const drawerToggleTypeSelector = useAppSelector(selectDrawerToggleType);
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
        <Paper variant="elevation" elevation={5} sx={{ height: 80 }}>
            <BottomNavigation
                sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                {profileDetailSelector.profileDetail?.role === role.ADMINISTRATION && (
                    <Fragment>
                        <Box sx={{ width: 10 }}></Box>
                        <Box sx={{ paddingTop: 1 }}>
                            <Button component={Link} to="admin/departments/extractions" state="extractions">
                                extractions
                            </Button>
                            <Button component={Link} to="admin/departments/mass-spec" state="mass-spec">
                                mass-spec
                            </Button>
                            <Button component={Link} to="admin/departments/receiving/" state="receiving">
                                receiving
                            </Button>
                            <Button component={Link} to="admin/departments/rd" state="rd">
                                r&d
                            </Button>
                            <Button component={Link} to="admin/departments/screening" state="screening">
                                screening
                            </Button>
                            <Button component={Link} to="admin/departments/shipping" state="shipping">
                                shipping
                            </Button>
                            <Button component={Link} to="admin/departments/quality" state="quality">
                                quality
                            </Button>
                            <Button component={Link} to="admin/departments/store-room" state="store-room">
                                store-room
                            </Button>
                        </Box>
                    </Fragment>
                )}

                <Box sx={{ width: 10 }}>
                    {(location.pathname === '/departments/extractions' ||
                        location.pathname === '/departments/mass-spec' ||
                        location.pathname === '/departments/receiving' ||
                        location.pathname === '/departments/rd' ||
                        location.pathname === '/departments/screening' ||
                        location.pathname === '/departments/shipping' ||
                        location.pathname === '/departments/quality') && <BottomNavigationAction label="Download" onClick={handleDownloadClick} icon={<DownloadIcon  color="primary" sx={{fontSize: 40}}/>} />}
                    {(location.pathname === '/general-request/list' || location.pathname === '/office-supply-request/list' || location.pathname === '/store-room-request/list') && (
                        <BottomNavigationAction label="Review" onClick={handleReviewClick} icon={<PreviewIcon  color="primary" sx={{fontSize: 40}}/>} disabled={requestMasterItemsCheckedSelector.requestMasterItemsChecked.length === 0} />
                    )}
                    {(location.pathname === '/general-request/confirmation' ||
                        location.pathname === '/office-supply-request/confirmation' ||
                        location.pathname === '/store-room-request/confirmation') && (
                        <BottomNavigationAction
                            label="Send"
                            onClick={handleEditClick}
                            icon={<EditIcon  color="primary" sx={{fontSize: 40}}/>}
                            disabled={requestMasterItemsPendingCheckedSelector.requestMasterItemsPendingChecked.length === 0}
                        />
                    )}
                    {(location.pathname === '/general-request/confirmation' ||
                        location.pathname === '/office-supply-request/confirmation' ||
                        location.pathname === '/store-room-request/confirmation') && (
                        <BottomNavigationAction
                            label="Send"
                            onClick={handleEditClick}
                            icon={<SendIcon />}
                            disabled={requestMasterItemsPendingCheckedSelector.requestMasterItemsPendingChecked.length === 0}
                        />
                    )}
                    {location.pathname === '/master' && <BottomNavigationAction label="Add Item" onClick={handleAddClick} icon={<AddBoxIcon color="primary" sx={{fontSize: 40}}/>} />}
                </Box>
            </BottomNavigation>
            <Drawer anchor="bottom" open={drawerToggleTypeSelector.drawerToggleType === drawerToggleType.UPDATE_MASTER_ITEM_FORM}>
                <MasterForm />
            </Drawer>
            <Drawer anchor="bottom" open={drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FORM}>
                <MasterForm />
            </Drawer>
            <Drawer anchor="right" open={drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ASSIGN_MASTER_ITEM_FORM}>
                <AssignItemForm />
            </Drawer>
        </Paper>
    );
};

export default NavbarBottom;
