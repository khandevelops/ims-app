import { Box, Button, Grid, TextField } from '@mui/material';
import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDrawerToggleType, toggleDrawer } from '../../app/slice/drawerToggle/drawerToggleTypeSlice';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { changeDepartmentItem } from '../../app/slice/department/departmentItemUpdateSlice';

const UpdateItemForm = () => {
    const { departmentItem } = useAppSelector(selectDrawerToggleType);
    const dispatch = useAppDispatch();

    useEffect(() => {}, []);

    const handleSubmit = () => {
        dispatch(toggleDrawer({ type: '' }));
    };

    const handleCancel = () => {
        dispatch(toggleDrawer({ type: '' }));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'location') {
            dispatch(changeDepartmentItem({ departmentItem: { location: event.target.value } }));
        }
        if (event.target.name === 'usage_level') {
            dispatch(changeDepartmentItem({ departmentItem: { usage_level: event.target.value } }));
        }
        if (event.target.name === 'minimum_quantity') {
            dispatch(changeDepartmentItem({ departmentItem: { minimum_quantity: event.target.value } }));
        }
        if (event.target.name === 'maximum_quantity') {
            dispatch(changeDepartmentItem({ departmentItem: { maximum_quantity: event.target.value } }));
        }
    };

    const handleDateChange = (value: Date | null, columnName: string) => {
        if (columnName === 'expiration_date') {
            dispatch(changeDepartmentItem({ departmentItem: { expiration_date: value } }));
        }
        if (columnName === 'received_date') {
            dispatch(changeDepartmentItem({ departmentItem: { expiration_date: value } }));
        }
    };

    return (
        <Box sx={{ padding: 5 }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <TextField
                        sx={{ width: '100%' }}
                        name="location"
                        id="location"
                        label="LOCAITON"
                        variant="outlined"
                        size="small"
                        value={departmentItem?.location}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <TextField
                        sx={{ width: '100%' }}
                        name="usage_level"
                        id="usage_level"
                        label="USAGE LEVEL"
                        variant="outlined"
                        size="small"
                        value={departmentItem?.usage_level}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <TextField
                        sx={{ width: '100%' }}
                        name="maximum_quantity"
                        id="maximum_quantity"
                        label="MAXIMUM QUANTITY"
                        variant="outlined"
                        size="small"
                        value={departmentItem?.maximum_quantity}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <TextField sx={{ width: '100%' }} id="minimum_quantity" label="MINIMUM QAUNTITY" variant="outlined" size="small" value={departmentItem?.minimum_quantity} onChange={handleChange} />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            label="Expiration Date"
                            inputFormat="MM/DD/YYYY HH:MM"
                            value={departmentItem?.expiration_date}
                            onChange={(value: Date | null) => handleDateChange(value, 'expiration_date')}
                            renderInput={(params) => <TextField {...params} size="small" sx={{ width: '100%' }} />}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            label="Received Date"
                            inputFormat="MM/DD/YYYY HH:MM"
                            value={departmentItem?.received_date}
                            onChange={(value: Date | null) => handleDateChange(value, 'received_date')}
                            renderInput={(params) => <TextField {...params} size="small" sx={{ width: '100%' }} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>

            <Grid container gap={5} sx={{ paddingTop: 10 }} justifyContent="center">
                <Grid item>
                    <Button variant="outlined" onClick={handleSubmit} sx={{ width: 200 }}>
                        UPDATE
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ width: 200 }}>
                        CANCEL
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UpdateItemForm;
