import { MouseEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Paper,
    Box,
    styled,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { tableCellClasses } from '@mui/material/TableCell';
import { toggleDrawer } from '../app/slice/drawerToggle/drawerToggleTypeSlice';
import { DEPARTMENT, DRAWER_TOGGLE_TYPE } from '../common/constants';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { assignMasterItemThunk } from '../app/slice/master/masterItemAssignSlice';
import { IMaster } from '../app/api/properties/IMaster';
import { getMasterItemsThunk, selectMasterItems } from '../app/slice/master/masterItemsSlice';
import { deleteMasterItemThunk } from '../app/slice/master/masterItemDeleteSlice';

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

const columns: {
    field: string;
    tooltipName: string;
    headerName: string | JSX.Element;
    align: 'left' | 'center' | 'right';
}[] = [
    { field: 'item', tooltipName: 'Item', headerName: 'Item', align: 'left' },
    {
        field: 'purchase_unit',
        tooltipName: 'Purchase Unit',
        headerName: 'PU',
        align: 'left'
    },
    {
        field: 'manufacturer',
        tooltipName: 'Manufacturer',
        headerName: 'M',
        align: 'left'
    },
    {
        field: 'recent_cn',
        tooltipName: 'Recent CN',
        headerName: 'RCN',
        align: 'left'
    },
    {
        field: 'part_number',
        tooltipName: 'Part Number',
        headerName: 'PN',
        align: 'left'
    },
    {
        field: 'recent_vendor',
        tooltipName: 'Recent Vendor',
        headerName: 'RV',
        align: 'left'
    },
    {
        field: 'fisher_cn',
        tooltipName: 'Fisher CN',
        headerName: 'FCN',
        align: 'left'
    },
    { field: 'vwr_cn', tooltipName: 'VWR CN', headerName: 'VCN', align: 'left' },
    {
        field: 'lab_source_cn',
        tooltipName: 'Lab Source CN',
        headerName: 'LSCN',
        align: 'left'
    },
    {
        field: 'next_advance_cn',
        tooltipName: 'Other CN',
        headerName: 'OCN',
        align: 'left'
    },
    {
        field: 'unit_price',
        tooltipName: 'Unit Price',
        headerName: 'AUP',
        align: 'left'
    },
    {
        field: 'category',
        tooltipName: 'Category',
        headerName: 'Ca',
        align: 'left'
    },
    {
        field: 'drug_class',
        tooltipName: 'Drug Class',
        headerName: 'DC',
        align: 'left'
    },
    { field: 'type', tooltipName: 'Type', headerName: 'Type', align: 'left' },
    { field: 'group', tooltipName: 'Group', headerName: 'Group', align: 'left' },
    {
        field: 'comments',
        tooltipName: 'Comment',
        headerName: 'Comment',
        align: 'left'
    },
    {
        field: '',
        tooltipName: 'Edit | Assign | Delete',
        headerName: 'Edit Assign Delete',
        align: 'right'
    }
];

const Master = () => {
    const masterItemsSelector = useAppSelector(selectMasterItems);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);

    const [masterItemId, setMasterItemId] = useState<number>(0);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElDelete, setAnchorElDelete] = useState<null | HTMLElement>(null);

    useEffect(() => {
        dispatch(getMasterItemsThunk(page));
    }, [dispatch, page]);

    const handleChangePage = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleEditClick = (event: MouseEvent<HTMLElement>, masterItem: IMaster) => {
        dispatch(
            toggleDrawer({
                type: DRAWER_TOGGLE_TYPE.UPDATE_MASTER_ITEM,
                masterItem: masterItem
            })
        );
    };

    const handleIconClick = (event: MouseEvent<HTMLElement>, masterItemId: number | undefined, icon: string) => {
        if (masterItemId) {
            setMasterItemId(masterItemId);
            if (icon === 'ASSIGN') setAnchorElUser(event.currentTarget);
            if (icon === 'DELETE') setAnchorElDelete(event.currentTarget);
        }
    };

    const handleAssignItem = (event: MouseEvent<HTMLElement>, department: string) => {
        dispatch(
            assignMasterItemThunk({
                masterItemId: masterItemId,
                department: department
            })
        );
        setAnchorElUser(null);
    };

    const handleCloseDepartmentMenu = () => {
        setAnchorElUser(null);
    };

    const handleDeleteConfirm = (event: MouseEvent<HTMLElement>) => {
        dispatch(deleteMasterItemThunk(masterItemId))
            .then((response) => {
                setAnchorElDelete(null);
                dispatch(getMasterItemsThunk(page));
            })
            .catch((error: Error) => console.error(error.message));
    };

    const handleDeleteCancel = (event: MouseEvent<HTMLElement>) => {
        setAnchorElDelete(null);
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
                                    <StyledTableCell width={300}>{masterItem.item}</StyledTableCell>
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
                                    <StyledTableCell>{masterItem.type}</StyledTableCell>
                                    <StyledTableCell>{masterItem.group}</StyledTableCell>
                                    <StyledTableCell width={180}>{masterItem.comment}</StyledTableCell>
                                    <StyledTableCell align="right" width={200}>
                                        <IconButton
                                            onClick={(event: MouseEvent<HTMLElement>) =>
                                                handleEditClick(event, masterItem)
                                            }>
                                            <ModeEditIcon color="primary" fontSize="small" />
                                        </IconButton>
                                        <Box component="span" sx={{ color: 'grey' }}>
                                            |
                                        </Box>
                                        <IconButton
                                            onClick={(event: MouseEvent<HTMLElement>) =>
                                                handleIconClick(event, masterItem.id, 'ASSIGN')
                                            }
                                            sx={{ marginLeft: 0.7, marginRight: 0.7 }}>
                                            <AssignmentTurnedInIcon color="primary" fontSize="small" />
                                        </IconButton>
                                        <Box component="span" sx={{ color: 'grey' }}>
                                            |
                                        </Box>
                                        <IconButton
                                            sx={{ marginLeft: 0.5 }}
                                            onClick={(event: MouseEvent<HTMLElement>) =>
                                                handleIconClick(event, masterItem.id, 'DELETE')
                                            }>
                                            <DeleteIcon color="primary" fontSize="small" />
                                        </IconButton>
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
                {Object.values(DEPARTMENT).map((department, index) => (
                    <MenuItem
                        key={index}
                        onClick={(event: MouseEvent<HTMLElement>) => handleAssignItem(event, department)}>
                        <Typography textAlign="center">{department.split('_').join(' ')}</Typography>
                    </MenuItem>
                ))}
            </Menu>
            <Menu
                key="menu"
                id="menu"
                anchorEl={anchorElDelete}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorElDelete)}
                onClose={handleCloseDepartmentMenu}>
                <MenuItem key="confirm" onClick={handleDeleteConfirm}>
                    <Typography textAlign="center">Confirm</Typography>
                </MenuItem>
                <MenuItem key="cancel" onClick={handleDeleteCancel}>
                    <Typography textAlign="center">Cancel</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Master;
