import { AppBar, Box, Fab, Tab, Tabs, Toolbar } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RequestsComplete from '../components/RequestMakeComplete';
import RequestsPending from '../components/RequestsMakePending';
import RequestsToMake from '../components/RequestsList';
import { changeTab, selectRequestTab } from '../app/common/requestTabSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === 0 && <RequestsToMake />}
            {value === 1 && <RequestsPending />}
            {value === 2 && <RequestsComplete />}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

const Requests = () => {
    const requestTabSelector = useAppSelector(selectRequestTab);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {}, [location.pathname]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(changeTab(newValue));
    };

    return (
        <Box>
            <AppBar position="static" color="secondary">
                <Toolbar variant="dense"></Toolbar>
            </AppBar>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={requestTabSelector.value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="List" {...a11yProps(0)} />
                    <Tab label="Confirmation" {...a11yProps(1)} />
                    <Tab label="Status" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={requestTabSelector.value} index={0}>
                List
            </TabPanel>
            <TabPanel value={requestTabSelector.value} index={1}>
                Confirmation
            </TabPanel>
            <TabPanel value={requestTabSelector.value} index={2}>
                Status
            </TabPanel>
        </Box>
    );
};

export default Requests;
