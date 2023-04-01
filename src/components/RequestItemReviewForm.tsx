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
import { useRef } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectRequestMasterItemsChecked } from '../app/requestMaster/requestMasterItemsChecked';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'item', headerName: 'Item' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'custom_text', headerName: 'Cutom Text' }
];

const RequestItemReviewForm = () => {
    const inputRef = useRef<HTMLDivElement | null>(null);
    const requestMasterItemsCheckedSelector = useAppSelector(selectRequestMasterItemsChecked);
    const dispatch = useDispatch();

    const handleSubmit = () => {};

    const handleClose = () => {
        dispatch(toggleDrawer(''))
    };
    const handleCustomText = () => {};
    const handleQuantityChange = () => {};

    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            sx={{ padding: 2, minHeight: 300 }}>
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
                            requestMasterItemsCheckedSelector.requestMasterItemsChecked.map((requestCheckedItems, index) => (
                                <TableRow key={index}>
                                    <TableCell>{requestCheckedItems.item}</TableCell>
                                    <TableCell>
                                        <TextField
                                            ref={inputRef}
                                            sx={{ maxWidth: 120 }}
                                            type="number"
                                            size="small"
                                            name={requestCheckedItems.request_item_id.toString()}
                                            id={requestCheckedItems.request_item_id.toString()}
                                            onChange={handleQuantityChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            ref={inputRef}
                                            sx={{ maxWidth: 120 }}
                                            type="number"
                                            size="small"
                                            name={requestCheckedItems.request_item_id.toString()}
                                            id={requestCheckedItems.request_item_id.toString()}
                                            onChange={handleCustomText}
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
