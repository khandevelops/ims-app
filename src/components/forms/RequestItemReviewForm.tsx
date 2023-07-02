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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleDrawer } from '../../app/slice/drawerToggle/drawerToggleTypeSlice';
import { useLocation } from 'react-router-dom';
import { createRequestMasterItemsThunk } from '../../app/requestMaster/requestMasterItemsCreateSlice';
import {
    changeRequestItemsChecked,
    selectRequestMasterItemsChecked
} from '../../app/requestMaster/requestMasterItemsCheckedSlice';
import { CONFIRMATION } from '../../common/constants';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'item', headerName: 'Item' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'custom_text', headerName: 'Cutom Text' }
];

const RequestItemReviewForm = () => {
    const inputRef = useRef<HTMLDivElement | null>(null);
    const requestMasterItemsCheckedSelector = useAppSelector(selectRequestMasterItemsChecked);
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleDrawer({ type: '' }));
    };
    const handleCustomTextChange = (event: ChangeEvent<HTMLInputElement>, request_item_id: number) => {
        dispatch(
            changeRequestItemsChecked(
                requestMasterItemsCheckedSelector.requestMasterItemsChecked.map((item) => ({
                    ...item,
                    custom_text: item.request_item_id === request_item_id ? event.target.value : item.custom_text
                }))
            )
        );
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, request_item_id: number) => {
        dispatch(
            changeRequestItemsChecked(
                requestMasterItemsCheckedSelector.requestMasterItemsChecked.map((item) => ({
                    ...item,
                    quantity: item.request_item_id === request_item_id ? parseInt(event.target.value) : item.quantity
                }))
            )
        );
    };

    const handleSubmit = () => {
        dispatch(
            createRequestMasterItemsThunk({
                state: location.state,
                requestMasterItems: requestMasterItemsCheckedSelector.requestMasterItemsChecked.map((item) => ({
                    quantity: item.quantity,
                    department: 'EXTRACTIONS',
                    user: 'Batsaikhan Ulambayar',
                    detail: 'detail',
                    confirmation: CONFIRMATION.WAITING,
                    custom_text: 'custom text',
                    location: 'store room',
                    request_item_id: item.request_item_id,
                    master_item_id: item.master_item_id,
                    item: item.item
                }))
            })
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
                        {requestMasterItemsCheckedSelector &&
                            requestMasterItemsCheckedSelector.requestMasterItemsChecked &&
                            requestMasterItemsCheckedSelector.requestMasterItemsChecked.length > 0 &&
                            requestMasterItemsCheckedSelector.requestMasterItemsChecked.map(
                                (requestMasterCheckedItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{requestMasterCheckedItem.item}</TableCell>
                                        <TableCell>
                                            <TextField
                                                ref={inputRef}
                                                sx={{ maxWidth: 120 }}
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0 }
                                                }}
                                                size="small"
                                                value={requestMasterCheckedItem.quantity}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                    handleQuantityChange(
                                                        event,
                                                        requestMasterCheckedItem.request_item_id
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                ref={inputRef}
                                                sx={{ minWidth: 300 }}
                                                size="small"
                                                value={requestMasterCheckedItem.custom_text}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                    handleCustomTextChange(
                                                        event,
                                                        requestMasterCheckedItem.request_item_id
                                                    )
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="stretch"
                sx={{ padding: 2, height: '100%' }}
            >
                <Button onClick={handleSubmit}>SUBMIT </Button>
                <Button onClick={handleClose}>CLOSE </Button>
            </Stack>
        </Stack>
    );
};

export default RequestItemReviewForm;
