import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleBottomToolbarItemClick } from '../app/bottomToolbar/bottomToolbarItems';
import { bottomToolbarButtons, drawerToggleType } from '../common/constants';
import { selectDrawerToggleType, toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { selectRequestMasterItemsChecked } from '../app/requestMaster/requestMasterItemsChecked';
import { IRequestItem, changeRequestItems, selectRequestItems } from '../app/request/requestItemsSlice';

const NavbarBottom = () => {
    const [value, setValue] = useState<number>(0);
    const dispatch = useAppDispatch();
    const requestMasterItemsCheckedSelector = useAppSelector(selectRequestMasterItemsChecked);

    const handleAddClick = () => {
        dispatch(toggleDrawer(drawerToggleType.ADD_MASTER_ITEM_FROM));
    };

    const handleReviewClick = () => {
        let newRequestItems: IRequestItem[] = [];
        requestMasterItemsCheckedSelector.requestMasterItemsChecked.map((item) => {
            const newRequestItem = {
                quantity: 0,
                department: 'EXTRACTIONS',
                user: 'Batsaikhan Ulambayar',
                detail: 'detail',
                custom_text: 'cutom text',
                location: 'store room',
                request_item_id: item.request_item_id,
                master_item_id: item.master_item_id,
                item: item.item
            };
            newRequestItems.push(newRequestItem);
            return newRequestItem;
        });

        dispatch(changeRequestItems(newRequestItems));
        dispatch(toggleDrawer(drawerToggleType.UPDATE_REQUEST_REVIEW_FORM));
    };

    const handleDownloadClick = () => {
        dispatch(handleBottomToolbarItemClick(bottomToolbarButtons.DOWNLOAD));
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
                <BottomNavigationAction label="Download" onClick={handleDownloadClick} icon={<DownloadIcon />} />
                <BottomNavigationAction label="Add Item" onClick={handleAddClick} icon={<AddBoxIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default NavbarBottom;
