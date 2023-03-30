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
    Zoom
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {
    getRequestMasterDepartmentItemsThunk,
    IRequestMasterDepartmentItem,
    selectRequestMasterDepartmentItems
} from '../app/requestMasterDepartment/requestMasterDepartmentItemsSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
    { field: 'item', headerName: 'Item' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'purchase_unit', headerName: 'Purchase Unit' },
    { field: 'part_number', headerName: 'Part Number' },
    { field: 'Detail', headerName: 'detail' }
];

const RequestMasterDepartment = () => {
    const requestMasterDepartmentItemsSelector = useAppSelector(selectRequestMasterDepartmentItems);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);
    const location = useLocation();

    useEffect(() => {
        dispatch(getRequestMasterDepartmentItemsThunk({ pathName: location.pathname, page: page }));
    }, [dispatch, location.pathname, page]);

    const handleChangePage = (event: any, page: number): void => {
        setPage(page);
    };

    const handleCheckboxChange = (
        event: ChangeEvent<HTMLInputElement>,
        departmentMasterItem: IRequestMasterDepartmentItem
    ) => {
        // dispatch(
        //     updateRequestItemList([
        //         ...requestMasterItemsSelector.response.content.map((item) => ({
        //             ...item,
        //             checked: departmentMasterItem.id === item.id ? event.target.checked : item.checked
        //         }))
        //     ])
        // );
    };

    const handleAddClick = () => {
        // const checkedItems = requestMasterItemsSelector.response.content
        //     .filter((item) => item.checked === true)
        //     .map((item) => ({
        //         id: 0,
        //         order_quantity: 0,
        //         department: 'EXTRACTIONS',
        //         location: 'store-room',
        //         status: 'PENDING',
        //         time_requested: new Date(),
        //         time_updated: null,
        //         confirmation: 'WAITING',
        //         user: 'Batsaikhan Ulambayar',
        //         comment: 'this is a test comment',
        //         custom_text: 'this is a test custom text',
        //         masterItem: item.masterItem,
        //         checked: item.checked
        //     }));
        // if (checkedItems.length > 0) {
        //     dispatch(createRequestMakeItemsThunk({ pathName: location.pathname, requestItems: checkedItems }));
        //     dispatch(changeTab(1));
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
                            requestMasterDepartmentItemsSelector.response.content.map((requestMasterDepartmentItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleCheckboxChange(event, requestMasterDepartmentItem)
                                            }
                                            checked={requestMasterDepartmentItem.checked}
                                        />
                                    </TableCell>
                                    <TableCell>{requestMasterDepartmentItem.item}</TableCell>
                                    <TableCell>{requestMasterDepartmentItem.recent_cn}</TableCell>
                                    <TableCell>{requestMasterDepartmentItem.purchase_unit}</TableCell>
                                    <TableCell>{requestMasterDepartmentItem.part_number}</TableCell>
                                    <TableCell>{requestMasterDepartmentItem.detail}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{ marginTop: 3 }}
                rowsPerPageOptions={[]}
                component="div"
                count={requestMasterDepartmentItemsSelector.response.totalElements}
                rowsPerPage={requestMasterDepartmentItemsSelector.response.size}
                page={requestMasterDepartmentItemsSelector.response.number}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
            />
            <Zoom
                in={requestMasterDepartmentItemsSelector.response.content.filter((item) => item.checked === true).length > 0}
                style={{
                    transitionDelay:
                    requestMasterDepartmentItemsSelector.response.content.filter((item) => item.checked === true).length > 0
                            ? '500ms'
                            : '0ms'
                }}>
                <Box>
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={handleAddClick} />
                    </Fab>
                </Box>
            </Zoom>
        </Stack>
    );
};

export default RequestMasterDepartment;
