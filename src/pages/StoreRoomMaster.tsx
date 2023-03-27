import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';

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
    TextField,
    styled,
    tableCellClasses
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
    changeStoreRoomMasterItems,
    getStoreRoomMasterItemsThunk,
    selectStoreRoomMasterItemsItems
} from '../app/storeRoom/storeRoomMasterItemsSlice';
import {
    IStoreRoomItem,
    updateStoreRoomUpdateThunk
} from '../app/storeRoom/storeRoomUpdateSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'WhiteSmoke',
        fontSize: 13,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12
    }
}));

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'item', headerName: 'Item' },
    { field: 'purchase_unit', headerName: 'Purchase Unit' },
    { field: 'part_number', headerName: 'Part #' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'location', headerName: 'Location' },
    { field: 'total_quantity', headerName: 'Total Qty' },
    { field: 'usage_level', headerName: 'Usage Level' },
    { field: 'min_quantity', headerName: 'Min Qty' },
    { field: 'max_quantity', headerName: 'Max Qty' },
    { field: 'order_quantity', headerName: 'Order Qty' },
    { field: 'unit_price', headerName: 'Unit Price' },
    { field: 'issued', headerName: 'Issued' },
    { field: 'received', headerName: 'Received' },
    { field: 'total_price', headerName: 'Total Price' },
    { field: 'comments', headerName: 'Comment' }
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
        const storeRoomMasterItem =
            storeRoomMasterItemsSelector.response &&
            storeRoomMasterItemsSelector.response.content.find(
                (item) => item.store_room_item_id === store_room_item_id
            );
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
            storeRoomMasterItem &&
                dispatch(updateStoreRoomUpdateThunk({ id: store_room_item_id, storeRoomItem: storeRoomItem }));
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
        <Box sx={{ paddingTop: 3, paddingLeft: 1, paddingRight: 1 }}>
            <Paper elevation={3}>
                <TableContainer sx={{ height: 750 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {columns.length > 0 &&
                                    columns.map((column) => (
                                        <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>
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
                                                onKeyDown={(event: React.KeyboardEvent) =>
                                                    handleUpdateTotalQty(storeRoomMasterItem.store_room_item_id, event)
                                                }
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                    handleChangeTotalQty(storeRoomMasterItem.store_room_item_id, event)
                                                }
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
                                        <StyledTableCell>{storeRoomMasterItem.comments}</StyledTableCell>
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
            </Paper>
        </Box>
    );
};

export default StoreRoomMaster;
