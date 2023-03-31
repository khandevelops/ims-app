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
    getRequestMasterDepartmentItemsThunk,
    IRequestMasterDepartmentItem,
    selectRequestMasterDepartmentItems,
} from '../app/requestMasterDepartment/requestMasterDepartmentItemsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLocation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Navigation';
import { changeTab } from '../app/common/requestTabSlice';
import { updateRequestItemsThunk } from '../app/requestMasterDepartment/requestMasterDepartmentCreateItemConfirmationSlice';

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
    }, [dispatch, location.pathname, pagination.page, pagination.size]);

    const handleChangePage = (event: any, page: number): void => {
        setPagination((prevState) => ({ ...prevState, page: page }));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>, requestItem: IRequestMasterDepartmentItem) => {
        // dispatch(
        //     changeRequestItems({
        //         ...requestMasterDepartmentItemsSelector.response,
        //         content: requestMasterDepartmentItemsSelector.response.content.map((item) => ({
        //             ...item,
        //             order_quantity:
        //                 event.target.name === 'order_quantity' && item.request_item_id === requestItem.request_item_id
        //                     ? Number(event.target.value)
        //                     : item.quantity,
        //             custom_text:
        //                 event.target.name === 'custom_text' && item.request_item_id === requestItem.request_item_id
        //                     ? event.target.value
        //                     : item.custom_text
        //         }))
        //     })
        // );
    };

    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>, requestItem: IRequestMasterDepartmentItem) => {
        // dispatch(
        //     changeCheckbox([
        //         ...requestMasterDepartmentItemsSelector.response.content.map((item) => ({
        //             ...item,
        //             checked: requestItem.request_item_id === item.request_item_id ? event.target.checked : item.checked
        //         }))
        //     ])
        // );
    };

    const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>, requestItem: IRequestMasterDepartmentItem) => {
        // if (event.key === 'Enter') {
        //     dispatch(updateRequestItemsThunk({ pathName: location.pathname, requestItems: requestItem[] }));
        // }
    };

    const handleSendClick = () => {
        // const checkedItems = requestMasterDepartmentItemsSelector.response.content.filter((item) => item.checked === true);

        // if (checkedItems.length > 0) {
        //     dispatch(confirmRequestMakeItemsThunk({ pathName: location.pathname, requestItems: checkedItems }));
        //     if (requestMasterDepartmentItemsSelector.status === 'success') {
        //         dispatch(
        //             changeRequestItems({
        //                 ...requestMasterDepartmentItemsSelector.response,
        //                 content: requestMasterDepartmentItemsSelector.response.content.filter((item) => item.checked !== true)
        //             })
        //         );
        //     }
        //     dispatch(changeTab(2));
        // }
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
                                        <Checkbox
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleCheckbox(event, requestItem)
                                            }
                                            checked={requestItem.checked}
                                        />
                                    </TableCell>
                                    <TableCell>{requestItem && requestItem.item}</TableCell>
                                    <TableCell>{requestItem && requestItem.recent_cn}</TableCell>
                                    <TableCell>
                                        <TextField
                                            id="manufacturer"
                                            variant="outlined"
                                            type="number"
                                            size="small"
                                            name="order_quantity"
                                            value={requestItem.quantity === 0 ? '' : requestItem.quantity}
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
            <Zoom
                in={
                    requestMasterDepartmentItemsSelector.response.content.length > 0 &&
                    requestMasterDepartmentItemsSelector.response.content.filter((item) => item.checked === true).length > 0
                }
                style={{
                    transitionDelay:
                    requestMasterDepartmentItemsSelector.response.content.length > 0 &&
                    requestMasterDepartmentItemsSelector.response.content.filter((item) => item.checked === true).length > 0
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
