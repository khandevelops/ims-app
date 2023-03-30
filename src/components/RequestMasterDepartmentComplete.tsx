import {
    Checkbox,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { getRequestMasterDepartmentItemsThunk, selectRequestMasterDepartmentItems } from '../app/requestMasterDepartment/requestMasterDepartmentItemsSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
    { field: 'item', headerName: 'Item' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'order_quantity', headerName: 'Order Quantity' },
    { field: 'status', headerName: 'Status' },
    { field: 'time_revieved', headerName: 'Received Date' },
    { field: 'time_updated', headerName: 'Updated Date' },
    { field: 'comment', headerName: 'Comment' }
];

const StoreRoomRequestComplete = () => {
    const requestMasterDepartmentItemsSelector = useAppSelector(selectRequestMasterDepartmentItems);
    const dispatch = useAppDispatch();
    const [pagination, setPagination] = useState<{ page: number; size: number }>({ page: 0, size: 10 });

    const location = useLocation();

    useEffect(() => {
        dispatch(
            getRequestMasterDepartmentItemsThunk({
                pathName: location.pathname,
                page: pagination.page
            })
        );
    }, [dispatch, location.pathname, pagination.page]);

    const handleChangePage = (event: any, page: number): void => {
        setPagination((prevState) => ({ ...prevState, page: page }));
    };

    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            sx={{ padding: 2, height: '100%' }}>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.length > 0 &&
                                columns.map((column) => <TableCell key={column.field}>{column.headerName}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requestMasterDepartmentItemsSelector.response.content.length > 0 &&
                            requestMasterDepartmentItemsSelector.response.content.map((requestItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>{requestItem && requestItem.item}</TableCell>
                                    <TableCell>{requestItem && requestItem.recent_cn}</TableCell>
                                    <TableCell>{requestItem.quantity}</TableCell>
                                    <TableCell>{requestItem.status}</TableCell>
                                    <TableCell>{moment(requestItem.time_requested).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>{moment(requestItem.time_updated).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>{requestItem.detail}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{ marginTop: 3 }}
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={requestMasterDepartmentItemsSelector.response.totalElements}
                rowsPerPage={requestMasterDepartmentItemsSelector.response.size}
                page={requestMasterDepartmentItemsSelector.response.number}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
            />
        </Stack>
    );
};

export default StoreRoomRequestComplete;
