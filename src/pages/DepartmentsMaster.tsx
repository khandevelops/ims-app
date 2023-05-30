import { ChangeEvent, Fragment, useRef, KeyboardEvent } from 'react';
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
    Drawer,
    tableCellClasses,
    styled,
    Divider,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import UpdateQuantityForm from '../components/UpdateQuantityForm';
import { handlePage, selectPage } from '../app/common/pageSlice';
import { selectDrawerToggleType } from '../app/drawerToggle/drawerToggleTypeSlice';
import { drawerToggleType } from '../common/constants';
import { changeMasterDepartmentItems, getMasterDepartmentItemsThunk, selectMasterDepartmentItems } from '../app/masterDepartment/masterDepartmentItemsSlice';
import { IDepartmentItem } from '../app/department/departmentItemsSlice';
import { updateDepartmentItemThunk } from '../app/department/departmentItemUpdateSlice';

const columns: { field: string; tooltipName: string | JSX.Element; headerName: string }[] = [
    { field: 'item', tooltipName: 'Item', headerName: 'Item' },
    { field: 'purchase_unit', tooltipName: 'Purchase Unit', headerName: 'PU' },
    { field: 'part_number', tooltipName: 'Part Number', headerName: 'PN' },
    { field: 'recent_cn', tooltipName: 'Recent CN', headerName: 'RCN' },
    { field: 'recent_vendor', tooltipName: 'Recent Vendor', headerName: 'RV' },
    { field: 'drug_class', tooltipName: 'Drug Class', headerName: 'DC' },
    { field: 'total_quantity', tooltipName: 'Total Qty', headerName: 'TQ' },
    { field: 'order_quantity', tooltipName: 'Order Qty', headerName: 'OQ' },
    { field: 'average_unit_price', tooltipName: 'Unit Price', headerName: 'UP' },
    { field: 'total_price', tooltipName: 'Total Price', headerName: 'TP' },
    { field: 'comment', tooltipName: 'Comment', headerName: 'Comment' },
    { field: 'category', tooltipName: 'Category', headerName: 'C' }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffd740',
        fontSize: 14,
        fontWeight: 700,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        fontWeight: 700
    }
}));

const StyledSubTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f8fafc',
        fontSize: 13,
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
    const drawerToggleTypeSelector = useAppSelector(selectDrawerToggleType);
    const pageSelector = useAppSelector(selectPage);
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        dispatch(
            getMasterDepartmentItemsThunk({
                state: location.state,
                page: pageSelector.page
            })
        );
    }, [dispatch, location.state, pageSelector.page]);

    const handleChangePage = (event: any, newPage: number): void => {
        dispatch(handlePage(newPage));
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, masterDepartmentItemId: number, departmentItemId: number) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  quantity: departmentItem.id === departmentItemId ? parseInt(event.target.value) : departmentItem.quantity
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };

    const handleLotNumberChange = (event: ChangeEvent<HTMLInputElement>, masterDepartmentItemId: number, departmentItemId: number) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  lot_number: departmentItem.id === departmentItemId ? event.target.value : departmentItem.lot_number
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };

    const handleExpirationDateChange = (value: Date | null, masterDepartmentItemId: number, departmentItemId: number) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  expiration_date: departmentItem.id === departmentItemId ? value : departmentItem.expiration_date
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };

    const handleReceivedDateChange = (value: Date | null, masterDepartmentItemId: number, departmentItemId: number) => {
        dispatch(
            changeMasterDepartmentItems(
                masterDepartmentItemsSelector.response.content.map((masterDepartmentItem) => ({
                    ...masterDepartmentItem,
                    departmentItems:
                        masterDepartmentItem.id === masterDepartmentItemId
                            ? masterDepartmentItem.departmentItems.map((departmentItem) => ({
                                  ...departmentItem,
                                  received_date: departmentItem.id === departmentItemId ? value : departmentItem.received_date
                              }))
                            : masterDepartmentItem.departmentItems
                }))
            )
        );
    };

    const handleEnterKey = (event: KeyboardEvent, departmentItem: IDepartmentItem) => {
        if (event.key === 'Enter') {
            dispatch(updateDepartmentItemThunk({ pathname: location.pathname, departmentItem: departmentItem }));
        }
    };

    const handleClose = (departmentItem: IDepartmentItem) => {
        dispatch(updateDepartmentItemThunk({ pathname: location.pathname, departmentItem: departmentItem }));
    };

    const getTotalQuantity = (departmentItems: IDepartmentItem[]) => {
        return departmentItems.reduce((acc, departmentItem) => acc + departmentItem.quantity, 0);
    };

    const getOrderQuantity = (minimum_quantity: number, maximum_quantity: number, totalQuantity: number) => {
        if (!minimum_quantity || !maximum_quantity) {
            return { orderQuantity: null, color: 'yellow' };
        } else if (minimum_quantity === 1 && maximum_quantity === 1 && totalQuantity < 1) {
            return { orderQuantity: 1, color: 'red' };
        } else if (totalQuantity < minimum_quantity) {
            return { orderQuantity: maximum_quantity - minimum_quantity, color: 'red' };
        } else {
            return { orderQuantity: 0, color: 'green' };
        }
    };

    const getTotalPrice = (average_unit_price: number, totalQuantity: number) => {
        return average_unit_price * totalQuantity;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} component={Paper} elevation={3}>
            <TableContainer sx={{ height: '70vh' }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow sx={{height: 50}}>
                            {columns.length > 0 &&
                                columns.map((column) => (
                                    <StyledTableCell key={column.field} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <Tooltip title={column.tooltipName}>
                                            <Box>{column.headerName}</Box>
                                        </Tooltip>
                                    </StyledTableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {masterDepartmentItemsSelector.response.content.length > 0 &&
                            masterDepartmentItemsSelector.response.content.map((masterDepartmentItem, index) => (
                                <Fragment key={index}>
                                    <StyledTableRow>
                                        <StyledTableCell sx={{ width: 300 }}>{masterDepartmentItem.item}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>{masterDepartmentItem.purchase_unit}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>{masterDepartmentItem.part_number}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>{masterDepartmentItem.recent_cn}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>{masterDepartmentItem.recent_vendor}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>{masterDepartmentItem.drug_class}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 80, backgroundColor: '#BF40BF', textAlign: 'center', color: 'white' }}>
                                            <Typography variant='inherit' sx={{fontWeight: 800}}>{getTotalQuantity(masterDepartmentItem.departmentItems)}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                width: 80,
                                                backgroundColor: getOrderQuantity(
                                                    masterDepartmentItem.minimum_quantity,
                                                    masterDepartmentItem.maximum_quantity,
                                                    getTotalQuantity(masterDepartmentItem.departmentItems)
                                                ).color
                                            }}>
                                            {
                                                getOrderQuantity(masterDepartmentItem.minimum_quantity, masterDepartmentItem.maximum_quantity, getTotalQuantity(masterDepartmentItem.departmentItems))
                                                    .orderQuantity
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>${masterDepartmentItem.average_unit_price}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>
                                            ${getTotalPrice(masterDepartmentItem.average_unit_price, getTotalQuantity(masterDepartmentItem.departmentItems)).toFixed(2)}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ width: 200 }}>{masterDepartmentItem.comment}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>{masterDepartmentItem.category}</StyledTableCell>
                                    </StyledTableRow>
                                    <TableRow>
                                        <TableCell colSpan={1} />
                                        <TableCell colSpan={11}>
                                            <Paper sx={{ margin: 3 }} elevation={1} square>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledSubTableCell>Location</StyledSubTableCell>

                                                            <StyledSubTableCell align="right">Min Qty</StyledSubTableCell>
                                                            <StyledSubTableCell align="right">Max Qty</StyledSubTableCell>
                                                            <StyledSubTableCell align="right">Usage Level</StyledSubTableCell>
                                                            <StyledSubTableCell>Qty</StyledSubTableCell>
                                                            <StyledSubTableCell align="right">Lot #</StyledSubTableCell>
                                                            <StyledSubTableCell align="right">Expiration Date</StyledSubTableCell>
                                                            <StyledSubTableCell align="right">Received Date</StyledSubTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {masterDepartmentItem.departmentItems.map((departmentItem, index) => (
                                                            <TableRow key={index}>
                                                                <StyledSubTableCell>{departmentItem.location}</StyledSubTableCell>
                                                                <StyledSubTableCell align="right">{masterDepartmentItem.minimum_quantity}</StyledSubTableCell>
                                                                <StyledSubTableCell align="right">{masterDepartmentItem.maximum_quantity}</StyledSubTableCell>
                                                                <StyledSubTableCell align="right">{masterDepartmentItem.usage_level}</StyledSubTableCell>
                                                                <StyledSubTableCell align="right" sx={{ width: 80 }}>
                                                                    <TextField
                                                                        ref={inputRef}
                                                                        variant="standard"
                                                                        type="number"
                                                                        name="quantity"
                                                                        sx={{
                                                                            '.MuiInputBase-input': {
                                                                                padding: 0,
                                                                                textAlign: 'right',
                                                                                fontWeight: 900,
                                                                                fontSize: 14
                                                                            }
                                                                        }}
                                                                        size="small"
                                                                        value={departmentItem.quantity === null ? 0 : departmentItem.quantity}
                                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleQuantityChange(event, masterDepartmentItem.id, departmentItem.id)}
                                                                        onKeyDown={(event: KeyboardEvent) => handleEnterKey(event, departmentItem)}
                                                                    />
                                                                </StyledSubTableCell>
                                                                <StyledSubTableCell align="right">
                                                                    <TextField
                                                                        ref={inputRef}
                                                                        size="small"
                                                                        variant="standard"
                                                                        name="lot_number"
                                                                        value={departmentItem.lot_number === null ? '' : departmentItem.lot_number}
                                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleLotNumberChange(event, masterDepartmentItem.id, departmentItem.id)}
                                                                        sx={{
                                                                            '.MuiInputBase-input': {
                                                                                padding: 0,
                                                                                textAlign: 'right',
                                                                                fontSize: 14
                                                                            }
                                                                        }}
                                                                        onKeyDown={(event: KeyboardEvent) => handleEnterKey(event, departmentItem)}
                                                                    />
                                                                </StyledSubTableCell>
                                                                <StyledSubTableCell align="right">
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DateTimePicker
                                                                            value={departmentItem.expiration_date}
                                                                            onChange={(value: Date | null) => handleExpirationDateChange(value, masterDepartmentItem.id, departmentItem.id)}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    variant="standard"
                                                                                    sx={{
                                                                                        '.MuiInputBase-input': {
                                                                                            padding: 0,
                                                                                            fontSize: 14
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            onClose={() => handleClose(departmentItem)}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </StyledSubTableCell>
                                                                <StyledSubTableCell align="right">
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DateTimePicker
                                                                            value={departmentItem.received_date}
                                                                            onChange={(value: Date | null) => handleReceivedDateChange(value, masterDepartmentItem.id, departmentItem.id)}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    variant="standard"
                                                                                    sx={{
                                                                                        '.MuiInputBase-input': {
                                                                                            padding: 0,
                                                                                            fontSize: 14
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            onClose={() => handleClose(departmentItem)}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </StyledSubTableCell>
                                                            </TableRow>
                                                        ))}
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
                page={masterDepartmentItemsSelector.response.number}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
            />
        </Box>
    );
};

export default DepartmentsMaster;
