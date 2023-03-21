import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { toggleDrawer, setForm } from '../app/master/masterFormDrawerUpdateSlice';
import { useAppDispatch } from '../app/hooks';

const NavbarBottom = () => {
    const [value, setValue] = useState<number>(0);
    const dispatch = useAppDispatch();

    const handleAddClick = () => {
        dispatch(toggleDrawer(true));
        dispatch(setForm('add'));
    };
    
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 100 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Download" icon={<DownloadIcon />} />
                <BottomNavigationAction label="Add Item" icon={<AddBoxIcon />} onClick={handleAddClick} />
            </BottomNavigation>
        </Paper>
    );
};

export default NavbarBottom;

