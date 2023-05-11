import { Box, Checkbox, Drawer, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, styled, tableCellClasses } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLocation } from 'react-router-dom';
import { IRequestMasterItem } from '../app/requestMaster/requestMasterItemsSlice';
import { changeRequestItemsChecked, selectRequestMasterItemsChecked } from '../app/requestMaster/requestMasterItemsCheckedSlice';
import { selectDrawerToggleType } from '../app/drawerToggle/drawerToggleTypeSlice';
import { drawerToggleType } from '../common/constants';
import RequestItemEditForm from './RequestItemEditForm';
import { getRequestMasterItemsPendingThunk, selectRequestMasterItemsPending } from '../app/requestMaster/requestMasterItemsPendingSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffd740',
        fontSize: 14,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13
    }
}));

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: '', headerName: 'Select' },
    { field: 'item', headerName: 'Item' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'order_quantity', headerName: 'Order Quantity' },
    { field: 'custom_text', headerName: 'Custom Text' },
    { field: 'status', headerName: 'Status' },
    { field: 'detail', headerName: 'Detail' }
];

const RequestMasterDepartmentPending = () => {
    const requestMasterItemsPendingSelector = useAppSelector(selectRequestMasterItemsPending);
    const requestMasterItemsCheckedSelector = useAppSelector(selectRequestMasterItemsChecked);
    const drawerToggleTypeSelector = useAppSelector(selectDrawerToggleType);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);

    const location = useLocation();

    useEffect(() => {
        dispatch(
            getRequestMasterItemsPendingThunk({
                state: location.state,
                page: page
            })
        );
    }, [dispatch, location.pathname, location.state, page]);

    const handleChangePage = (event: any, page: number): void => {
        setPage(page);
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, departmentMasterItem: IRequestMasterItem) => {
        const exists = requestMasterItemsCheckedSelector.requestMasterItemsChecked.filter((item) => item.request_item_id === departmentMasterItem.request_item_id).length > 0;
        if (exists) {
            const newRequestMasterItemsChecked = requestMasterItemsCheckedSelector.requestMasterItemsChecked.filter((item) => item.request_item_id !== departmentMasterItem.request_item_id);
            dispatch(changeRequestItemsChecked(newRequestMasterItemsChecked));
        }
        if (!exists) {
            dispatch(changeRequestItemsChecked([...requestMasterItemsCheckedSelector.requestMasterItemsChecked, departmentMasterItem]));
        }
    };

    return (
        <Box component={Paper} elevation={3}>
            <TableContainer sx={{ height: '65vh' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ height: 50 }}>{columns.length > 0 && columns.map((column) => <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>)}</TableRow>
                    </TableHead>
                    <TableBody>
                        {requestMasterItemsPendingSelector.response.content.length > 0 &&
                            requestMasterItemsPendingSelector.response.content.map((requestMasterItem, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell>
                                        <Checkbox
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(event, requestMasterItem)}
                                            checked={
                                                requestMasterItemsCheckedSelector.requestMasterItemsChecked.find((item) => item.request_item_id === requestMasterItem.request_item_id) !== undefined
                                            }
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{requestMasterItem.item}</StyledTableCell>
                                    <StyledTableCell>{requestMasterItem.recent_cn}</StyledTableCell>
                                    <StyledTableCell>{requestMasterItem.quantity}</StyledTableCell>
                                    <StyledTableCell>{requestMasterItem.custom_text}</StyledTableCell>
                                    <StyledTableCell>{requestMasterItem.status}</StyledTableCell>
                                    <StyledTableCell>{requestMasterItem.detail}</StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{ marginTop: 3 }}
                rowsPerPageOptions={[]}
                component="div"
                count={requestMasterItemsPendingSelector.response.totalElements}
                rowsPerPage={requestMasterItemsPendingSelector.response.size}
                page={requestMasterItemsPendingSelector.response.number}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
            />
            <Drawer anchor="bottom" open={drawerToggleTypeSelector.drawerToggleType === drawerToggleType.UPDATE_REQUEST_EDIT_FORM}>
                <RequestItemEditForm />
            </Drawer>
        </Box>
    );
};

export default RequestMasterDepartmentPending;
