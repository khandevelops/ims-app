import {
    Box,
    Checkbox,
    Paper,
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
import { getRequestMasterItemsCompleteThunk, selectRequestMasterItemsComplete } from '../app/requestMasterDepartment/requestMasterItemsCompleteSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
    { field: 'item', headerName: 'Item' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'order_quantity', headerName: 'Order Quantity' },
    { field: 'status', headerName: 'Status' },
    { field: 'time_revieved', headerName: 'Received Date' },
    { field: 'time_updated', headerName: 'Updated Date' },
    { field: 'detail', headerName: 'Detail' }
];

const RequestMasterDepartmentComplete = () => {
    const requestMasterItemsCompleteSelector = useAppSelector(selectRequestMasterItemsComplete);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);

    const location = useLocation();

    useEffect(() => {
        dispatch(
            getRequestMasterItemsCompleteThunk({
                state: location.state,
                page
            })
        );
    }, [dispatch, location.state, page]);

    const handleChangePage = (event: any, page: number): void => {
        setPage(page);
    };

    return (
        <Box sx={{ paddingTop: 3, paddingLeft: 1, paddingRight: 1 }}>
            <Paper elevation={3}>
                <TableContainer sx={{ height: 600 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {columns.length > 0 &&
                                    columns.map((column) => (
                                        <TableCell key={column.field}>{column.headerName}</TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requestMasterItemsCompleteSelector.response.content.length > 0 &&
                                requestMasterItemsCompleteSelector.response.content.map((requestItem, index) => (
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
                    rowsPerPageOptions={[]}
                    component="div"
                    count={requestMasterItemsCompleteSelector.response.totalElements}
                    rowsPerPage={requestMasterItemsCompleteSelector.response.size}
                    page={requestMasterItemsCompleteSelector.response.number}
                    onPageChange={handleChangePage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Paper>
        </Box>
    );
};

export default RequestMasterDepartmentComplete;
