import { MouseEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMasterItemsThunk, selectMasterItems } from '../app/master/masterItemSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TablePagination, IconButton, Paper, Box, styled, Menu, MenuItem, Typography } from '@mui/material';
import { assignMasterItemThunk, populateMasterItem } from '../app/master/masterFormSlice';
import { IMasterItem } from '../app/master/masterItemSlice';
import { tableCellClasses } from '@mui/material/TableCell';
import { toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { department, drawerToggleType } from '../common/constants';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffd740',
        fontSize: 12,
        fontWeight: 700,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12
    }
}));

const columns: { field: string; tooltipName: string; headerName: string | JSX.Element; align: 'left' | 'center' | 'right' }[] = [
    // { field: 'checkbox', tooltipName: 'Select', headerName: 'Select' },
    { field: 'item', tooltipName: 'Item', headerName: 'Item', align: 'left' },
    { field: 'purchase_unit', tooltipName: 'Purchase Unit', headerName: 'PU', align: 'left' },
    { field: 'manufacturer', tooltipName: 'Manufacturer', headerName: 'M', align: 'left' },
    { field: 'recent_cn', tooltipName: 'Recent CN', headerName: 'RCN', align: 'left' },
    { field: 'part_number', tooltipName: 'Part Number', headerName: 'PN', align: 'left' },
    { field: 'recent_vendor', tooltipName: 'Recent Vendor', headerName: 'RV', align: 'left' },
    { field: 'fisher_cn', tooltipName: 'Fisher CN', headerName: 'FCN', align: 'left' },
    { field: 'vwr_cn', tooltipName: 'VWR CN', headerName: 'VCN', align: 'left' },
    { field: 'lab_source_cn', tooltipName: 'Lab Source CN', headerName: 'LSCN', align: 'left' },
    { field: 'next_advance_cn', tooltipName: 'Other CN', headerName: 'OCN', align: 'left' },
    { field: 'unit_price', tooltipName: 'Unit Price', headerName: 'AUP', align: 'left' },
    { field: 'category', tooltipName: 'Category', headerName: 'Ca', align: 'left' },
    { field: 'drug_class', tooltipName: 'Drug Class', headerName: 'DC', align: 'left' },
    { field: 'usage_level', tooltipName: 'Usage Level', headerName: 'UL', align: 'left' },
    { field: 'expiration_date', tooltipName: 'Exp Date', headerName: 'ED', align: 'left' },
    { field: 'received_date', tooltipName: 'Rec Date', headerName: 'RD', align: 'left' },
    { field: 'type', tooltipName: 'Type', headerName: 'Type', align: 'left' },
    { field: 'group', tooltipName: 'Group', headerName: 'Group', align: 'left' },
    { field: 'comments', tooltipName: 'Comment', headerName: 'Comment', align: 'left' },
    { field: 'more', tooltipName: 'Action', headerName: 'Action', align: 'center' }
];

const Master = () => {
    const masterItemsSelector = useAppSelector(selectMasterItems);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);

    const [masterItemId, setMasterItemId] = useState<number>(0);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    useEffect(() => {
        dispatch(getMasterItemsThunk(page));
    }, [dispatch, page]);

    const handleChangePage = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleMoreClick = (event: MouseEvent<HTMLElement>, masterItem: IMasterItem) => {
        dispatch(toggleDrawer(drawerToggleType.UPDATE_MASTER_ITEM_FORM));
        dispatch(populateMasterItem(masterItem));
    };

    const handleAssignClick = (event: MouseEvent<HTMLElement>, masterItemId: number) => {
        setMasterItemId(masterItemId);
        setAnchorElUser(event.currentTarget);
    };

    const handleAssignItem = (event: MouseEvent<HTMLElement>, department: string) => {
        dispatch(assignMasterItemThunk({ department: department, masterItemId: masterItemId }));
        setAnchorElUser(null);
    };

    const handleCloseDepartmentMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} component={Paper} elevation={3}>
            <TableContainer sx={{ height: '70vh' }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow sx={{ height: 50 }}>
                            {columns.length > 0 &&
                                columns.map((column) => (
                                    <StyledTableCell key={column.field} align={column.align}>
                                        <Box>{column.tooltipName}</Box>
                                    </StyledTableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {masterItemsSelector.response.content.length > 0 &&
                            masterItemsSelector.response.content.map((masterItem, index) => (
                                <TableRow key={index} hover>
                                    {/* <StyledTableCell>
                                        <Checkbox />
                                    </StyledTableCell> */}
                                    <StyledTableCell>{masterItem.item}</StyledTableCell>
                                    <StyledTableCell>{masterItem.purchase_unit}</StyledTableCell>
                                    <StyledTableCell>{masterItem.manufacturer}</StyledTableCell>
                                    <StyledTableCell>{masterItem.recent_cn}</StyledTableCell>
                                    <StyledTableCell>{masterItem.part_number}</StyledTableCell>
                                    <StyledTableCell>{masterItem.recent_vendor}</StyledTableCell>
                                    <StyledTableCell>{masterItem.fisher_cn}</StyledTableCell>
                                    <StyledTableCell>{masterItem.vwr_cn}</StyledTableCell>
                                    <StyledTableCell>{masterItem.lab_source_cn}</StyledTableCell>
                                    <StyledTableCell>{masterItem.other_cn}</StyledTableCell>
                                    <StyledTableCell>${masterItem.unit_price}</StyledTableCell>
                                    <StyledTableCell>{masterItem.category}</StyledTableCell>
                                    <StyledTableCell>{masterItem.drug_class}</StyledTableCell>
                                    <StyledTableCell>{masterItem.usage_level}</StyledTableCell>
                                    <StyledTableCell>{masterItem.expiration_date?.toDateString()}</StyledTableCell>
                                    <StyledTableCell>{masterItem.received_date?.toDateString()}</StyledTableCell>
                                    <StyledTableCell>{masterItem.type}</StyledTableCell>
                                    <StyledTableCell>{masterItem.group}</StyledTableCell>
                                    <StyledTableCell width={180}>{masterItem.comment}</StyledTableCell>
                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <IconButton onClick={(event: MouseEvent<HTMLElement>) => handleMoreClick(event, masterItem)}>
                                                <ModeEditIcon color="primary" fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={(event: MouseEvent<HTMLElement>) => handleAssignClick(event, masterItem.id)}>
                                                <AddCircleOutlineIcon color="primary" fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{ marginTop: 'auto' }}
                rowsPerPageOptions={[]}
                component="div"
                count={masterItemsSelector.response.totalElements}
                rowsPerPage={masterItemsSelector.response.size}
                page={masterItemsSelector.response.number}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
            />
            <Menu
                key="menu"
                id="menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseDepartmentMenu}>
                {Object.values(department).map((department, index) => (
                    <MenuItem key={index} onClick={(event: MouseEvent<HTMLElement>) => handleAssignItem(event, department)}>
                        <Typography textAlign="center">{department.split('_').join(' ')}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default Master;
