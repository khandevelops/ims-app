import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { changeTab, selectRequestTab } from '../app/common/requestTabSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import RequestMasterDepartmentPending from '../components/RequestMasterDepartmentPending';
import RequestMasterDepartmentComplete from '../components/RequestMasterDepartmentComplete';
import RequestMasterDepartmentItems from '../components/RequestMasterDepartmentItems';

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
            {value === 0 && <RequestMasterDepartmentItems />}
            {value === 1 && <RequestMasterDepartmentPending />}
            {value === 2 && <RequestMasterDepartmentComplete />}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

const RequestMasterDepartment = () => {
    const requestTabSelector = useAppSelector(selectRequestTab);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {}, [location.pathname]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(changeTab(newValue));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider', marginBottom: 2 }}>
                <Tabs value={requestTabSelector.value} onChange={handleChange}>
                    <Tab label="List" {...a11yProps(0)} component={Link} to='/request/general/list' />
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

export default RequestMasterDepartment;
