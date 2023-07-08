import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDrawerToggleType, toggleDrawer } from '../../app/slice/drawerToggle/drawerToggleTypeSlice';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { changeStoreRoomItem, updateStoreRoomItemThunk } from '../../app/slice/storeRoom/storeRoomUpdateSlice';
import {
    changeStoreRoomMasterItems,
    getStoreRoomMasterItemsThunk,
    selectStoreRoomMasterItems
} from '../../app/slice/storeRoom/storeRoomMasterItemsSlice';

const StoreRoomItemUpdateForm = () => {
    const drawer = useAppSelector(selectDrawerToggleType);
    const storeRoomMasterItemsSelector = useAppSelector(selectStoreRoomMasterItems);
    const { storeRoomItem } = drawer;
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (storeRoomItem) {
            dispatch(updateStoreRoomItemThunk(storeRoomItem))
                .then(() => {
                    dispatch(
                        changeStoreRoomMasterItems(
                            storeRoomMasterItemsSelector.response?.content.map((storeRoomMasterItem) => ({
                                ...storeRoomMasterItem,
                                location:
                                    storeRoomItem.id === storeRoomMasterItem.id
                                        ? storeRoomItem.location
                                        : storeRoomMasterItem.location,
                                quantity:
                                    storeRoomItem.id === storeRoomMasterItem.id
                                        ? storeRoomItem.quantity
                                        : storeRoomMasterItem.quantity,
                                lot_number:
                                    storeRoomItem.id === storeRoomMasterItem.id
                                        ? storeRoomItem.lot_number
                                        : storeRoomMasterItem.lot_number,
                                usage_level:
                                    storeRoomItem.id === storeRoomMasterItem.id
                                        ? storeRoomItem.usage_level
                                        : storeRoomMasterItem.usage_level,
                                minimum_quantity:
                                    storeRoomItem.id === storeRoomMasterItem.id
                                        ? storeRoomItem.minimum_quantity
                                        : storeRoomMasterItem.minimum_quantity,
                                maximum_quantity:
                                    storeRoomItem.id === storeRoomMasterItem.id
                                        ? storeRoomItem.maximum_quantity
                                        : storeRoomMasterItem.maximum_quantity,
                                expiration_date:
                                    storeRoomItem.id === storeRoomMasterItem.id
                                        ? storeRoomItem.expiration_date
                                        : storeRoomMasterItem.expiration_date,
                                received_date:
                                    storeRoomItem.id === storeRoomMasterItem.id
                                        ? storeRoomItem.received_date
                                        : storeRoomMasterItem.received_date
                            }))
                        )
                    );
                    dispatch(toggleDrawer({ type: '' }));
                })
                .catch((error: Error) => console.error(error.message));
        }
    };

    const handleCancel = () => {
        dispatch(toggleDrawer({ type: '' }));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'location' && storeRoomItem) {
            dispatch(toggleDrawer({ ...drawer, storeRoomItem: { ...storeRoomItem, location: event.target.value } }));
        }
        if (event.target.name === 'usage_level' && storeRoomItem) {
            dispatch(toggleDrawer({ ...drawer, storeRoomItem: { ...storeRoomItem, usage_level: event.target.value } }));
        }
        if (event.target.name === 'minimum_quantity' && storeRoomItem) {
            dispatch(
                toggleDrawer({
                    ...drawer,
                    storeRoomItem: { ...storeRoomItem, minimum_quantity: parseInt(event.target.value) }
                })
            );
        }
        if (event.target.name === 'maximum_quantity' && storeRoomItem) {
            dispatch(
                toggleDrawer({
                    ...drawer,
                    storeRoomItem: { ...storeRoomItem, maximum_quantity: parseInt(event.target.value) }
                })
            );
        }
    };

    const handleDateChange = (value: Date | null, columnName: string) => {
        if (columnName === 'expiration_date') {
            dispatch(changeStoreRoomItem({ storeRoomItem: { expiration_date: value } }));
        }
        if (columnName === 'received_date') {
            dispatch(changeStoreRoomItem({ storeRoomItem: { expiration_date: value } }));
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
                        label="LOCATION"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={storeRoomItem?.location}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <TextField
                        sx={{ width: '100%' }}
                        name="usage_level"
                        id="usage_level"
                        label="USAGE LEVEL"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={storeRoomItem?.usage_level}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <TextField
                        sx={{ width: '100%' }}
                        type="number"
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        name="maximum_quantity"
                        InputLabelProps={{ shrink: true }}
                        id="maximum_quantity"
                        label="MAXIMUM QUANTITY"
                        variant="outlined"
                        size="small"
                        value={storeRoomItem?.maximum_quantity}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <TextField
                        sx={{ width: '100%' }}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        type="number"
                        id="minimum_quantity"
                        name="minimum_quantity"
                        InputLabelProps={{ shrink: true }}
                        label="MINIMUM QUANTITY"
                        variant="outlined"
                        size="small"
                        value={storeRoomItem?.minimum_quantity}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            label="Expiration Date"
                            inputFormat="MM/DD/YYYY HH:MM"
                            value={storeRoomItem?.expiration_date}
                            onChange={(value: Date | null) => handleDateChange(value, 'expiration_date')}
                            renderInput={(params) => (
                                <TextField {...params} size="small" sx={{ width: '100%' }} name="expiration_date" />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            label="Received Date"
                            inputFormat="MM/DD/YYYY HH:MM"
                            value={storeRoomItem?.received_date}
                            onChange={(value: Date | null) => handleDateChange(value, 'received_date')}
                            renderInput={(params) => (
                                <TextField {...params} size="small" sx={{ width: '100%' }} name="received_date" />
                            )}
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

export default StoreRoomItemUpdateForm;
