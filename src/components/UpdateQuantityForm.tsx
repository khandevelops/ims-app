import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import { ChangeEvent, FocusEvent, useRef } from 'react';
import { toggleDrawer } from '../app/master/quantityFormDrawerSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { updateQuantityThunk } from '../app/departmentMaster/updateQuantitySlice';
import {
    changeDepartmentExperienceItems,
    selectDepartmentMasterItems
} from '../app/departmentMaster/departmentMasterSlice';
import {
    changeMasterDepartmentItem,
    IMasterDepartmentItem,
    selectMasterDepartmentItem
} from '../app/masterDepartment/masterDepartmentSlice';
import { IDepartmentItem } from '../app/department/departmentItemsSlice';
import { useLocation } from 'react-router-dom';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'location', headerName: 'Location' },
    { field: 'quantity', headerName: 'Qty' },
    { field: 'usage_level', headerName: 'Usage Level' },
    { field: 'min_quantity', headerName: 'Min Qty' },
    { field: 'max_quantity', headerName: 'Max Qty' },
    { field: 'lot_number', headerName: 'Lot Number' },
    { field: 'expiration_date', headerName: 'Expiration Date' },
    { field: 'received_date', headerName: 'Received Date' }
];

const UpdateQuantityForm = () => {
    const masterDepartmentItemSelector = useAppSelector(selectMasterDepartmentItem);
    const departmentItemsSelector = useAppSelector(selectDepartmentMasterItems);
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    const handleClose = () => {
        dispatch(toggleDrawer(false));
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (location.pathname === '/department-master/extractions') {
            dispatch(
                changeMasterDepartmentItem({
                    ...masterDepartmentItemSelector.response,
                    extractionsItems: masterDepartmentItemSelector.response?.extractionsItems.map((item) => ({
                        ...item,
                        quantity: item.id === parseInt(event.target.id) ? event.target.value : item.quantity
                    }))
                })
            );
        }
        if (location.pathname === '/department-master/mass-spec') {
            dispatch(
                changeMasterDepartmentItem({
                    ...masterDepartmentItemSelector.response,
                    massSpecItems: masterDepartmentItemSelector.response?.massSpecItems.map((item) => ({
                        ...item,
                        quantity: item.id === parseInt(event.target.id) ? event.target.value : item.quantity
                    }))
                })
            );
        }
        if (location.pathname === '/department-master/receiving') {
            dispatch(
                changeMasterDepartmentItem({
                    ...masterDepartmentItemSelector.response,
                    receivingItems: masterDepartmentItemSelector.response?.receivingItems.map((item) => ({
                        ...item,
                        quantity: item.id === parseInt(event.target.id) ? event.target.value : item.quantity
                    }))
                })
            );
        }
        if (location.pathname === '/department-master/rd') {
            dispatch(
                changeMasterDepartmentItem({
                    ...masterDepartmentItemSelector.response,
                    rdItems: masterDepartmentItemSelector.response?.rdItems.map((item) => ({
                        ...item,
                        quantity: item.id === parseInt(event.target.id) ? event.target.value : item.quantity
                    }))
                })
            );
        }
        if (location.pathname === '/department-master/screening') {
            dispatch(
                changeMasterDepartmentItem({
                    ...masterDepartmentItemSelector.response,
                    screeningItems: masterDepartmentItemSelector.response?.screeningItems.map((item) => ({
                        ...item,
                        quantity: item.id === parseInt(event.target.id) ? event.target.value : item.quantity
                    }))
                })
            );
        }
        if (location.pathname === '/department-master/shipping') {
            dispatch(
                changeMasterDepartmentItem({
                    ...masterDepartmentItemSelector.response,
                    shippingItems: masterDepartmentItemSelector.response?.shippingItems.map((item) => ({
                        ...item,
                        quantity: item.id === parseInt(event.target.id) ? event.target.value : item.quantity
                    }))
                })
            );
        }
        if (location.pathname === '/department-master/quality') {
            dispatch(
                changeMasterDepartmentItem({
                    ...masterDepartmentItemSelector.response,
                    qualityItems: masterDepartmentItemSelector.response?.qualityItems.map((item) => ({
                        ...item,
                        quantity: item.id === parseInt(event.target.id) ? event.target.value : item.quantity
                    }))
                })
            );
        }
    };

    const handleFocus = (event: FocusEvent<HTMLElement>, departmentItem: IDepartmentItem) => {
        // dispatch(
        //     changeMasterDepartmentItem({
        //         ...masterDepartmentItemSelector.response,
        //         extractionsItems: masterDepartmentItemSelector.response?.extractionsItems.map((item) => ({
        //             ...item,
        //             quantity: item.id === departmentItem.id ? 0 : item.quantity
        //         }))
        //     })
        // );
    };

    const handleSubmit = () => {
        if (masterDepartmentItemSelector.response) {
            dispatch(
                updateQuantityThunk({
                    departmentName: location.state,
                    departmentItems: masterDepartmentItemSelector.response.extractionsItems
                })
            ).then(() => {
                if (departmentItemsSelector.response) {
                    dispatch(
                        changeDepartmentExperienceItems({
                            ...departmentItemsSelector.response,
                            content: departmentItemsSelector.response.content.map((item) => ({
                                ...item,
                                total_quantity:
                                    masterDepartmentItemSelector.response?.id === item.item_id
                                        ? getMasterDepartmentSelectorItems()?.reduce(
                                              (acc, item) => acc + item.quantity,
                                              0
                                          )
                                        : item.total_quantity
                            }))
                        })
                    );
                }
            });
        }
    };

    const getMasterDepartmentSelectorItems = () => {
        switch (location.pathname) {
            case '/department-master/extractions':
                return masterDepartmentItemSelector.response?.extractionsItems;
            case '/department-master/mass-spec':
                return masterDepartmentItemSelector.response?.massSpecItems;
            case '/department-master/receiving':
                return masterDepartmentItemSelector.response?.receivingItems;
            case '/department-master/rd':
                return masterDepartmentItemSelector.response?.rdItems;
            case '/department-master/screening':
                return masterDepartmentItemSelector.response?.screeningItems;
            case '/department-master/shipping':
                return masterDepartmentItemSelector.response?.shippingItems;
            case '/department-master/quality':
                return masterDepartmentItemSelector.response?.qualityItems;
            default:
                return [];
        }
    };

    const getDepartmentItems = (masterDepartmentItem: IMasterDepartmentItem) => {
        switch (location.pathname) {
            case '/department-master/extractions':
                return masterDepartmentItem.extractionsItems;
            case '/department-master/mass-spec':
                return masterDepartmentItem.massSpecItems;
            case '/department-master/receiving':
                return masterDepartmentItem.receivingItems;
            case '/department-master/rd':
                return masterDepartmentItem.rdItems;
            case '/department-master/screening':
                return masterDepartmentItem.screeningItems;
            case '/department-master/shipping':
                return masterDepartmentItem.shippingItems;
            case '/department-master/quality':
                return masterDepartmentItem.qualityItems;
            default:
                return [];
        }
    };

    const handleDateChange = () => {};

    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            sx={{ padding: 2, height: '100%' }}>
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            {columns.length > 0 &&
                                columns.map((column) => <TableCell key={column.field}>{column.headerName}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {masterDepartmentItemSelector &&
                            masterDepartmentItemSelector.response &&
                            getDepartmentItems(masterDepartmentItemSelector.response).length > 0 &&
                            getDepartmentItems(masterDepartmentItemSelector.response).map((departmentItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>{departmentItem.id}</TableCell>
                                    <TableCell>{departmentItem.location}</TableCell>
                                    <TableCell>
                                        <TextField
                                            ref={inputRef}
                                            sx={{ maxWidth: 120 }}
                                            type="number"
                                            size="small"
                                            name={departmentItem.id.toString()}
                                            value={departmentItem.quantity}
                                            id={departmentItem.id.toString()}
                                            onChange={handleQuantityChange}
                                            onFocus={(event: FocusEvent<HTMLElement>) =>
                                                handleFocus(event, departmentItem)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{departmentItem.usage_level}</TableCell>
                                    <TableCell>{departmentItem.min_quantity}</TableCell>
                                    <TableCell>{departmentItem.max_quantity}</TableCell>
                                    <TableCell>{departmentItem.lot_number}</TableCell>
                                    <TableCell>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DesktopDatePicker
                                                inputFormat="MM/DD/YYYY"
                                                value={departmentItem.expiration_date}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </TableCell>
                                    <TableCell>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DesktopDatePicker
                                                inputFormat="MM/DD/YYYY"
                                                value={departmentItem.received_date}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="stretch"
                sx={{ padding: 2, height: '100%' }}>
                <Button onClick={handleSubmit}>SUBMIT </Button>
                <Button onClick={handleClose}>CLOSE </Button>
            </Stack>
        </Stack>
    );
};

export default UpdateQuantityForm;
