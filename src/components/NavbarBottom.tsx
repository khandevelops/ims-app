import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleBottomToolbarItemClick } from '../app/bottomToolbar/bottomToolbarItems';
import { bottomToolbarButtons, drawerToggleType } from '../common/constants';
import { selectDrawerToggleType, toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';

const NavbarBottom = () => {
    const [value, setValue] = useState<number>(0);
    const dispatch = useAppDispatch();
    const drawerToggleTypeSelector = useAppSelector(selectDrawerToggleType)

    const handleAddClick = () => {
        dispatch(toggleDrawer(drawerToggleType.ADD_MASTER_ITEM_FROM));
    };

    const handleReviewClick = () => {
        dispatch(toggleDrawer(drawerToggleType.UPDATE_REQUEST_REVIEW_FORM))


              // const checkedItems = requestMasterItemsSelector.response.content
        //     .filter((item) => item.checked === true)
        //     .map((item) => ({
        //         id: 0,
        //         order_quantity: 0,
        //         department: 'EXTRACTIONS',
        //         location: 'store-room',
        //         status: 'PENDING',
        //         time_requested: new Date(),
        //         time_updated: null,
        //         confirmation: 'WAITING',
        //         user: 'Batsaikhan Ulambayar',
        //         comment: 'this is a test comment',
        //         custom_text: 'this is a test custom text',
        //         masterItem: item.masterItem,
        //         checked: item.checked
        //     }));
        // if (checkedItems.length > 0) {
        //     dispatch(createRequestMakeItemsThunk({ pathName: location.pathname, requestItems: checkedItems }));
        //     dispatch(changeTab(1));
        // }
    }

    const handleDownloadClick = () => {
        dispatch(handleBottomToolbarItemClick(bottomToolbarButtons.DOWNLOAD))
    }
    
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 100 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction label="Review" onClick={handleReviewClick} icon={<RestoreIcon />} />
                <BottomNavigationAction label="Download" onClick={handleDownloadClick} icon={<DownloadIcon />} />
                <BottomNavigationAction label="Add Item" onClick={handleAddClick} icon={<AddBoxIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default NavbarBottom;

