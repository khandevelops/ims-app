import React from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    TablePagination,
    AppBar,
    Toolbar,
    Paper,
    Box,
    Stack,
    Button,
    Drawer
} from '@mui/material';
import {
    getDepartmentExperienceItemsThunk,
    selectDepartmentItems
} from '../../app/departmentExperience/departmentExperienceSlice';
import { useLocation } from 'react-router-dom';
import TotalQuantityUpdateForm from '../../components/QuantityUpdateForm';
import { selectUpdateTotalQuantityFormDrawer, toggleDrawer } from '../../app/master/quantityFormDrawerSlice';
import { handlePage, handleSize, selectPage } from '../../app/common/pageSlice';
import { getMasterDepartmentItemThunk } from '../../app/masterDepartment/masterDepartmentSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
    { field: 'item_id', headerName: 'Item ID' },
    { field: 'item', headerName: 'Item' },
    { field: 'purchase_unit', headerName: 'Purchase Unit' },
    { field: 'part_number', headerName: 'Part Number' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'location', headerName: 'Location' },
    { field: 'total_quantity', headerName: 'Total Qty' },
    { field: 'usage_level', headerName: 'Usage Level' },
    { field: 'min_quantity', headerName: 'Min Qty' },
    { field: 'max_quantity', headerName: 'Max Qty' },
    { field: 'order_quantity', headerName: 'Order Qty' },
    { field: 'unit_price', headerName: 'Unit Price' },
    { field: 'total_price', headerName: 'Total Price' },
    { field: 'comments', headerName: 'Comments' },
    { field: 'category', headerName: 'Category' }
];

const DepartmentExperience = () => {
    const departmentItemsSelector = useAppSelector(selectDepartmentItems);
    const pageSelector = useAppSelector(selectPage);
    const updateTotalQuantityFormDrawerSelector = useAppSelector(selectUpdateTotalQuantityFormDrawer);
    const dispatch = useAppDispatch();

    const location = useLocation();

    useEffect(() => {
        dispatch(
            getDepartmentExperienceItemsThunk({
                pathName: location.pathname,
                page: pageSelector.page,
                size: pageSelector.size
            })
        );
    }, [dispatch, location.pathname, pageSelector.page, pageSelector.size]);

    const handleChangePage = (event: any, newPage: number): void => {
        dispatch(handlePage(newPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(handleSize(parseInt(event.target.value, 10)));
        dispatch(handlePage(0));
    };

    const handleUpdateClick = (id: number) => {
        dispatch(toggleDrawer(true));
        dispatch(getMasterDepartmentItemThunk(id));
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Drawer anchor="bottom" open={updateTotalQuantityFormDrawerSelector.open}>
                <TotalQuantityUpdateForm />
            </Drawer>
            <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
                <Toolbar variant="dense"></Toolbar>
            </AppBar>
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
                                    columns.map((column) => (
                                        <TableCell key={column.field}>{column.headerName}</TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departmentItemsSelector.response.content.length > 0 &&
                                departmentItemsSelector.response.content.map((departmentExperienceItems, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>{departmentExperienceItems.item_id}</TableCell>
                                        <TableCell>{departmentExperienceItems.item}</TableCell>
                                        <TableCell>{departmentExperienceItems.purchase_unit}</TableCell>
                                        <TableCell>{departmentExperienceItems.part_number}</TableCell>
                                        <TableCell>{departmentExperienceItems.recent_cn}</TableCell>
                                        <TableCell>{departmentExperienceItems.location}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                endIcon={<ChevronRightIcon />}
                                                onClick={() => handleUpdateClick(departmentExperienceItems.item_id)}
                                                sx={{ minWidth: 80 }}>
                                                {departmentExperienceItems.total_quantity}
                                            </Button>
                                        </TableCell>
                                        <TableCell>{departmentExperienceItems.usage_level}</TableCell>
                                        <TableCell>{departmentExperienceItems.min_quantity}</TableCell>
                                        <TableCell>{departmentExperienceItems.max_quantity}</TableCell>
                                        <TableCell>{departmentExperienceItems.order_quantity}</TableCell>
                                        <TableCell>{departmentExperienceItems.unit_price}</TableCell>
                                        <TableCell>{departmentExperienceItems.total_price}</TableCell>
                                        <TableCell>{departmentExperienceItems.comments}</TableCell>
                                        <TableCell>{departmentExperienceItems.category}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{ marginTop: 3 }}
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={departmentItemsSelector.response.totalElements}
                    rowsPerPage={departmentItemsSelector.response.size}
                    page={departmentItemsSelector.response.number}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Stack>
        </Box>
    );
};

export default DepartmentExperience;
