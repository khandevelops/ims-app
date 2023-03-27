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
    TablePagination,
    Paper,
    Box,
    Button,
    Drawer,
    tableCellClasses,
    styled
} from '@mui/material';
import { getDepartmentMasterThunk, selectDepartmentMasterItems } from '../app/departmentMaster/departmentMasterSlice';
import { useLocation } from 'react-router-dom';
import QuantityUpdateForm from '../components/UpdateQuantityForm';
import { selectUpdateTotalQuantityFormDrawer, toggleDrawer } from '../app/master/quantityFormDrawerSlice';
import { handlePage, handleSize, selectPage } from '../app/common/pageSlice';
import { getMasterDepartmentItemThunk } from '../app/masterDepartment/masterDepartmentSlice';

const columns: { field: string; headerName: string | JSX.Element }[] = [
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
        backgroundColor: 'WhiteSmoke',
        fontSize: 13,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12
    }
}));

const DepartmentExperience = () => {
    const departmentMasterItemsSelector = useAppSelector(selectDepartmentMasterItems);
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

    const handleUpdateClick = (id: number, departmentName: string) => {
        dispatch(getMasterDepartmentItemThunk({ id: id, departmentName: departmentName })).then(() =>
            dispatch(toggleDrawer(true))
        );
    };

    return (
        <Box sx={{ paddingTop: 3, paddingLeft: 1, paddingRight: 1 }}>
            <Paper elevation={3}>
                <TableContainer sx={{ height: 750 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {columns.length > 0 &&
                                    columns.map((column) => (
                                        <StyledTableCell
                                            key={column.field}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            {column.headerName}
                                        </StyledTableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departmentMasterItemsSelector.response.content.length > 0 &&
                                departmentMasterItemsSelector.response.content.map((departmentMasterItems, index) => (
                                    <TableRow key={index}>
                                        <StyledTableCell>{departmentMasterItems.item}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.purchase_unit}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.part_number}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.recent_cn}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.location}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button
                                                variant="outlined"
                                                endIcon={<ChevronRightIcon />}
                                                onClick={() =>
                                                    handleUpdateClick(departmentMasterItems.item_id, location.state)
                                                }
                                                sx={{ minWidth: 80 }}
                                                disabled={false}>
                                                {departmentMasterItems.total_quantity}
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.usage_level}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.min_quantity}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.max_quantity}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.order_quantity}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.unit_price}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.total_price}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.comments}</StyledTableCell>
                                        <StyledTableCell>{departmentMasterItems.category}</StyledTableCell>
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
            </Paper>
            <Drawer anchor="bottom" open={updateTotalQuantityFormDrawerSelector.open}>
                <QuantityUpdateForm />
            </Drawer>
        </Box>
    );
};

export default DepartmentExperience;
