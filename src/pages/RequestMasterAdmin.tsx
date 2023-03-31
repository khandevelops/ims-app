import {
    Box,
    FormControl,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { statuses } from '../common/constants';
import {
    getRequestMasterItemsThunk,
    IRequestMasterAdminItem,
    selectRequestMasterItems
} from '../app/requestAdminMaster/requestMasterAdminItemsSlice';
import { changeRequestItems } from '../app/requestMasterDepartment/requestMasterDepartmentItemsSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'WhiteSmoke',
        fontSize: 13,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12
    }
}));

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'item', headerName: 'Item' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'status', headerName: 'Status' },
    { field: 'time_revieved', headerName: 'Received Date' },
    { field: 'time_updated', headerName: 'Updated Date' },
    { field: 'department', headerName: 'Department' },
    { field: 'custom_text', headerName: 'Customer Text' },
    { field: 'comment', headerName: 'Comment' }
];

const RequestMasterAdmin = () => {
    const requestMasterItemsSelector = useAppSelector(selectRequestMasterItems);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);

    const location = useLocation();

    useEffect(() => {
        dispatch(getRequestMasterItemsThunk({ pathName: location.pathname, page: page }));
    }, [dispatch, location.pathname, page]);

    const handleChangePage = (event: any, page: number): void => {
        setPage(page);
    };

    const handleStatusChange = (event: SelectChangeEvent, requestItem: IRequestMasterAdminItem) => {
        dispatch(
            changeRequestItems(
                requestMasterItemsSelector.response.content.map((item) => ({
                    ...item,
                    status: item.request_item_id === requestItem.request_item_id ? event.target.value : item.status
                }))
            )
        );
        // dispatch(
        //     updateRequestMakeItemThunk({
        //         pathName: location.pathname,
        //         requestItem: { ...requestItem, status: event.target.value }
        //     })
        // );
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
                                        <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requestMasterItemsSelector.response.content.length > 0 &&
                                requestMasterItemsSelector.response.content.map((requestItem, index) => (
                                    <TableRow key={index}>
                                        <StyledTableCell>{requestItem.item && requestItem.item}</StyledTableCell>
                                        <StyledTableCell>
                                            {requestItem.recent_cn && requestItem.recent_cn}
                                        </StyledTableCell>
                                        <StyledTableCell>{requestItem.quantity}</StyledTableCell>
                                        <StyledTableCell>
                                            <FormControl fullWidth>
                                                <Select
                                                    size="small"
                                                    id={requestItem.item}
                                                    value={requestItem.status}
                                                    onChange={(event: SelectChangeEvent) =>
                                                        handleStatusChange(event, requestItem)
                                                    }>
                                                    {statuses.map((status, index) => (
                                                        <MenuItem key={index} value={status}>
                                                            <Typography sx={{ fontSize: '10pt' }}>{status}</Typography>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {moment(requestItem.time_requested).format('MM/DD/YYYY')}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {moment(requestItem.time_updated).format('MM/DD/YYYY')}
                                        </StyledTableCell>
                                        <StyledTableCell>{requestItem.department}</StyledTableCell>
                                        <StyledTableCell>{requestItem.custom_text}</StyledTableCell>
                                        <StyledTableCell>{requestItem.comment}</StyledTableCell>
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
            </Paper>
        </Box>
    );
};

export default RequestMasterAdmin;
