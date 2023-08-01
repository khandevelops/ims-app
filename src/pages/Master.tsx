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
    Typography,
    TableSortLabel
} from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { tableCellClasses } from '@mui/material/TableCell';
import { toggleDrawer } from '../app/slice/drawerToggle/drawerToggleTypeSlice';
import { DEPARTMENT, DRAWER_TOGGLE_TYPE } from '../common/constants';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { assignMasterItemThunk } from '../app/slice/master/masterItemAssignSlice';
import { IMaster } from '../app/api/properties/IMaster';
import { filterMasterItemsThunk, getMasterItemsThunk, selectMasterItems } from '../app/slice/master/masterItemsSlice';
import { deleteMasterItemThunk } from '../app/slice/master/masterItemDeleteSlice';
import { selectKeyword } from '../app/search';
import { visuallyHidden } from '@mui/utils';
import { Height } from '@mui/icons-material';

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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof IMaster;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'item',
        numeric: false,
        disablePadding: true,
        label: 'Item'
    },
    {
        id: 'purchase_unit',
        numeric: false,
        disablePadding: false,
        label: 'Purchase Unit'
    },
    {
        id: 'manufacturer',
        numeric: false,
        disablePadding: false,
        label: 'Manufacturer'
    },
    {
        id: 'recent_cn',
        numeric: true,
        disablePadding: false,
        label: 'Recent CN'
    },
    {
        id: 'part_number',
        numeric: true,
        disablePadding: false,
        label: 'Part Number'
    },
    {
        id: 'recent_vendor',
        numeric: true,
        disablePadding: false,
        label: 'Recent Vendor'
    },
    {
        id: 'fisher_cn',
        numeric: true,
        disablePadding: false,
        label: 'Fisher CN'
    },
    {
        id: 'vwr_cn',
        numeric: true,
        disablePadding: false,
        label: 'VWR CN'
    },
    {
        id: 'lab_source_cn',
        numeric: true,
        disablePadding: false,
        label: 'Lab Source CN'
    },
    {
        id: 'other_cn',
        numeric: true,
        disablePadding: false,
        label: 'Other CN'
    },
    {
        id: 'unit_price',
        numeric: true,
        disablePadding: false,
        label: 'Unit Price'
    },
    {
        id: 'category',
        numeric: true,
        disablePadding: false,
        label: 'Category'
    },
    {
        id: 'drug_class',
        numeric: true,
        disablePadding: false,
        label: 'Drug Class'
    },
    {
        id: 'type',
        numeric: true,
        disablePadding: false,
        label: 'Type'
    },
    {
        id: 'group',
        numeric: true,
        disablePadding: false,
        label: 'Group'
    },
    {
        id: 'comment',
        numeric: true,
        disablePadding: false,
        label: 'Comment'
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action'
    }
];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof IMaster) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof IMaster) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.id === 'action' ? 'center' : 'left'}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const Master = () => {
    const masterItemsSelector = useAppSelector(selectMasterItems);
    const { keyword } = useAppSelector(selectKeyword);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);

    const [masterItemId, setMasterItemId] = useState<number>(0);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElDelete, setAnchorElDelete] = useState<null | HTMLElement>(null);

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof IMaster>('item');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IMaster) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        if (keyword === '') {
            dispatch(getMasterItemsThunk(page));
        } else {
            dispatch(filterMasterItemsThunk({ keyword: keyword, page: page }));
        }
    }, [dispatch, keyword, page]);

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
        )
            .then((response) => {
                console.log(response.payload);
            })
            .catch((error: Error) => console.error(error.message));
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
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={masterItemsSelector.response.content.length}
                    />
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
                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <IconButton
                                                onClick={(event: MouseEvent<HTMLElement>) =>
                                                    handleEditClick(event, masterItem)
                                                }>
                                                <ModeEditIcon color="primary" fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                onClick={(event: MouseEvent<HTMLElement>) =>
                                                    handleIconClick(event, masterItem.id, 'ASSIGN')
                                                }>
                                                <AssignmentTurnedInIcon color="primary" fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                onClick={(event: MouseEvent<HTMLElement>) =>
                                                    handleIconClick(event, masterItem.id, 'DELETE')
                                                }>
                                                <DeleteIcon color="primary" fontSize="small" />
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
                key="profile-menu"
                id="profile-menu"
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
                key="delete-menu"
                id="delete-menu"
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
