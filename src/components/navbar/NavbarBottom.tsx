import { BottomNavigation, BottomNavigationAction, Box, Button, Drawer, Paper } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DownloadIcon from '@mui/icons-material/Download';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleBottomToolbarItemClick } from '../../app/bottomToolbar/bottomToolbarItems';
import { BOTTOM_TOOLBAR_BUTTONS, DRAWER_TOGGLE_TYPE, ROLE } from '../../common/constants';
import { selectDrawerToggleType, toggleDrawer } from '../../app/slice/drawerToggle/drawerToggleTypeSlice';
import { selectRequestMasterItemsChecked } from '../../app/requestMaster/requestMasterItemsCheckedSlice';
import { Link, useLocation } from 'react-router-dom';
import { selectProfileDetail } from '../../app/profileDetail/profileDetailSlice';
import { ChangeEvent } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { getMasterItemsFilteredThunk } from '../../app/slice/master/masterItemSlice';
import SendIcon from '@mui/icons-material/Send';
import PreviewIcon from '@mui/icons-material/Preview';
import { selectRequestMasterItemsPendingChecked } from '../../app/requestMaster/requestMasterItemsPendingCheckedSlice';
import EditIcon from '@mui/icons-material/Edit';
import MasterForm from '../forms/UpdateMasterForm';
import AssignItemForm from '../AssignItemForm';
import { downloadDepartmentMasterItemsThunk } from '../../app/download/downloadDepartmentMasterItemsSlice';
import axios from 'axios';
import FileSaver from 'file-saver';

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
    const DRAWER_TOGGLE_TYPESelector = useAppSelector(selectDrawerToggleType);
    const profileDetailSelector = useAppSelector(selectProfileDetail);
    const [value, setValue] = useState<number>(0);
    const dispatch = useAppDispatch();
    const requestMasterItemsCheckedSelector = useAppSelector(selectRequestMasterItemsChecked);
    const requestMasterItemsPendingCheckedSelector = useAppSelector(selectRequestMasterItemsPendingChecked);
    const location = useLocation();
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleAddClick = () => {
        dispatch(toggleDrawer({ type: DRAWER_TOGGLE_TYPE.ADD_MASTER_ITEM }));
    };

    const handleAssignClick = () => {
        dispatch(toggleDrawer({ type: DRAWER_TOGGLE_TYPE.ASSIGN_MASTER_ITEM }));
    };

    const handleReviewClick = () => {
        dispatch(toggleDrawer({ type: DRAWER_TOGGLE_TYPE.UPDATE_REQUEST_REVIEW }));
    };

    const handleDownloadClick = () => {
        return axios.get(`${baseUrl}/download/${location.state}/list`).then((response) => {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, `${location.state}.xlsx`);
        });
    };

    const handleEditClick = () => {
        dispatch(toggleDrawer({ type: DRAWER_TOGGLE_TYPE.UPDATE_REQUEST_EDIT }));
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
                <Box sx={{ width: 10 }}>
                    {(location.pathname === '/departments/extractions' ||
                        location.pathname === '/departments/mass-spec' ||
                        location.pathname === '/departments/specimen-processing' ||
                        location.pathname === '/departments/rd' ||
                        location.pathname === '/departments/screening' ||
                        location.pathname === '/departments/shipping' ||
                        location.pathname === '/departments/quality') && (
                        <BottomNavigationAction label="Download" onClick={handleDownloadClick} icon={<DownloadIcon color="primary" sx={{ fontSize: 40 }} />} />
                    )}
                    {(location.pathname === '/general-request/list' || location.pathname === '/office-supply-request/list' || location.pathname === '/store-room-request/list') && (
                        <BottomNavigationAction
                            label="Review"
                            onClick={handleReviewClick}
                            icon={<PreviewIcon color="primary" sx={{ fontSize: 40 }} />}
                            disabled={requestMasterItemsCheckedSelector.requestMasterItemsChecked.length === 0}
                        />
                    )}
                    {(location.pathname === '/general-request/confirmation' ||
                        location.pathname === '/office-supply-request/confirmation' ||
                        location.pathname === '/store-room-request/confirmation') && (
                        <BottomNavigationAction
                            label="Send"
                            onClick={handleEditClick}
                            icon={<EditIcon color="primary" sx={{ fontSize: 40 }} />}
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
                    {location.pathname === '/master' && <BottomNavigationAction label="Add Item" onClick={handleAddClick} icon={<AddBoxIcon color="primary" sx={{ fontSize: 40 }} />} />}
                </Box>
            </BottomNavigation>
        </Paper>
    );
};

export default NavbarBottom;
