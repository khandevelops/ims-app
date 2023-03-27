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
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {
    getRequestListItemsThunk,
    IRequestItemList,
    selectRequestItemList,
    updateRequestItemList
} from '../app/requestList/requestListItemSlice';
import { departments } from '../common/constants';
import { createRequestMakeItemsThunk } from '../app/requestMake/requestMakeItemCreateConfirmationSlice';
import { changeTab } from '../app/common/requestTabSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
    { field: 'item', headerName: 'Item' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'purchase_unit', headerName: 'Purchase Unit' },
    { field: 'part_number', headerName: 'Part Number' },
    { field: 'comments', headerName: 'Comments' }
];

const RequestsToMake = () => {
    const departmentMasterItemsSelector = useAppSelector(selectRequestItemList);
    const dispatch = useAppDispatch();
    const [pagination, setPagination] = useState<{ page: number; size: number }>({ page: 0, size: 10 });
    const location = useLocation();

    useEffect(() => {
        dispatch(
            getRequestListItemsThunk({ pathName: location.pathname, page: pagination.page})
        );
    }, [dispatch, location.pathname, pagination.page, pagination.size]);

    const handleChangePage = (event: any, page: number): void => {
        setPagination({ ...pagination, page: page });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPagination((prevState) => ({ ...prevState, page: 0, size: parseInt(event.target.value) }));
    };

    const handleCheckboxChange = (
        event: ChangeEvent<HTMLInputElement>,
        departmentMasterItem: IRequestItemList
    ) => {
        dispatch(
            updateRequestItemList([
                ...departmentMasterItemsSelector.response.content.map((item) => ({
                    ...item,
                    checked: departmentMasterItem.id === item.id ? event.target.checked : item.checked
                }))
            ])
        );
    };

    const handleAddClick = () => {
        const checkedItems = departmentMasterItemsSelector.response.content
            .filter((item) => item.checked === true)
            .map((item) => ({
                id: 0,
                order_quantity: 0,
                department: 'EXTRACTIONS',
                location: 'store-room',
                status: 'PENDING',
                time_requested: new Date(),
                time_updated: null,
                confirmation: 'WAITING',
                user: 'Batsaikhan Ulambayar',
                comment: 'this is a test comment',
                custom_text: 'this is a test custom text',
                masterItem: item.masterItem,
                checked: item.checked
            }));

        if (checkedItems.length > 0) {
            dispatch(createRequestMakeItemsThunk({ pathName: location.pathname, requestItems: checkedItems }));
            dispatch(changeTab(1));
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
                        {departmentMasterItemsSelector.response.content.length > 0 &&
                            departmentMasterItemsSelector.response.content.map((departmentMasterItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleCheckboxChange(event, departmentMasterItem)
                                            }
                                            checked={departmentMasterItem.checked}
                                        />
                                    </TableCell>
                                    <TableCell>{departmentMasterItem.masterItem.item}</TableCell>
                                    <TableCell>{departmentMasterItem.masterItem.recent_cn}</TableCell>
                                    <TableCell>{departmentMasterItem.masterItem.part_number}</TableCell>
                                    <TableCell>{departmentMasterItem.masterItem.purchase_unit}</TableCell>
                                    <TableCell>{departmentMasterItem.masterItem.comments}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{ marginTop: 3 }}
                rowsPerPageOptions={[]}
                component="div"
                count={departmentMasterItemsSelector.response.totalElements}
                rowsPerPage={departmentMasterItemsSelector.response.size}
                page={departmentMasterItemsSelector.response.number}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={true}
                showLastButton={true}
            />
            <Zoom
                in={departmentMasterItemsSelector.response.content.filter((item) => item.checked === true).length > 0}
                style={{
                    transitionDelay:
                        departmentMasterItemsSelector.response.content.filter((item) => item.checked === true).length >
                        0
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

export default RequestsToMake;
