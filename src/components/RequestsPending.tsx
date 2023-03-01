import {
    Box,
    Checkbox,
    Fab,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Zoom
} from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import {
    changeCheckbox,
    changeRequestItems,
    getRequestPendingItemsThunk,
    IRequestItem,
    selectRequestItems
} from '../app/requests/requestItemsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateRequestItemThunk } from '../app/requests/requestItemsUpdateSlice';
import { useLocation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Navigation';
import { confirmRequestThunk } from '../app/requests/requestItemsCreateConfirmationSlice';
import { changeTab } from '../app/common/requestTabSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
    { field: 'item', headerName: 'Item' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'order_quantity', headerName: 'Order Quantity' },
    { field: 'custom_text', headerName: 'Custom Text' },
    { field: 'status', headerName: 'Status' },
    { field: 'comment', headerName: 'Comment' }
];

const StoreRoomRequestsPending = () => {
    const requestItemsSelector = useAppSelector(selectRequestItems);
    const dispatch = useAppDispatch();
    const [pagination, setPagination] = useState<{ page: number; size: number }>({ page: 0, size: 10 });

    const location = useLocation();

    useEffect(() => {
        dispatch(
            getRequestPendingItemsThunk({ pathName: location.pathname, page: pagination.page, size: pagination.size })
        );
    }, [dispatch, location.pathname, pagination.page, pagination.size]);

    const handleChangePage = (event: any, page: number): void => {
        setPagination((prevState) => ({ ...prevState, page: page }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPagination((prevState) => ({ ...prevState, page: 0, size: parseInt(event.target.value) }));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>, requestItem: IRequestItem) => {
        dispatch(
            changeRequestItems({
                ...requestItemsSelector.response,
                content: requestItemsSelector.response.content.map((item) => ({
                    ...item,
                    order_quantity:
                        event.target.name === 'order_quantity' && item.id === requestItem.id
                            ? Number(event.target.value)
                            : item.order_quantity,
                    custom_text:
                        event.target.name === 'custom_text' && item.id === requestItem.id
                            ? event.target.value
                            : item.custom_text
                }))
            })
        );
    };

    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>, requestItem: IRequestItem) => {
        dispatch(
            changeCheckbox([
                ...requestItemsSelector.response.content.map((item) => ({
                    ...item,
                    checked: requestItem.id === item.id ? event.target.checked : item.checked
                }))
            ])
        );
    };

    const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>, requestItem: IRequestItem) => {
        if (event.key === 'Enter') {
            dispatch(updateRequestItemThunk({ pathName: location.pathname, requestItem: requestItem }));
        }
    };

    const handleSendClick = () => {
        const checkedItems = requestItemsSelector.response.content.filter((item) => item.checked === true);

        if (checkedItems.length > 0) {
            dispatch(confirmRequestThunk({ pathName: location.pathname, requestItems: checkedItems }));
            if (requestItemsSelector.status === 'success') {
                dispatch(
                    changeRequestItems({
                        ...requestItemsSelector.response,
                        content: requestItemsSelector.response.content.filter((item) => item.checked !== true)
                    })
                );
            }
            dispatch(changeTab(2));
        }
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
                        {requestItemsSelector.response.content.length > 0 &&
                            requestItemsSelector.response.content.map((requestItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleCheckbox(event, requestItem)
                                            }
                                            checked={requestItem.checked}
                                        />
                                    </TableCell>
                                    <TableCell>{requestItem.masterItem && requestItem.masterItem.item}</TableCell>
                                    <TableCell>{requestItem.masterItem && requestItem.masterItem.recent_cn}</TableCell>
                                    <TableCell>
                                        <TextField
                                            id="manufacturer"
                                            variant="outlined"
                                            type="number"
                                            size="small"
                                            name="order_quantity"
                                            value={requestItem.order_quantity === 0 ? '' : requestItem.order_quantity}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleChange(event, requestItem)
                                            }
                                            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
                                                handleEnterKey(event, requestItem)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="manufacturer"
                                            variant="outlined"
                                            size="small"
                                            name="custom_text"
                                            value={requestItem.custom_text === null ? '' : requestItem.custom_text}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleChange(event, requestItem)
                                            }
                                            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
                                                handleEnterKey(event, requestItem)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{requestItem.status}</TableCell>
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
                count={requestItemsSelector.response.totalElements}
                rowsPerPage={requestItemsSelector.response.size}
                page={requestItemsSelector.response.number}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={true}
                showLastButton={true}
            />
            <Zoom
                in={
                    requestItemsSelector.response.content.length > 0 &&
                    requestItemsSelector.response.content.filter((item) => item.checked === true).length > 0
                }
                style={{
                    transitionDelay:
                        requestItemsSelector.response.content.length > 0 &&
                        requestItemsSelector.response.content.filter((item) => item.checked === true).length > 0
                            ? '500ms'
                            : '0ms'
                }}>
                <Box>
                    <Fab color="primary" aria-label="add">
                        <SendIcon onClick={handleSendClick} />
                    </Fab>
                </Box>
            </Zoom>
        </Stack>
    );
};

export default StoreRoomRequestsPending;
