import { ChangeEvent, Fragment, useRef, KeyboardEvent, useState, FocusEventHandler, FocusEvent } from 'react';
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
    Typography,
    Collapse,
    IconButton
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IMasterDepartment } from '../app/api/properties/IMaster';

const columns: {
    field: string;
    tooltipName: string | JSX.Element;
    headerName: string;
    align: 'left' | 'center' | 'right';
}[] = [
    { field: 'item', tooltipName: 'Item', headerName: 'Item', align: 'left' },
    {
        field: 'purchaseUnit',
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
        field: 'recentCN',
        tooltipName: 'Recent CN',
        headerName: 'RCN',
        align: 'left'
    },
    {
        field: 'recentVendor',
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
        field: 'unitPrice',
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
    '&:nth-of-type(odd)': {},
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
    const [open, setOpen] = useState<number[]>([]);

    const tableRef = useRef<{ tableRef: HTMLTableSectionElement | null }>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const inputRef = useRef<{
        location: HTMLDivElement | null;
        maximumQuantity: HTMLDivElement | null;
        minimumQuantity: HTMLDivElement | null;
        usageLevel: HTMLDivElement | null;
        lotNumber: HTMLDivElement | null;
        quantity: HTMLDivElement | null;
        expirationDate: HTMLDivElement | null;
        receivedDate: HTMLDivElement | null;
    }>({
        location: null,
        maximumQuantity: null,
        minimumQuantity: null,
        usageLevel: null,
        lotNumber: null,
        quantity: null,
        expirationDate: null,
        receivedDate: null
    });

    const handleEnterKey = (
        event: KeyboardEvent<HTMLDivElement>,
        departmentItem: IDepartment,
        ref: HTMLDivElement | null
    ) => {
        if (event.key === 'Enter') {
            inputRef.current.location = ref;
            dispatch(
                updateDepartmentItemThunk({
                    state: location.state,
                    departmentItem: departmentItem
                })
            )
                .then(() => {
                    if (ref) {
                        ref.style.backgroundColor = '#98FB98';
                        ref.style.transition = '1s background ease-in, 500ms transform ease-out 1s';
                        setTimeout(() => {
                            if (ref) {
                                ref.style.backgroundColor = '#FAFAFA';
                            }
                        }, 700);
                    }
                })
                .catch((error: Error) => {
                    console.error(error.message);
                    if (ref) {
                        ref.style.backgroundColor = '#FF0000';
                        ref.style.transition = '1s background ease-in, 500ms transform ease-out 1s';
                        setTimeout(() => {
                            if (ref) {
                                ref.style.backgroundColor = '#FAFAFA';
                            }
                        }, 700);
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
                                  lotNumber:
                                      departmentItem.id === departmentItemId
                                          ? event.target.value
                                          : departmentItem.lotNumber
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
                                  usageLevel:
                                      departmentItem.id === departmentItemId
                                          ? event.target.value
                                          : departmentItem.usageLevel
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
                                  expirationDate:
                                      departmentItem.id === departmentItemId ? value : departmentItem.expirationDate
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
                                  receivedDate:
                                      departmentItem.id === departmentItemId ? value : departmentItem.receivedDate
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

    const getOrderQuantity = (minimumQuantity: number, maximumQuantity: number, totalQuantity: number) => {
        if (!minimumQuantity || !maximumQuantity) {
            return { orderQuantity: null, color: '#eded00' };
        } else if (minimumQuantity === 1 && maximumQuantity === 1 && totalQuantity < 1) {
            return { orderQuantity: 1, color: '#FF0000' };
        } else if (totalQuantity < minimumQuantity) {
            return { orderQuantity: maximumQuantity - totalQuantity, color: 'red' };
        } else {
            return { orderQuantity: 0, color: '#3CB371' };
        }
    };

    const getTotalPrice = (unitPrice: number, totalQuantity: number) => {
        return unitPrice * totalQuantity;
    };

    const handleExpandRow = (masterDepartmentItem: IMasterDepartment) => {
        if (open.includes(masterDepartmentItem.id)) {
            setOpen(open.filter((id) => id !== masterDepartmentItem.id));
        } else {
            setOpen([...open, masterDepartmentItem.id]);
        }
    };

    const handleExpandAllRow = () => {
        if (masterDepartmentItemsSelector.response.content.length > 0) {
            if (open.length === 0) {
                setOpen(
                    masterDepartmentItemsSelector.response.content.reduce((result: number[], masterDepartmentItem) => {
                        if (masterDepartmentItem.id) {
                            result.push(masterDepartmentItem.id);
                        }
                        return result;
                    }, [])
                );
            } else {
                setOpen([]);
            }
        }
    };

    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            component={Paper}
            elevation={3}
            ref={containerRef}>
            <TableContainer sx={{ height: '70vh' }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow sx={{ height: 50 }}>
                            <StyledTableCell align="left">
                                <IconButton aria-label="expand row" size="small" onClick={handleExpandAllRow}>
                                    {masterDepartmentItemsSelector.response.content.every((masterDepartmentItem) =>
                                        open.includes(masterDepartmentItem.id)
                                    ) ? (
                                        <KeyboardArrowUpIcon fontSize="large" />
                                    ) : (
                                        <KeyboardArrowDownIcon fontSize="large" />
                                    )}
                                </IconButton>
                            </StyledTableCell>
                            {columns.length > 0 &&
                                columns.map((column) => (
                                    <Fragment>
                                        <StyledTableCell key={column.field} align={column.align}>
                                            <Box>{column.tooltipName}</Box>
                                        </StyledTableCell>
                                    </Fragment>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {masterDepartmentItemsSelector.response.content.length > 0 &&
                            masterDepartmentItemsSelector.response.content.map((masterDepartmentItem, index) => (
                                <Fragment>
                                    <StyledTableRow hover sx={{ height: 45 }}>
                                        <TableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => handleExpandRow(masterDepartmentItem)}>
                                                {open.find((id) => id === masterDepartmentItem.id) ? (
                                                    <KeyboardArrowUpIcon />
                                                ) : (
                                                    <KeyboardArrowDownIcon />
                                                )}
                                            </IconButton>
                                        </TableCell>
                                        <StyledTableCell width={400}>{masterDepartmentItem.item}</StyledTableCell>
                                        <StyledTableCell width={120}>
                                            {masterDepartmentItem.purchaseUnit}
                                        </StyledTableCell>
                                        <StyledTableCell>{masterDepartmentItem.partNumber}</StyledTableCell>
                                        <StyledTableCell>{masterDepartmentItem.recentCN}</StyledTableCell>
                                        <StyledTableCell width={200}>
                                            {masterDepartmentItem.recentVendor}
                                        </StyledTableCell>
                                        <StyledTableCell>{masterDepartmentItem.drugClass}</StyledTableCell>
                                        <StyledTableCell sx={{ textAlign: 'center' }}>
                                            <Typography variant="inherit" sx={{ fontWeight: 900 }}>
                                                {getTotalQuantity(masterDepartmentItem.departmentItems)}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            sx={{
                                                backgroundColor: getOrderQuantity(
                                                    masterDepartmentItem.departmentItems[0].minimumQuantity,
                                                    masterDepartmentItem.departmentItems[0].maximumQuantity,
                                                    getTotalQuantity(masterDepartmentItem.departmentItems)
                                                ).color
                                            }}>
                                            {
                                                getOrderQuantity(
                                                    masterDepartmentItem.departmentItems[0].minimumQuantity,
                                                    masterDepartmentItem.departmentItems[0].maximumQuantity,
                                                    getTotalQuantity(masterDepartmentItem.departmentItems)
                                                ).orderQuantity
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell>${masterDepartmentItem.unitPrice}</StyledTableCell>
                                        <StyledTableCell>
                                            $
                                            {getTotalPrice(
                                                masterDepartmentItem.unitPrice,
                                                getTotalQuantity(masterDepartmentItem.departmentItems)
                                            ).toFixed(2)}
                                        </StyledTableCell>
                                        <StyledTableCell width={200}>{masterDepartmentItem.comment}</StyledTableCell>
                                        <StyledTableCell width={80}>{masterDepartmentItem.category}</StyledTableCell>
                                    </StyledTableRow>
                                    {open.find((id) => id === masterDepartmentItem.id) && (
                                        <TableRow>
                                            <TableCell colSpan={13}>
                                                <Collapse
                                                    in={open.includes(masterDepartmentItem.id)}
                                                    timeout="auto"
                                                    unmountOnExit>
                                                    <Paper sx={{ margin: 2 }} elevation={1} square>
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
                                                                    <StyledSubTableCell align="left">
                                                                        Lot #
                                                                    </StyledSubTableCell>
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
                                                                            <StyledSubTableCell>
                                                                                <TextField
                                                                                    className={
                                                                                        'location' +
                                                                                        departmentItem.id.toString()
                                                                                    }
                                                                                    id={
                                                                                        'location' +
                                                                                        departmentItem.id.toString()
                                                                                    }
                                                                                    ref={(ref) =>
                                                                                        (inputRef.current.location =
                                                                                            ref)
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
                                                                                        '.MuiInputBase-input': {
                                                                                            padding: 1,
                                                                                            fontSize: 14,
                                                                                            width: 300
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
                                                                            <StyledSubTableCell align="left">
                                                                                <TextField
                                                                                    id="minimumQuantity"
                                                                                    ref={(ref) =>
                                                                                        (inputRef.current.minimumQuantity =
                                                                                            ref)
                                                                                    }
                                                                                    size="small"
                                                                                    type="number"
                                                                                    InputProps={{
                                                                                        inputProps: { min: 0 }
                                                                                    }}
                                                                                    name="minimumQuantity"
                                                                                    value={
                                                                                        departmentItem.minimumQuantity
                                                                                    }
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
                                                                                            inputRef.current
                                                                                                .minimumQuantity
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </StyledSubTableCell>
                                                                            <StyledSubTableCell align="left">
                                                                                <TextField
                                                                                    id="maximumQuantity"
                                                                                    ref={(ref) =>
                                                                                        (inputRef.current.maximumQuantity =
                                                                                            ref)
                                                                                    }
                                                                                    size="small"
                                                                                    type="number"
                                                                                    InputProps={{
                                                                                        inputProps: { min: 0 }
                                                                                    }}
                                                                                    name="maximumQuantity"
                                                                                    sx={{
                                                                                        '.MuiInputBase-input': {
                                                                                            padding: 1,
                                                                                            fontWeight: 900,
                                                                                            fontSize: 14
                                                                                        }
                                                                                    }}
                                                                                    value={
                                                                                        departmentItem.maximumQuantity
                                                                                    }
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
                                                                                            inputRef.current
                                                                                                .maximumQuantity
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </StyledSubTableCell>
                                                                            <StyledSubTableCell align="left">
                                                                                <TextField
                                                                                    id="usageLevel"
                                                                                    ref={(ref) =>
                                                                                        (inputRef.current.usageLevel =
                                                                                            ref)
                                                                                    }
                                                                                    name="usageLevel"
                                                                                    sx={{
                                                                                        '.MuiInputBase-input': {
                                                                                            padding: 1,
                                                                                            fontWeight: 900,
                                                                                            fontSize: 14,
                                                                                            width: 250
                                                                                        }
                                                                                    }}
                                                                                    InputProps={{
                                                                                        inputProps: { min: 0 }
                                                                                    }}
                                                                                    size="small"
                                                                                    value={departmentItem.usageLevel}
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
                                                                                            inputRef.current.usageLevel
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </StyledSubTableCell>
                                                                            <StyledSubTableCell align="left">
                                                                                <TextField
                                                                                    id="quantity"
                                                                                    ref={(ref) =>
                                                                                        (inputRef.current.quantity =
                                                                                            ref)
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
                                                                                    id="lotNumber"
                                                                                    ref={(ref) =>
                                                                                        (inputRef.current.lotNumber =
                                                                                            ref)
                                                                                    }
                                                                                    size="small"
                                                                                    name="lotNumber"
                                                                                    value={
                                                                                        departmentItem.lotNumber ===
                                                                                        null
                                                                                            ? ''
                                                                                            : departmentItem.lotNumber
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
                                                                                            inputRef.current.lotNumber
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </StyledSubTableCell>
                                                                            <StyledSubTableCell align="left">
                                                                                <LocalizationProvider
                                                                                    dateAdapter={AdapterMoment}>
                                                                                    <DateTimePicker
                                                                                        ref={(ref) =>
                                                                                            (inputRef.current.expirationDate =
                                                                                                ref)
                                                                                        }
                                                                                        value={
                                                                                            departmentItem.expirationDate
                                                                                        }
                                                                                        onChange={(
                                                                                            value: Date | null
                                                                                        ) =>
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
                                                                                                    '.MuiInputBase-input':
                                                                                                        {
                                                                                                            padding: 1,
                                                                                                            fontSize: 14,
                                                                                                            width: 200
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
                                                                                    dateAdapter={AdapterMoment}>
                                                                                    <DateTimePicker
                                                                                        inputRef={(ref) =>
                                                                                            (inputRef.current.receivedDate =
                                                                                                ref)
                                                                                        }
                                                                                        value={
                                                                                            departmentItem.receivedDate
                                                                                        }
                                                                                        onChange={(
                                                                                            value: Date | null
                                                                                        ) =>
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
                                                                                                    '.MuiInputBase-input':
                                                                                                        {
                                                                                                            padding: 1,
                                                                                                            fontSize: 14,
                                                                                                            width: 200
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
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    )}
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
