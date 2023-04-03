import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import { ChangeEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { changeRequestItems, selectRequestItems } from '../app/request/requestItemsSlice';
import { createRequestItemsThunk } from '../app/request/requestItemsCreateSlice';
import { useLocation } from 'react-router-dom';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'item', headerName: 'Item' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'custom_text', headerName: 'Cutom Text' }
];

const RequestItemReviewForm = () => {
    const inputRef = useRef<HTMLDivElement | null>(null);
    const requestItemsSelector = useAppSelector(selectRequestItems);
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleDrawer(''));
    };
    const handleCustomTextChange = (event: ChangeEvent<HTMLInputElement>, request_item_id: number) => {
        dispatch(
            changeRequestItems(
                requestItemsSelector.requestItems.map((item) => ({
                    ...item,
                    custom_text: item.request_item_id === request_item_id ? event.target.value : item.custom_text
                }))
            )
        );
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, request_item_id: number) => {
        dispatch(
            changeRequestItems(
                requestItemsSelector.requestItems.map((item) => ({
                    ...item,
                    quantity: item.request_item_id === request_item_id ? parseInt(event.target.value) : item.quantity
                }))
            )
        );
    };

    const handleSubmit = () => {
        dispatch(
            createRequestItemsThunk({ pathName: location.pathname, requestItems: requestItemsSelector.requestItems })
        );
    };

    return (
        <Stack direction="column" justifyContent="space-between" sx={{ padding: 2, minHeight: 300 }}>
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            {columns.length > 0 &&
                                columns.map((column) => <TableCell key={column.field}>{column.headerName}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requestItemsSelector &&
                            requestItemsSelector.requestItems &&
                            requestItemsSelector.requestItems.length > 0 &&
                            requestItemsSelector.requestItems.map((requestItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>{requestItem.item}</TableCell>
                                    <TableCell>
                                        <TextField
                                            ref={inputRef}
                                            sx={{ maxWidth: 120 }}
                                            type="number"
                                            size="small"
                                            value={requestItem.quantity}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleQuantityChange(event, requestItem.request_item_id)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            ref={inputRef}
                                            sx={{ minWidth: 300 }}
                                            size="small"
                                            value={requestItem.custom_text}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleCustomTextChange(event, requestItem.request_item_id)
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="stretch"
                sx={{ padding: 2, height: '100%' }}>
                <Button onClick={handleSubmit}>SUBMIT </Button>
                <Button onClick={handleClose}>CLOSE </Button>
            </Stack>
        </Stack>
    );
};

export default RequestItemReviewForm;
