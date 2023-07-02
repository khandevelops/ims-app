import { ChangeEvent, Fragment, useRef, KeyboardEvent, useState } from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Box,
    tableCellClasses,
    styled,
    TextField,
    Typography
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { handlePage } from '../app/common/pageSlice';
import {
    changeMasterDepartmentItems,
    getMasterDepartmentItemsThunk,
    selectMasterDepartmentItems
} from '../app/slice/master/masterDepartmentItemsSlice';
import { IDepartment } from '../app/api/properties/IDepartment';
import { updateDepartmentItemThunk } from '../app/slice/department/departmentItemUpdateSlice';

const columns: {
    field: string;
    tooltipName: string | JSX.Element;
    headerName: string;
    align: 'left' | 'center' | 'right';
}[] = [
    { field: 'item', tooltipName: 'Item', headerName: 'Item', align: 'left' },
    {
        field: 'purchase_unit',
        tooltipName: 'Purchase Unit',
        headerName: 'PU',
        align: 'left'
    },
    {
        field: 'part_number',
        tooltipName: 'Part Number',
        headerName: 'PN',
        align: 'left'
    },
    {
        field: 'recent_cn',
        tooltipName: 'Recent CN',
        headerName: 'RCN',
        align: 'left'
    },
    {
        field: 'recent_vendor',
        tooltipName: 'Recent Vendor',
        headerName: 'RV',
        align: 'left'
    },
    {
        field: 'drug_class',
        tooltipName: 'Drug Class',
        headerName: 'DC',
        align: 'left'
    },
    {
        field: 'total_quantity',
        tooltipName: 'Total Qty',
        headerName: 'TQ',
        align: 'left'
    },
    {
        field: 'order_quantity',
        tooltipName: 'Order Qty',
        headerName: 'OQ',
        align: 'left'
    },
    {
        field: 'unit_price',
        tooltipName: 'Unit Price',
        headerName: 'UP',
        align: 'left'
    },
    {
        field: 'total_price',
        tooltipName: 'Total Price',
        headerName: 'TP',
        align: 'left'
    },
    {
        field: 'comment',
        tooltipName: 'Comment',
        headerName: 'Comment',
        align: 'left'
    },
    {
        field: 'category',
        tooltipName: 'Category',
        headerName: 'C',
        align: 'left'
    }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffd740',
        fontSize: 12,
        fontWeight: 700,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        fontWeight: 600
    }
}));

const StyledSubTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f8fafc',
        fontSize: 12,
        fontWeight: 700,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#FFFFCE'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

const DepartmentsMaster = () => {
    const masterDepartmentItemsSelector = useAppSelector(selectMasterDepartmentItems);
    const [page, setPage] = useState<number>(0);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const inputRef = useRef<{
        location: HTMLDivElement | null;
        maximum_quantity: HTMLDivElement | null;
        minimum_quantity: HTMLDivElement | null;
        usage_level: HTMLDivElement | null;
        lot_number: HTMLDivElement | null;
        quantity: HTMLDivElement | null;
        expiration_date: HTMLDivElement | null;
        received_date: HTMLDivElement | null;
    }>({
        location: null,
        maximum_quantity: null,
        minimum_quantity: null,
        usage_level: null,
        lot_number: null,
        quantity: null,
        expiration_date: null,
        received_date: null
    });

    const handleEnterKey = (
        event: KeyboardEvent<HTMLDivElement>,
        departmentItem: IDepartment,
        inputRef: HTMLDivElement | null
    ) => {
        if (event.key === 'Enter') {
            dispatch(
                updateDepartmentItemThunk({
                    state: location.state,
                    departmentItem: departmentItem
                })
            )
                .then(() => {
                    if (inputRef) {
                        inputRef.style.backgroundColor = '#98FB98';
                        inputRef.style.transition = '1s background ease-in, 500ms transform ease-out 1s';
                        setTimeout(() => {
                            inputRef.style.backgroundColor = '#FAFAFA';
                            inputRef.style.transition = '1s background ease-in, 300ms transform ease-out 1s';
                        }, 600);
                    }
                })
                .catch((error: Error) => {
                    console.error(error.message);
                    if (inputRef) {
                        inputRef.style.backgroundColor = '#FF0000';
                        inputRef.style.transition = '1s background ease-in, 500ms transform ease-out 1s';
                        setTimeout(() => {
                            inputRef.style.backgroundColor = '#FAFAFA';
                            inputRef.style.transition = '1s background ease-in, 300ms transform ease-out 1s';
                        }, 600);
                    }
                });
        }
    };

    useEffect(() => {
        dispatch(
            getMasterDepartmentItemsThunk({
                state: location.state,
                page: page
            })
        );
    }, [dispatch, location.state, page]);

    const handleChangePage = (event: any, newPage: number): void => {
        setPage(newPage);
        dispatch(handlePage(newPage));
    };

    const handleQuantityChange = (
        event: ChangeEvent<HTMLInputElement>,
        masterDepartmentItemId: number | undefined,
        departmentItemId: number
    ) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  quantity:
                                      departmentItem.id === departmentItemId
                                          ? parseInt(event.target.value)
                                          : departmentItem.quantity
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };

    const handleLotNumberChange = (
        event: ChangeEvent<HTMLInputElement>,
        masterDepartmentItemId: number | undefined,
        departmentItemId: number
    ) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  lot_number:
                                      departmentItem.id === departmentItemId
                                          ? event.target.value
                                          : departmentItem.lot_number
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };

    const handleLocationChange = (
        event: ChangeEvent<HTMLInputElement>,
        masterDepartmentItemId: number | undefined,
        departmentItemId: number
    ) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  location:
                                      departmentItem.id === departmentItemId
                                          ? event.target.value
                                          : departmentItem.location
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };
    const handleMinimumQtyChange = (
        event: ChangeEvent<HTMLInputElement>,
        masterDepartmentItemId: number | undefined,
        departmentItemId: number
    ) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  location:
                                      departmentItem.id === departmentItemId
                                          ? event.target.value
                                          : departmentItem.location
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };
    const handleMaximumQtyChange = (
        event: ChangeEvent<HTMLInputElement>,
        masterDepartmentItemId: number | undefined,
        departmentItemId: number
    ) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  location:
                                      departmentItem.id === departmentItemId
                                          ? event.target.value
                                          : departmentItem.location
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };
    const handleUsageLevelChange = (
        event: ChangeEvent<HTMLInputElement>,
        masterDepartmentItemId: number | undefined,
        departmentItemId: number
    ) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  usage_level:
                                      departmentItem.id === departmentItemId
                                          ? event.target.value
                                          : departmentItem.usage_level
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };

    const handleExpirationDateChange = (
        value: Date | null,
        masterDepartmentItemId: number | undefined,
        departmentItemId: number
    ) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  expiration_date:
                                      departmentItem.id === departmentItemId ? value : departmentItem.expiration_date
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };

    const handleReceivedDateChange = (
        value: Date | null,
        masterDepartmentItemId: number | undefined,
        departmentItemId: number
    ) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  received_date:
                                      departmentItem.id === departmentItemId ? value : departmentItem.received_date
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };

    const handleClose = (departmentItem: IDepartment) => {
        dispatch(
            updateDepartmentItemThunk({
                state: location.state,
                departmentItem: departmentItem
            })
        );
    };

    const getTotalQuantity = (departmentItems: IDepartment[]) => {
        return departmentItems.reduce((acc, departmentItem) => acc + departmentItem.quantity, 0);
    };

    const getOrderQuantity = (minimum_quantity: number, maximum_quantity: number, totalQuantity: number) => {
        if (!minimum_quantity || !maximum_quantity) {
            return { orderQuantity: null, color: '#eded00' };
        } else if (minimum_quantity === 1 && maximum_quantity === 1 && totalQuantity < 1) {
            return { orderQuantity: 1, color: '#FF0000' };
        } else if (totalQuantity < minimum_quantity) {
            return { orderQuantity: maximum_quantity - totalQuantity, color: 'red' };
        } else {
            return { orderQuantity: 0, color: '#3CB371' };
        }
    };

    const getTotalPrice = (unit_price: number, totalQuantity: number) => {
        return unit_price * totalQuantity;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} component={Paper} elevation={3}>
            <TableContainer sx={{ height: '70vh' }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow sx={{ height: 50 }}>
                            {columns.length > 0 &&
                                columns.map((column) => (
                                    <StyledTableCell key={column.field} align={column.align}>
                                        <Box>{column.tooltipName}</Box>
                                    </StyledTableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {masterDepartmentItemsSelector.response.content.length > 0 &&
                            masterDepartmentItemsSelector.response.content.map((masterDepartmentItem, index) => (
                                <Fragment key={index}>
                                    <StyledTableRow hover>
                                        <StyledTableCell sx={{ width: 400 }}>
                                            {masterDepartmentItem.item}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ width: 120 }}>
                                            {masterDepartmentItem.purchase_unit}
                                        </StyledTableCell>
                                        <StyledTableCell>{masterDepartmentItem.part_number}</StyledTableCell>
                                        <StyledTableCell>{masterDepartmentItem.recent_cn}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 200 }}>
                                            {masterDepartmentItem.recent_vendor}
                                        </StyledTableCell>
                                        <StyledTableCell>{masterDepartmentItem.drug_class}</StyledTableCell>
                                        <StyledTableCell sx={{ textAlign: 'center' }}>
                                            <Typography variant="inherit" sx={{ fontWeight: 900 }}>
                                                {getTotalQuantity(masterDepartmentItem.departmentItems)}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                backgroundColor: getOrderQuantity(
                                                    masterDepartmentItem.departmentItems[0].minimum_quantity,
                                                    masterDepartmentItem.departmentItems[0].maximum_quantity,
                                                    getTotalQuantity(masterDepartmentItem.departmentItems)
                                                ).color
                                            }}
                                        >
                                            {
                                                getOrderQuantity(
                                                    masterDepartmentItem.departmentItems[0].minimum_quantity,
                                                    masterDepartmentItem.departmentItems[0].maximum_quantity,
                                                    getTotalQuantity(masterDepartmentItem.departmentItems)
                                                ).orderQuantity
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell>${masterDepartmentItem.unit_price}</StyledTableCell>
                                        <StyledTableCell>
                                            $
                                            {getTotalPrice(
                                                masterDepartmentItem.unit_price,
                                                getTotalQuantity(masterDepartmentItem.departmentItems)
                                            ).toFixed(2)}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ width: 200 }}>
                                            {masterDepartmentItem.comment}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>
                                            {masterDepartmentItem.category}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <TableRow>
                                        <TableCell colSpan={1} />
                                        <TableCell colSpan={12}>
                                            <Paper sx={{ margin: 3 }} elevation={1} square>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledSubTableCell>Location</StyledSubTableCell>
                                                            <StyledSubTableCell align="left">
                                                                Min Qty
                                                            </StyledSubTableCell>
                                                            <StyledSubTableCell align="left">
                                                                Max Qty
                                                            </StyledSubTableCell>
                                                            <StyledSubTableCell align="left">
                                                                Usage Level
                                                            </StyledSubTableCell>
                                                            <StyledSubTableCell>Qty</StyledSubTableCell>
                                                            <StyledSubTableCell align="left">Lot #</StyledSubTableCell>
                                                            <StyledSubTableCell align="left">
                                                                Expiration Date
                                                            </StyledSubTableCell>
                                                            <StyledSubTableCell align="left">
                                                                Received Date
                                                            </StyledSubTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {masterDepartmentItem.departmentItems.map(
                                                            (departmentItem, index) => (
                                                                <TableRow key={index} hover>
                                                                    <StyledSubTableCell sx={{ width: 300 }}>
                                                                        <TextField
                                                                            id="location"
                                                                            ref={(ref) =>
                                                                                (inputRef.current.location = ref)
                                                                            }
                                                                            size="small"
                                                                            name="location"
                                                                            value={
                                                                                departmentItem.location === null
                                                                                    ? ''
                                                                                    : departmentItem.location
                                                                            }
                                                                            onChange={(
                                                                                event: ChangeEvent<HTMLInputElement>
                                                                            ) =>
                                                                                handleLocationChange(
                                                                                    event,
                                                                                    masterDepartmentItem.id,
                                                                                    departmentItem.id
                                                                                )
                                                                            }
                                                                            sx={{
                                                                                width: 300,
                                                                                '.MuiInputBase-input': {
                                                                                    padding: 1,
                                                                                    fontSize: 14
                                                                                }
                                                                            }}
                                                                            onKeyDown={(
                                                                                event: KeyboardEvent<HTMLDivElement>
                                                                            ) =>
                                                                                handleEnterKey(
                                                                                    event,
                                                                                    departmentItem,
                                                                                    inputRef.current.location
                                                                                )
                                                                            }
                                                                        />
                                                                    </StyledSubTableCell>
                                                                    <StyledSubTableCell
                                                                        align="left"
                                                                        sx={{ width: 100 }}
                                                                    >
                                                                        <TextField
                                                                            id="minimum_quantity"
                                                                            ref={(ref) =>
                                                                                (inputRef.current.minimum_quantity =
                                                                                    ref)
                                                                            }
                                                                            size="small"
                                                                            type="number"
                                                                            name="minimum_quantity"
                                                                            value={departmentItem.minimum_quantity}
                                                                            onChange={(
                                                                                event: ChangeEvent<HTMLInputElement>
                                                                            ) =>
                                                                                handleMinimumQtyChange(
                                                                                    event,
                                                                                    masterDepartmentItem.id,
                                                                                    departmentItem.id
                                                                                )
                                                                            }
                                                                            sx={{
                                                                                '.MuiInputBase-input': {
                                                                                    padding: 1,
                                                                                    fontSize: 14
                                                                                }
                                                                            }}
                                                                            onKeyDown={(
                                                                                event: KeyboardEvent<HTMLDivElement>
                                                                            ) =>
                                                                                handleEnterKey(
                                                                                    event,
                                                                                    departmentItem,
                                                                                    inputRef.current.minimum_quantity
                                                                                )
                                                                            }
                                                                        />
                                                                    </StyledSubTableCell>
                                                                    <StyledSubTableCell
                                                                        align="left"
                                                                        sx={{ width: 100 }}
                                                                    >
                                                                        <TextField
                                                                            id="maximum_quantity"
                                                                            ref={(ref) =>
                                                                                (inputRef.current.maximum_quantity =
                                                                                    ref)
                                                                            }
                                                                            size="small"
                                                                            type="number"
                                                                            name="maximum_quantity"
                                                                            sx={{
                                                                                '.MuiInputBase-input': {
                                                                                    padding: 1,
                                                                                    fontWeight: 900,
                                                                                    fontSize: 14
                                                                                }
                                                                            }}
                                                                            InputProps={{
                                                                                inputProps: { min: 0 }
                                                                            }}
                                                                            value={departmentItem.maximum_quantity}
                                                                            onChange={(
                                                                                event: ChangeEvent<HTMLInputElement>
                                                                            ) =>
                                                                                handleMaximumQtyChange(
                                                                                    event,
                                                                                    masterDepartmentItem.id,
                                                                                    departmentItem.id
                                                                                )
                                                                            }
                                                                            onKeyDown={(
                                                                                event: KeyboardEvent<HTMLDivElement>
                                                                            ) =>
                                                                                handleEnterKey(
                                                                                    event,
                                                                                    departmentItem,
                                                                                    inputRef.current.maximum_quantity
                                                                                )
                                                                            }
                                                                        />
                                                                    </StyledSubTableCell>
                                                                    <StyledSubTableCell align="left">
                                                                        <TextField
                                                                            id="usage_level"
                                                                            ref={(ref) =>
                                                                                (inputRef.current.usage_level = ref)
                                                                            }
                                                                            name="usage_level"
                                                                            sx={{
                                                                                '.MuiInputBase-input': {
                                                                                    padding: 1,
                                                                                    fontWeight: 900,
                                                                                    fontSize: 14
                                                                                }
                                                                            }}
                                                                            InputProps={{
                                                                                inputProps: { min: 0 }
                                                                            }}
                                                                            size="small"
                                                                            value={departmentItem.usage_level}
                                                                            onChange={(
                                                                                event: ChangeEvent<HTMLInputElement>
                                                                            ) =>
                                                                                handleUsageLevelChange(
                                                                                    event,
                                                                                    masterDepartmentItem.id,
                                                                                    departmentItem.id
                                                                                )
                                                                            }
                                                                            onKeyDown={(
                                                                                event: KeyboardEvent<HTMLDivElement>
                                                                            ) =>
                                                                                handleEnterKey(
                                                                                    event,
                                                                                    departmentItem,
                                                                                    inputRef.current.usage_level
                                                                                )
                                                                            }
                                                                        />
                                                                    </StyledSubTableCell>
                                                                    <StyledSubTableCell align="left">
                                                                        <TextField
                                                                            id="quantity"
                                                                            ref={(ref) =>
                                                                                (inputRef.current.quantity = ref)
                                                                            }
                                                                            type="number"
                                                                            name="quantity"
                                                                            sx={{
                                                                                '.MuiInputBase-input': {
                                                                                    padding: 1,
                                                                                    fontWeight: 900,
                                                                                    fontSize: 14
                                                                                }
                                                                            }}
                                                                            InputProps={{
                                                                                inputProps: { min: 0 }
                                                                            }}
                                                                            size="small"
                                                                            value={departmentItem.quantity}
                                                                            onChange={(
                                                                                event: ChangeEvent<HTMLInputElement>
                                                                            ) =>
                                                                                handleQuantityChange(
                                                                                    event,
                                                                                    masterDepartmentItem.id,
                                                                                    departmentItem.id
                                                                                )
                                                                            }
                                                                            onKeyDown={(
                                                                                event: KeyboardEvent<HTMLDivElement>
                                                                            ) =>
                                                                                handleEnterKey(
                                                                                    event,
                                                                                    departmentItem,
                                                                                    inputRef.current.quantity
                                                                                )
                                                                            }
                                                                        />
                                                                    </StyledSubTableCell>
                                                                    <StyledSubTableCell align="left">
                                                                        <TextField
                                                                            id="lot_number"
                                                                            ref={(ref) =>
                                                                                (inputRef.current.lot_number = ref)
                                                                            }
                                                                            size="small"
                                                                            name="lot_number"
                                                                            value={
                                                                                departmentItem.lot_number === null
                                                                                    ? ''
                                                                                    : departmentItem.lot_number
                                                                            }
                                                                            onChange={(
                                                                                event: ChangeEvent<HTMLInputElement>
                                                                            ) =>
                                                                                handleLotNumberChange(
                                                                                    event,
                                                                                    masterDepartmentItem.id,
                                                                                    departmentItem.id
                                                                                )
                                                                            }
                                                                            sx={{
                                                                                '.MuiInputBase-input': {
                                                                                    padding: 1,
                                                                                    fontSize: 14
                                                                                }
                                                                            }}
                                                                            onKeyDown={(
                                                                                event: KeyboardEvent<HTMLDivElement>
                                                                            ) =>
                                                                                handleEnterKey(
                                                                                    event,
                                                                                    departmentItem,
                                                                                    inputRef.current.lot_number
                                                                                )
                                                                            }
                                                                        />
                                                                    </StyledSubTableCell>
                                                                    <StyledSubTableCell align="left">
                                                                        <LocalizationProvider
                                                                            dateAdapter={AdapterMoment}
                                                                        >
                                                                            <DateTimePicker
                                                                                ref={(ref) =>
                                                                                    (inputRef.current.expiration_date =
                                                                                        ref)
                                                                                }
                                                                                value={departmentItem.expiration_date}
                                                                                onChange={(value: Date | null) =>
                                                                                    handleExpirationDateChange(
                                                                                        value,
                                                                                        masterDepartmentItem.id,
                                                                                        departmentItem.id
                                                                                    )
                                                                                }
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        sx={{
                                                                                            '.MuiInputBase-input': {
                                                                                                padding: 1,
                                                                                                fontSize: 14
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                                onClose={() =>
                                                                                    handleClose(departmentItem)
                                                                                }
                                                                            />
                                                                        </LocalizationProvider>
                                                                    </StyledSubTableCell>
                                                                    <StyledSubTableCell align="left">
                                                                        <LocalizationProvider
                                                                            dateAdapter={AdapterMoment}
                                                                        >
                                                                            <DateTimePicker
                                                                                inputRef={(ref) =>
                                                                                    (inputRef.current.received_date =
                                                                                        ref)
                                                                                }
                                                                                value={departmentItem.received_date}
                                                                                onChange={(value: Date | null) =>
                                                                                    handleReceivedDateChange(
                                                                                        value,
                                                                                        masterDepartmentItem.id,
                                                                                        departmentItem.id
                                                                                    )
                                                                                }
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        sx={{
                                                                                            '.MuiInputBase-input': {
                                                                                                padding: 1,
                                                                                                fontSize: 14
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                                onClose={() =>
                                                                                    handleClose(departmentItem)
                                                                                }
                                                                            />
                                                                        </LocalizationProvider>
                                                                    </StyledSubTableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                </Fragment>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{ marginTop: 'auto' }}
                rowsPerPageOptions={[]}
                component="div"
                count={masterDepartmentItemsSelector.response.totalElements}
                rowsPerPage={masterDepartmentItemsSelector.response.size}
                page={masterDepartmentItemsSelector?.response.number}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
            />
        </Box>
    );
};

export default DepartmentsMaster;
