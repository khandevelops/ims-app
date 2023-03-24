import React from 'react';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
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
    Drawer,
    tableCellClasses,
    styled
} from '@mui/material';
import { getDepartmentMasterThunk, selectDepartmentItems } from '../app/departmentMaster/departmentMasterSlice';
import { useLocation } from 'react-router-dom';
import TotalQuantityUpdateForm from '../components/QuantityUpdateForm';
import { selectUpdateTotalQuantityFormDrawer, toggleDrawer } from '../app/master/quantityFormDrawerSlice';
import { handlePage, handleSize, selectPage } from '../app/common/pageSlice';
import { getMasterDepartmentItemThunk } from '../app/masterDepartment/masterDepartmentSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:'WhiteSmoke',
      fontSize: 13,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

const DepartmentExperience = () => {
    const departmentItemsSelector = useAppSelector(selectDepartmentItems);
    const pageSelector = useAppSelector(selectPage);
    const updateTotalQuantityFormDrawerSelector = useAppSelector(selectUpdateTotalQuantityFormDrawer);
    const dispatch = useAppDispatch();

    const location = useLocation();

    useEffect(() => {
        dispatch(
            getDepartmentMasterThunk({
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
        <Box sx={{paddingTop: 3, paddingLeft: 1, paddingRight: 1}}>
            <Paper elevation={3}>
                <TableContainer sx={{height: 750}}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {columns.length > 0 &&
                                    columns.map((column) => (
                                        <StyledTableCell 
                                        key={column.field}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >{column.headerName}</StyledTableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departmentItemsSelector.response.content.length > 0 &&
                                departmentItemsSelector.response.content.map((departmentExperienceItems, index) => (
                                    <TableRow key={index}>
                                        <StyledTableCell>
                                            <Checkbox />
                                        </StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.item}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.purchase_unit}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.part_number}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.recent_cn}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.location}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button
                                                variant="outlined"
                                                endIcon={<ChevronRightIcon />}
                                                onClick={() => handleUpdateClick(departmentExperienceItems.item_id)}
                                                sx={{ minWidth: 80 }}>
                                                {departmentExperienceItems.total_quantity}
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.usage_level}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.min_quantity}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.max_quantity}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.order_quantity}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.unit_price}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.total_price}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.comments}</StyledTableCell>
                                        <StyledTableCell>{departmentExperienceItems.category}</StyledTableCell>
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
            </Paper>
            <Drawer anchor="bottom" open={updateTotalQuantityFormDrawerSelector.open}>
                <TotalQuantityUpdateForm />
            </Drawer>
        </Box>
    );
};

export default DepartmentExperience;
