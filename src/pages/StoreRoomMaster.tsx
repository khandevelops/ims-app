import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Box, TextField, styled, tableCellClasses, Tooltip } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { changeStoreRoomMasterItems, getStoreRoomMasterItemsThunk, selectStoreRoomMasterItemsItems } from '../app/storeRoom/storeRoomMasterItemsSlice';
import { IStoreRoomItem, updateStoreRoomUpdateThunk } from '../app/storeRoom/storeRoomUpdateSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffd740',
        fontSize: 14,
        fontWeight: 700,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13
    }
}));

const columns: { field: string; tooltipName: string; headerName: string | JSX.Element }[] = [
    { field: 'item', tooltipName: 'Item', headerName: 'Item' },
    { field: 'purchase_unit', tooltipName: 'Purchase Unit', headerName: 'PU' },
    { field: 'part_number', tooltipName: 'Part Number', headerName: 'PN' },
    { field: 'recent_cn', tooltipName: 'Recent CN', headerName: 'RCN' },
    { field: 'location', tooltipName: 'Location', headerName: 'L' },
    { field: 'total_quantity', tooltipName: 'Total Quantity', headerName: 'TQ' },
    { field: 'usage_level', tooltipName: 'Usage Level', headerName: 'UL' },
    { field: 'min_quantity', tooltipName: 'Min Qty', headerName: 'MinQ' },
    { field: 'max_quantity', tooltipName: 'Max Qty', headerName: 'MaxQ' },
    { field: 'order_quantity', tooltipName: 'Order Qty', headerName: 'OQ' },
    { field: 'unit_price', tooltipName: 'Unit Price', headerName: 'UP' },
    { field: 'issued', tooltipName: 'Issued', headerName: 'Iss' },
    { field: 'received', tooltipName: 'Received', headerName: 'Rec' },
    { field: 'total_price', tooltipName: 'Total Price', headerName: 'TP' },
    { field: 'comments', tooltipName: 'Comment', headerName: 'Comment' }
];

const StoreRoomMaster = () => {
    const storeRoomMasterItemsSelector = useAppSelector(selectStoreRoomMasterItemsItems);
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

    const handleUpdateTotalQty = (store_room_item_id: number, event: React.KeyboardEvent) => {
        let storeRoomItem: IStoreRoomItem = {};
        const storeRoomMasterItem = storeRoomMasterItemsSelector.response && storeRoomMasterItemsSelector.response.content.find((item) => item.store_room_item_id === store_room_item_id);
        if (storeRoomMasterItem) {
            storeRoomItem = {
                quantity: storeRoomMasterItem.total_quantity,
                location: storeRoomMasterItem?.location,
                min_quantity: storeRoomMasterItem?.min_quantity,
                max_quantity: storeRoomMasterItem?.max_quantity,
                usage_level: storeRoomMasterItem?.usage_level
            };
        }

        if (event.key === 'Enter') {
            storeRoomMasterItem && dispatch(updateStoreRoomUpdateThunk({ id: store_room_item_id, storeRoomItem: storeRoomItem }));
        }
    };

    const handleChangeTotalQty = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            changeStoreRoomMasterItems({
                ...storeRoomMasterItemsSelector.response,
                content: storeRoomMasterItemsSelector.response?.content.map((item) => ({
                    ...item,
                    total_quantity: item.store_room_item_id === id ? event.target.value : item.total_quantity
                }))
            })
        );
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} component={Paper} elevation={3}>
            <TableContainer sx={{ height: '70vh' }}>
                <Table stickyHeader size="small">
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
                        {storeRoomMasterItemsSelector.response &&
                            storeRoomMasterItemsSelector.response.content.length > 0 &&
                            storeRoomMasterItemsSelector.response.content.map((storeRoomMasterItem, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell>{storeRoomMasterItem.item}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.purchase_unit}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.part_number}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.recent_cn}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.location}</StyledTableCell>
                                    <StyledTableCell>
                                        <TextField
                                            sx={{ width: 70 }}
                                            size="small"
                                            type="number"
                                            id={storeRoomMasterItem.store_room_item_id.toString()}
                                            value={storeRoomMasterItem.total_quantity}
                                            onKeyDown={(event: React.KeyboardEvent) => handleUpdateTotalQty(storeRoomMasterItem.store_room_item_id, event)}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeTotalQty(storeRoomMasterItem.store_room_item_id, event)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.usage_level}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.min_quantity}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.max_quantity}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.order_quantity}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.unit_price}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.issued}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.received}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.total_price}</StyledTableCell>
                                    <StyledTableCell width={200}>{storeRoomMasterItem.comment}</StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {storeRoomMasterItemsSelector.response && (
                <TablePagination
                    sx={{ marginTop: 3 }}
                    rowsPerPageOptions={[]}
                    component="div"
                    count={storeRoomMasterItemsSelector.response.totalElements}
                    rowsPerPage={storeRoomMasterItemsSelector.response.size}
                    page={storeRoomMasterItemsSelector.response.number}
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
