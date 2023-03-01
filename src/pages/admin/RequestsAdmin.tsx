import {
    Checkbox,
    FormControl,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
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
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import {
    changeRequestItems,
    getRequestItemsThunk,
    IRequestItem,
    selectRequestItems
} from '../../app/requests/requestItemsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { statuses } from '../../common/constants';
import { updateRequestItemThunk } from '../../app/requests/requestItemsUpdateSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
    { field: 'item', headerName: 'Item' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'status', headerName: 'Status' },
    { field: 'time_revieved', headerName: 'Received Date' },
    { field: 'time_updated', headerName: 'Updated Date' },
    { field: 'department', headerName: 'Department' },
    { field: 'user', headerName: 'User' },
    { field: 'custom_text', headerName: 'Customer Text' },
    { field: 'location', headerName: 'Location' },
    { field: 'comment', headerName: 'Comment' }
];

const RequestsAdmin = () => {
    const requestsSelector = useAppSelector(selectRequestItems);
    const dispatch = useAppDispatch();
    const [pagination, setPagination] = useState<{ page: number; size: number }>({ page: 0, size: 10 });

    const location = useLocation();

    useEffect(() => {
        dispatch(getRequestItemsThunk({ pathName: location.pathname, page: pagination.page, size: pagination.size }));
    }, [dispatch, location.pathname, pagination.page, pagination.size]);

    const handleChangePage = (event: any, page: number): void => {
        setPagination((prevState) => ({ ...prevState, page: page }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPagination((prevState) => ({ ...prevState, page: 0, size: parseInt(event.target.value) }));
    };

    const handleStatusChange = (event: SelectChangeEvent, requestItem: IRequestItem) => {
        dispatch(
            changeRequestItems(
                requestsSelector.response.content.map((item) => ({
                    ...item,
                    status: item.id === requestItem.id ? event.target.value : item.status
                }))
            )
        );
        dispatch(
            updateRequestItemThunk({
                pathName: location.pathname,
                requestItem: { ...requestItem, status: event.target.value }
            })
        );
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
                        {requestsSelector.response.content.length > 0 &&
                            requestsSelector.response.content.map((requestItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>{requestItem.masterItem && requestItem.masterItem.item}</TableCell>
                                    <TableCell>{requestItem.masterItem && requestItem.masterItem.recent_cn}</TableCell>
                                    <TableCell>{requestItem.order_quantity}</TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <Select
                                                id="demo-simple-select"
                                                value={requestItem.status}
                                                onChange={(event: SelectChangeEvent) =>
                                                    handleStatusChange(event, requestItem)
                                                }>
                                                {statuses.map((status, index) => (
                                                    <MenuItem key={index} value={status}>
                                                        {status}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>{moment(requestItem.time_requested).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>{moment(requestItem.time_updated).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>{requestItem.department}</TableCell>
                                    <TableCell>{requestItem.user}</TableCell>
                                    <TableCell>{requestItem.custom_text}</TableCell>
                                    <TableCell>{requestItem.location}</TableCell>
                                    <TableCell>{requestItem.comment}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{ marginTop: 3 }}
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={requestsSelector.response.totalElements}
                rowsPerPage={requestsSelector.response.size}
                page={requestsSelector.response.number}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={true}
                showLastButton={true}
            />
        </Stack>
    );
};

export default RequestsAdmin;
