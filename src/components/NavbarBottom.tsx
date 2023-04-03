import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleBottomToolbarItemClick } from '../app/bottomToolbar/bottomToolbarItems';
import { bottomToolbarButtons, confirmation, drawerToggleType } from '../common/constants';
import { toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { selectRequestMasterItemsChecked } from '../app/requestMaster/requestMasterItemsCheckedSlice';
import EditIcon from '@mui/icons-material/Edit';
import { IRequestMasterItem } from '../app/requestMaster/requestMasterItemsSlice';

const NavbarBottom = () => {
    const [value, setValue] = useState<number>(0);
    const dispatch = useAppDispatch();
    const requestMasterItemsCheckedSelector = useAppSelector(selectRequestMasterItemsChecked);

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

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 100 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction
                    label="Review"
                    onClick={handleReviewClick}
                    icon={<RestoreIcon />}
                    disabled={requestMasterItemsCheckedSelector.requestMasterItemsChecked.length === 0}
                />
                <BottomNavigationAction label="Edit" onClick={handleEditClick} icon={<EditIcon />} />
                <BottomNavigationAction label="Download" onClick={handleDownloadClick} icon={<DownloadIcon />} />
                <BottomNavigationAction label="Add Item" onClick={handleAddClick} icon={<AddBoxIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default NavbarBottom;
