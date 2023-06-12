import React, { useState } from 'react';
import { useEffect, MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Box, TextField, styled, tableCellClasses, Tooltip, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { changeStoreRoomMasterItems, getStoreRoomMasterItemsThunk, selectStoreRoomMasterItemsItems } from '../app/storeRoom/storeRoomMasterItemsSlice';
import { IStoreRoomItem, updateStoreRoomUpdateThunk } from '../app/storeRoom/storeRoomUpdateSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DRAWER_TOGGLE_TYPE } from '../common/constants';
import { toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { IDepartmentItem } from '../app/department/departmentItemsSlice';
import { selectDepartmentMasterItems } from '../app/slice/departmentMaster/departmentMasterItemsSlice';
import { IDepartment, IDepartmentMaster } from '../app/properties/IDepartment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffd740',
        fontSize: 12,
        fontWeight: 700,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12
    }
}));

const columns: { field: string; tooltipName: string; headerName: string | JSX.Element; align: 'left' | 'center' | 'right' }[] = [
    { field: 'item', tooltipName: 'Item', headerName: 'Item', align: 'left' },
    { field: 'purchase_unit', tooltipName: 'Purchase Unit', headerName: 'PU', align: 'left' },
    { field: 'part_number', tooltipName: 'Part Number', headerName: 'PN', align: 'left' },
    { field: 'recent_cn', tooltipName: 'Recent CN', headerName: 'RCN', align: 'left' },
    { field: 'location', tooltipName: 'Location', headerName: 'L', align: 'left' },
    { field: 'total_quantity', tooltipName: 'Total Quantity', headerName: 'TQ', align: 'left' },
    { field: 'usage_level', tooltipName: 'Usage Level', headerName: 'UL', align: 'left' },
    { field: 'minimum_quantity', tooltipName: 'Min Qty', headerName: 'MinQ', align: 'left' },
    { field: 'maximum_quantity', tooltipName: 'Max Qty', headerName: 'MaxQ', align: 'left' },
    { field: 'order_quantity', tooltipName: 'Order Qty', headerName: 'OQ', align: 'left' },
    { field: 'unit_price', tooltipName: 'Unit Price', headerName: 'UP', align: 'left' },
    { field: 'issued', tooltipName: 'Issued', headerName: 'Iss', align: 'left' },
    { field: 'received', tooltipName: 'Received', headerName: 'Rec', align: 'left' },
    { field: 'total_price', tooltipName: 'Total Price', headerName: 'TP', align: 'left' },
    { field: 'comments', tooltipName: 'Comment', headerName: 'Comment', align: 'left' },
    { field: 'edit', tooltipName: 'Edit', headerName: 'Edit', align: 'center' },
    { field: 'delete', tooltipName: 'Delete', headerName: 'Delete', align: 'center' }
];

const StoreRoomMaster = () => {
    const departmentMasterItemsSelector = useAppSelector(selectDepartmentMasterItems);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<{ page: number }>({ page: 0 });
    const location = useLocation();

    useEffect(() => {
        dispatch(getStoreRoomMasterItemsThunk(page.page));
    }, [dispatch, location.pathname, page]);

    const handleChangePage = (event: any, newPage: number): void => {
        setPage({ ...page, page: newPage });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPage({ ...page, page: 0 });
    };

    const handleUpdateTotalQty = (id: number, event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            dispatch(
                updateStoreRoomUpdateThunk({
                    id: id,
                    storeRoomItem: { quantity: departmentMasterItemsSelector.response?.content.find((item) => item.id === id)?.quantity }
                })
            );
        }
    };

    const handleChangeTotalQty = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            changeStoreRoomMasterItems({
                ...departmentMasterItemsSelector.response,
                content: departmentMasterItemsSelector.response?.content.map((item) => ({
                    ...item,
                    total_quantity: item.id === id ? event.target.value : item.quantity
                }))
            })
        );
    };

    const getTotalPrice = (unit_price: number, quantity: number) => {
        return unit_price * quantity;
    };

    const handleEditClick = (event: MouseEvent<HTMLElement>, departmentMasterItem: IDepartmentMaster) => {
        if (departmentMasterItem) {
            dispatch(
                toggleDrawer({
                    type: DRAWER_TOGGLE_TYPE.UPDATE_DEPARTMENT_ITEM,
                    departmentItem: {
                        id: departmentMasterItem.id,
                        location: departmentMasterItem.location,
                        quantity: departmentMasterItem.quantity,
                        lot_number: departmentMasterItem.lot_number,
                        usage_level: departmentMasterItem.usage_level,
                        minimum_quantity: departmentMasterItem.minimum_quantity,
                        maximum_quantity: departmentMasterItem.maximum_quantity,
                        expiration_date: departmentMasterItem.expiration_date,
                        received_date: departmentMasterItem.received_date
                    }
                })
            );
        }
    };

    const handleDeleteClick = (event: MouseEvent<HTMLElement>, storeRoomMasterItem: IStoreRoomItem) => {};

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} component={Paper} elevation={3}>
            <TableContainer sx={{ height: '70vh' }}>
                <Table stickyHeader size="small">
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
                        {departmentMasterItemsSelector.response &&
                            departmentMasterItemsSelector.response.content.length > 0 &&
                            departmentMasterItemsSelector.response.content.map((departmentMasterItem, index) => (
                                <TableRow key={index} hover>
                                    <StyledTableCell>{departmentMasterItem.masterItem.item}</StyledTableCell>
                                    <StyledTableCell>{departmentMasterItem.masterItem.purchase_unit}</StyledTableCell>
                                    <StyledTableCell>{departmentMasterItem.masterItem.part_number}</StyledTableCell>
                                    <StyledTableCell>{departmentMasterItem.masterItem.recent_cn}</StyledTableCell>
                                    <StyledTableCell>{departmentMasterItem.location}</StyledTableCell>
                                    <StyledTableCell>
                                        <TextField
                                            sx={{ width: 70 }}
                                            size="small"
                                            InputProps={{
                                                inputProps: { min: 0 }
                                            }}
                                            id={departmentMasterItem.id?.toString()}
                                            value={departmentMasterItem.quantity}
                                            onKeyDown={(event: KeyboardEvent) => handleUpdateTotalQty(departmentMasterItem.id, event)}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeTotalQty(departmentMasterItem.id, event)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{departmentMasterItem.usage_level}</StyledTableCell>
                                    <StyledTableCell>{departmentMasterItem.minimum_quantity}</StyledTableCell>
                                    <StyledTableCell>{departmentMasterItem.maximum_quantity}</StyledTableCell>
                                    <StyledTableCell>order quantity</StyledTableCell>
                                    <StyledTableCell>${departmentMasterItem.masterItem.unit_price}</StyledTableCell>
                                    <StyledTableCell>issued</StyledTableCell>
                                    <StyledTableCell>received</StyledTableCell>
                                    <StyledTableCell>{getTotalPrice(departmentMasterItem.masterItem.unit_price, departmentMasterItem.quantity)}</StyledTableCell>
                                    <StyledTableCell width={200}>{departmentMasterItem.masterItem.comment}</StyledTableCell>
                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <IconButton onClick={(event: MouseEvent<HTMLElement>) => handleEditClick(event, departmentMasterItem)}>
                                                <ModeEditIcon color="primary" fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <IconButton onClick={(event: MouseEvent<HTMLElement>) => handleDeleteClick(event, departmentMasterItem)}>
                                                <DeleteIcon color="primary" fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {departmentMasterItemsSelector.response && (
                <TablePagination
                    sx={{ marginTop: 3 }}
                    rowsPerPageOptions={[]}
                    component="div"
                    count={departmentMasterItemsSelector.response.totalElements}
                    rowsPerPage={departmentMasterItemsSelector.response.size}
                    page={departmentMasterItemsSelector.response.number}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            )}
        </Box>
    );
};

export default StoreRoomMaster;
