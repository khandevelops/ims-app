import { Box, Checkbox, Drawer, Fab, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Zoom, styled, tableCellClasses } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { IRequestMasterItem, getRequestMasterItemsThunk, selectRequestMasterItems } from '../app/requestMaster/requestMasterItemsSlice';
import { changeRequestItemsChecked, selectRequestMasterItemsChecked } from '../app/requestMaster/requestMasterItemsCheckedSlice';
import { selectDrawerToggleType } from '../app/drawerToggle/drawerToggleTypeSlice';
import { drawerToggleType } from '../common/constants';
import RequestItemReviewForm from './RequestItemReviewForm';

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
    { field: 'purchase_unit', headerName: 'Purchase Unit' },
    { field: 'part_number', headerName: 'Part Number' },
    { field: 'comment', headerName: 'Comment' }
];

const RequestMasterDepartmentItems = () => {
    const requestMasterItemsSelector = useAppSelector(selectRequestMasterItems);
    const requestMasterItemsCheckedSelector = useAppSelector(selectRequestMasterItemsChecked);
    const drawerToggleTypeSelector = useAppSelector(selectDrawerToggleType);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);
    const location = useLocation();

    useEffect(() => {
        dispatch(getRequestMasterItemsThunk({ state: location.state, page: page }));
    }, [dispatch, location.pathname, location.state, page, useAppSelector]);

    const handleChangePage = (event: any, page: number): void => {
        setPage(page);
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, departmentMasterItem: IRequestMasterItem) => {
        const exists = requestMasterItemsCheckedSelector.requestMasterItemsChecked.some((item) => item.request_item_id === departmentMasterItem.request_item_id);
        if (exists) {
            dispatch(changeRequestItemsChecked(requestMasterItemsCheckedSelector.requestMasterItemsChecked.filter((item) => item.request_item_id !== departmentMasterItem.request_item_id)));
        }
        if (!exists) {
            dispatch(changeRequestItemsChecked([...requestMasterItemsCheckedSelector.requestMasterItemsChecked, departmentMasterItem]));
        }
        console.log(requestMasterItemsCheckedSelector.requestMasterItemsChecked);
    };

    return (
        <Box component={Paper} elevation={3}>
            <TableContainer sx={{ height: '60vh' }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow sx={{ height: 50 }}>{columns.length > 0 && columns.map((column) => <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>)}</TableRow>
                    </TableHead>
                    <TableBody>
                        {requestMasterItemsSelector.response.content.length > 0 &&
                            requestMasterItemsSelector.response.content.map((requestMasterItem, index) => (
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
                                    <StyledTableCell>{requestMasterItem.purchase_unit}</StyledTableCell>
                                    <StyledTableCell>{requestMasterItem.part_number}</StyledTableCell>
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
                count={requestMasterItemsSelector.response.totalElements}
                rowsPerPage={requestMasterItemsSelector.response.size}
                page={requestMasterItemsSelector.response.number}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
            />
            <Drawer anchor="bottom" open={drawerToggleTypeSelector.drawerToggleType === drawerToggleType.UPDATE_REQUEST_REVIEW_FORM}>
                <RequestItemReviewForm />
            </Drawer>
        </Box>
    );
};

export default RequestMasterDepartmentItems;
