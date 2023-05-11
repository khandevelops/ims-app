import { Box, Step, StepButton, StepLabel, Stepper, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { changeTab, selectRequestTab } from '../app/common/requestTabSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import RequestMasterDepartmentPending from '../components/RequestMasterDepartmentPending';
import RequestMasterDepartmentComplete from '../components/RequestMasterDepartmentComplete';
import RequestMasterDepartmentItems from '../components/RequestMasterDepartmentItems';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {}, [location.pathname]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(changeTab(newValue));
    };

    const isStepFailed = (step: number) => {
        return step === 1;
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
      };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Stepper activeStep={2} sx={{ marginBottom: 4 }}>
                <Step>
                    <StepButton icon={<DoneOutlineIcon/>} onClick={handleStep(0)} component={Link} to={`/${location.state}-request/list`} state={location.state}>List</StepButton>
                </Step>
                <Step>
                    <StepButton onClick={handleStep(1)} component={Link} to={`/${location.state}-request/confirmation`} state={location.state}>Confirmation</StepButton>
                </Step>
                <Step>
                    <StepButton onClick={handleStep(2)} component={Link} to={`/${location.state}-request/status`} state={location.state}>Status</StepButton>
                </Step>
                {/* {steps.map((label, index) => {
                    const labelProps: {
                        optional?: React.ReactNode;
                        error?: boolean;
                    } = {};
                    if (isStepFailed(index)) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Alert message
                            </Typography>
                        );
                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepButton {...labelProps} component={Link} to='/general-request/list' state="general">
                                {label}
                            </StepButton>
                        </Step>
                    );
                })} */}
            </Stepper>
            <Outlet />
        </Box>
        // <Box sx={{ padding: 2 }}>
        //     <Box sx={{ borderBottom: 2, borderColor: 'divider', marginBottom: 2 }}>
        //         <Tabs value={requestTabSelector.value} onChange={handleChange}>
        //             <Tab label="List" {...a11yProps(0)} component={Link} to='/general-request/list' state="general"/>
        //             <Tab label="Confirmation" {...a11yProps(1)} component={Link} to='/general-request/confirmation' state="office-supply"/>
        //             <Tab label="Status" {...a11yProps(2)} component={Link} to='/general-request/status' state="store-room"/>
        //         </Tabs>
        //     </Box>
        //     <Outlet/>
        // </Box>
    );
};

export default RequestMasterDepartment;
