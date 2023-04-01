import {
    Box,
    Checkbox,
    Drawer,
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
    Zoom
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {
    IRequestMasterItem,
    getRequestMasterItemsThunk,
    selectRequestMasterItems
} from '../app/requestMaster/requestMasterItems';
import {
    addRequestItemsChecked,
    selectRequestMasterItemsChecked
} from '../app/requestMaster/requestMasterItemsChecked';
import { selectDrawerToggleType } from '../app/drawerToggle/drawerToggleTypeSlice';
import { drawerToggleType } from '../common/constants';
import RequestItemReviewForm from './RequestItemReviewForm';

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
        dispatch(getRequestMasterItemsThunk({ pathName: location.pathname, page: page }));
    }, [dispatch, location.pathname, page]);

    const handleChangePage = (event: any, page: number): void => {
        setPage(page);
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, departmentMasterItem: IRequestMasterItem) => {
        const exists =
            requestMasterItemsCheckedSelector.requestMasterItemsChecked.filter(
                (item) => item.request_item_id === departmentMasterItem.request_item_id
            ).length > 0;
        if (exists) {
            const newRequestMasterItemsChecked = requestMasterItemsCheckedSelector.requestMasterItemsChecked.filter(
                (item) => item.request_item_id !== departmentMasterItem.request_item_id)
                dispatch(addRequestItemsChecked(newRequestMasterItemsChecked))
        }
        if(!exists) {
            dispatch(
                addRequestItemsChecked([
                    ...requestMasterItemsCheckedSelector.requestMasterItemsChecked,
                    departmentMasterItem
                ])
            );
        }

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
                            {requestMasterItemsSelector.response.content.length > 0 &&
                                requestMasterItemsSelector.response.content.map((requestMasterItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Checkbox
                                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                    handleCheckboxChange(event, requestMasterItem)
                                                }
                                                checked={
                                                    requestMasterItemsCheckedSelector.requestMasterItemsChecked.find(
                                                        (item) =>
                                                            item.request_item_id === requestMasterItem.request_item_id
                                                    ) !== undefined
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>{requestMasterItem.item}</TableCell>
                                        <TableCell>{requestMasterItem.recent_cn}</TableCell>
                                        <TableCell>{requestMasterItem.purchase_unit}</TableCell>
                                        <TableCell>{requestMasterItem.part_number}</TableCell>
                                        <TableCell>{requestMasterItem.comment}</TableCell>
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
            <Drawer
                anchor="bottom"
                open={drawerToggleTypeSelector.drawerToggleType === drawerToggleType.UPDATE_REQUEST_REVIEW_FORM}>
                <RequestItemReviewForm />
            </Drawer>
        </Box>
    );
};

export default RequestMasterDepartmentItems;
