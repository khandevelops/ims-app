import { ChangeEvent, Fragment, useRef, KeyboardEvent } from 'react';
import { useEffect, MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Box, tableCellClasses, styled, TextField, Tooltip, Typography, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { handlePage, selectPage } from '../app/common/pageSlice';
import { changeMasterDepartmentItems, getMasterDepartmentItemsThunk, selectMasterDepartmentItems } from '../app/masterDepartment/masterDepartmentItemsSlice';
import { IDepartmentItem } from '../app/department/departmentItemsSlice';
import { updateDepartmentItemThunk } from '../app/department/departmentItemUpdateSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const columns: { field: string; tooltipName: string | JSX.Element; headerName: string; align: 'left' | 'center' | 'right' }[] = [
    { field: 'item', tooltipName: 'Item', headerName: 'Item', align: 'left' },
    { field: 'purchase_unit', tooltipName: 'Purchase Unit', headerName: 'PU', align: 'left' },
    { field: 'part_number', tooltipName: 'Part Number', headerName: 'PN', align: 'left' },
    { field: 'recent_cn', tooltipName: 'Recent CN', headerName: 'RCN', align: 'left' },
    { field: 'recent_vendor', tooltipName: 'Recent Vendor', headerName: 'RV', align: 'left' },
    { field: 'drug_class', tooltipName: 'Drug Class', headerName: 'DC', align: 'left' },
    { field: 'total_quantity', tooltipName: 'Total Qty', headerName: 'TQ', align: 'left' },
    { field: 'order_quantity', tooltipName: 'Order Qty', headerName: 'OQ', align: 'left' },
    { field: 'unit_price', tooltipName: 'Unit Price', headerName: 'UP', align: 'left' },
    { field: 'total_price', tooltipName: 'Total Price', headerName: 'TP', align: 'left' },
    { field: 'comment', tooltipName: 'Comment', headerName: 'Comment', align: 'left' },
    { field: 'category', tooltipName: 'Category', headerName: 'C', align: 'left' },
    { field: 'more', tooltipName: 'Action', headerName: 'Action', align: 'center' }
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

    const getTotalPrice = (unit_price: number, totalQuantity: number) => {
        return unit_price * totalQuantity;
    };

    const handleMoreClick = (event: MouseEvent<HTMLElement>) => {
        // dispatch(toggleDrawer(drawerToggleType.UPDATE_MASTER_ITEM_FORM));
        // dispatch(populateMasterItem(masterItem));
    };

    const handleAssignClick = (event: MouseEvent<HTMLElement>) => {
        // setMasterItemId(masterItemId);
        // setAnchorElUser(event.currentTarget);
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
                                        <StyledTableCell sx={{ width: 400 }}>{masterDepartmentItem.item}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 120 }}>{masterDepartmentItem.purchase_unit}</StyledTableCell>
                                        <StyledTableCell>{masterDepartmentItem.part_number}</StyledTableCell>
                                        <StyledTableCell>{masterDepartmentItem.recent_cn}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 200 }}>{masterDepartmentItem.recent_vendor}</StyledTableCell>
                                        <StyledTableCell>{masterDepartmentItem.drug_class}</StyledTableCell>
                                        <StyledTableCell sx={{ textAlign: 'center' }}>
                                            <Typography variant="inherit" sx={{ fontWeight: 900 }}>
                                                {getTotalQuantity(masterDepartmentItem.departmentItems)}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
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
                                        <StyledTableCell>${masterDepartmentItem.unit_price}</StyledTableCell>
                                        <StyledTableCell>${getTotalPrice(masterDepartmentItem.unit_price, getTotalQuantity(masterDepartmentItem.departmentItems)).toFixed(2)}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 200 }}>{masterDepartmentItem.comment}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 80 }}>{masterDepartmentItem.category}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 40 }}>
                                            <Box sx={{ display: 'flex' }}>
                                                <IconButton onClick={(event: MouseEvent<HTMLElement>) => handleMoreClick(event)}>
                                                    <ModeEditIcon color="primary" fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={(event: MouseEvent<HTMLElement>) => handleAssignClick(event)}>
                                                    <AddCircleOutlineIcon color="primary" fontSize="small" />
                                                </IconButton>
                                            </Box>
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

                                                            <StyledSubTableCell align="left">Min Qty</StyledSubTableCell>
                                                            <StyledSubTableCell align="left">Max Qty</StyledSubTableCell>
                                                            <StyledSubTableCell align="left">Usage Level</StyledSubTableCell>
                                                            <StyledSubTableCell>Qty</StyledSubTableCell>
                                                            <StyledSubTableCell align="left">Lot #</StyledSubTableCell>
                                                            <StyledSubTableCell align="left">Expiration Date</StyledSubTableCell>
                                                            <StyledSubTableCell align="left">Received Date</StyledSubTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {masterDepartmentItem.departmentItems.map((departmentItem, index) => (
                                                            <TableRow key={index} hover>
                                                                <StyledSubTableCell>{departmentItem.location}</StyledSubTableCell>
                                                                <StyledSubTableCell align="left">{departmentItem.minimum_quantity}</StyledSubTableCell>
                                                                <StyledSubTableCell align="left">{departmentItem.maximum_quantity}</StyledSubTableCell>
                                                                <StyledSubTableCell align="left">{departmentItem.usage_level}</StyledSubTableCell>
                                                                <StyledSubTableCell align="left" sx={{ width: 100 }}>
                                                                    <TextField
                                                                        ref={inputRef}
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
                                                                        value={departmentItem.quantity === null ? 0 : departmentItem.quantity}
                                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleQuantityChange(event, masterDepartmentItem.id, departmentItem.id)}
                                                                        onKeyDown={(event: KeyboardEvent) => handleEnterKey(event, departmentItem)}
                                                                    />
                                                                </StyledSubTableCell>
                                                                <StyledSubTableCell align="left">
                                                                    <TextField
                                                                        ref={inputRef}
                                                                        size="small"
                                                                        name="lot_number"
                                                                        value={departmentItem.lot_number === null ? '' : departmentItem.lot_number}
                                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleLotNumberChange(event, masterDepartmentItem.id, departmentItem.id)}
                                                                        sx={{
                                                                            '.MuiInputBase-input': {
                                                                                padding: 1,
                                                                                fontSize: 14
                                                                            }
                                                                        }}
                                                                        onKeyDown={(event: KeyboardEvent) => handleEnterKey(event, departmentItem)}
                                                                    />
                                                                </StyledSubTableCell>
                                                                <StyledSubTableCell align="left">
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DateTimePicker
                                                                            value={departmentItem.expiration_date}
                                                                            onChange={(value: Date | null) => handleExpirationDateChange(value, masterDepartmentItem.id, departmentItem.id)}
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
                                                                            onClose={() => handleClose(departmentItem)}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </StyledSubTableCell>
                                                                <StyledSubTableCell align="left">
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DateTimePicker
                                                                            value={departmentItem.received_date}
                                                                            onChange={(value: Date | null) => handleReceivedDateChange(value, masterDepartmentItem.id, departmentItem.id)}
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
