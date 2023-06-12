import React from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Box, Button, Drawer, tableCellClasses, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';
import UpdateQuantityForm from '../components/forms/UpdateDepartmentQuantityForm';
import { handlePage, handleSize, selectPage } from '../app/common/pageSlice';
import { getMasterDepartmentItemThunk } from '../app/slice/masterDepartment/masterDepartmentItemSlice';
import { selectDrawerToggleType, toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { DRAWER_TOGGLE_TYPE } from '../common/constants';
import { getDepartmentItems, getDepartmentItemsThunk, selectDepartmentItems } from '../app/departments/departmentItemsSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'item', headerName: 'Item' },
    { field: 'purchase_unit', headerName: 'Purchase Unit' },
    { field: 'part_number', headerName: 'Part Number' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'total_quantity', headerName: 'Total Qty' },
    { field: 'usage_level', headerName: 'Usage Level' },
    { field: 'minimum_quantity', headerName: 'Min Qty' },
    { field: 'maximum_quantity', headerName: 'Max Qty' },
    { field: 'order_quantity', headerName: 'Order Qty' },
    { field: 'unit_price', headerName: 'Unit Price' },
    { field: 'total_price', headerName: 'Total Price' },
    { field: 'comments', headerName: 'Comments' },
    { field: 'category', headerName: 'Category' }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffd740',
        fontSize: 14,
        fontWeight: 700,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        fontWeight: 700
    }
}));

const Departments = () => {
    const departmentItemsSelector = useAppSelector(selectDepartmentItems);
    const { type } = useAppSelector(selectDrawerToggleType);
    const pageSelector = useAppSelector(selectPage);
    const dispatch = useAppDispatch();

    const location = useLocation();

    useEffect(() => {
        dispatch(
            getDepartmentItemsThunk({
                state: location.state,
                page: pageSelector.page
            })
        );
    }, [dispatch, location.state, pageSelector.page]);

    const handleChangePage = (event: any, newPage: number): void => {
        dispatch(handlePage(newPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(handleSize(parseInt(event.target.value, 10)));
        dispatch(handlePage(0));
    };

    const handleUpdateClick = (id: number, departmentName: string) => {
        dispatch(getMasterDepartmentItemThunk({ id: id, departmentName: departmentName })).then(() => {
            dispatch(toggleDrawer({ type: DRAWER_TOGGLE_TYPE.UPDATE_DEPARTMENT_ITEM }));
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} component={Paper} elevation={3}>
            <TableContainer sx={{ height: '70vh' }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.length > 0 &&
                                columns.map((column) => (
                                    <StyledTableCell key={column.field} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        {column.headerName}
                                    </StyledTableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departmentItemsSelector.response &&
                            departmentItemsSelector.response.content.length > 0 &&
                            departmentItemsSelector.response.content.map((departmentItem, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell>{departmentItem.location}</StyledTableCell>
                                    <StyledTableCell>{departmentItem.lot_number}</StyledTableCell>
                                    <StyledTableCell>{departmentItem.minimum_quantity}</StyledTableCell>
                                    <StyledTableCell>{departmentItem.maximum_quantity}</StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{ marginTop: 3 }}
                rowsPerPageOptions={[]}
                component="div"
                count={departmentItemsSelector.response.totalElements || 0}
                rowsPerPage={departmentItemsSelector.response.size || 0}
                page={departmentItemsSelector.response.number || 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={true}
                showLastButton={true}
            />
            <Drawer anchor="bottom" open={type === DRAWER_TOGGLE_TYPE.UPDATE_QUANTITY}>
                <UpdateQuantityForm />
            </Drawer>
        </Box>
    );
};

export default Departments;
