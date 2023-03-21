import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';

const NavbarBottom = () => {
    const [value, setValue] = useState<number>(0);
    
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
                <BottomNavigationAction label="Add Item" icon={<AddBoxIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default NavbarBottom;
