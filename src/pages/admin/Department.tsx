import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

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
    Drawer
} from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { getDepartmentItemsThunk, selectDepartmentItems } from '../../app/department/departmentItemsSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
    { field: 'id', headerName: 'ID' },
    { field: 'location', headerName: 'Location' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'min_quantity', headerName: 'Min Qty' },
    { field: 'max_quantity', headerName: 'Max Qty' },
    { field: 'usage_level', headerName: 'Usage Level' },
    { field: 'expiration_date', headerName: 'Expiration Date' },
    { field: 'received_date', headerName: 'Received Date' }
];

const Department = () => {
    const departmentItemsSelector = useAppSelector(selectDepartmentItems);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<{ page: number; size: number }>({ page: 0, size: 10 });

    const location = useLocation();

    useEffect(() => {
        dispatch(getDepartmentItemsThunk({ pathName: location.pathname, page: page.page, size: page.size }));
    }, [dispatch, location.pathname, page]);

    const handleChangePage = (event: any, newPage: number): void => {
        setPage({ ...page, page: newPage });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPage({ ...page, page: 0, size: parseInt(event.target.value, 10) });
    };

    const handleUpdate = (id: number) => {};

    return (
        <Box sx={{ height: '100%' }}>
            {/* <Drawer anchor="bottom" open={updateTotalQuantityFormDrawerSelector.open}>
                <TotalQuantityUpdateForm />
            </Drawer> */}
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
                            {departmentItemsSelector.response &&
                                departmentItemsSelector.response.content.length > 0 &&
                                departmentItemsSelector.response.content.map((departmentExperienceItems, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>{departmentExperienceItems.id}</TableCell>
                                        <TableCell>{departmentExperienceItems.location}</TableCell>
                                        <TableCell>{departmentExperienceItems.usage_level}</TableCell>
                                        <TableCell>{departmentExperienceItems.min_quantity}</TableCell>
                                        <TableCell>{departmentExperienceItems.max_quantity}</TableCell>
                                        <TableCell>{departmentExperienceItems.quantity}</TableCell>
                                        <TableCell>{departmentExperienceItems.received_date}</TableCell>
                                        <TableCell>{departmentExperienceItems.expiration_date}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {departmentItemsSelector.response && (
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
                )}
            </Stack>
        </Box>
    );
};

export default Department;
