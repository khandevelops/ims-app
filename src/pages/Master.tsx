import { MouseEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMasterItemsThunk, selectMasterItems } from '../app/master/masterItemSlice';
import { selectMasterFormDrawer, toggleDrawer, setForm } from '../app/master/masterFormDrawerUpdateSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    TablePagination,
    Drawer,
    IconButton,
    Paper,
    Box,
    styled
} from '@mui/material';
import MasterForm from '../components/UpdateMasterForm';
import { populateMasterItem } from '../app/master/masterFormSlice';
import { IMasterItem } from '../app/master/masterItemSlice';
import { tableCellClasses } from '@mui/material/TableCell';
import { Height } from '@mui/icons-material';

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

const columns: { field: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', headerName: <Checkbox /> },
    { field: 'item', headerName: 'Item' },
    { field: 'manufacturer', headerName: 'Manufacturer' },
    { field: 'recent_cn', headerName: 'Recent CN' },
    { field: 'part_number', headerName: 'Part Number' },
    { field: 'recent_vendor', headerName: 'Recent Vendor' },
    { field: 'fisher_cn', headerName: 'Fisher CN' },
    { field: 'vwr_cn', headerName: 'VWR CN' },
    { field: 'lab_source_cn', headerName: 'Lab Source CN' },
    { field: 'next_advance_cn', headerName: 'Other CN' },
    { field: 'purchase_unit', headerName: 'Purchase Unit' },
    { field: 'average_unit_price', headerName: 'Average Unit Price' },
    { field: 'comments', headerName: 'Comments' },
    { field: 'category', headerName: 'Category' },
    { field: 'type', headerName: 'Type' },
    { field: 'group', headerName: 'Group' },
    { field: 'nore', headerName: 'More' }
];

const Master = () => {
    const masterItemsSelector = useAppSelector(selectMasterItems);
    const rightDrawerSelector = useAppSelector(selectMasterFormDrawer);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);

    useEffect(() => {
        dispatch(getMasterItemsThunk({ page: page, size: size }));
    }, [dispatch, page, size, rightDrawerSelector]);

    const handleChangePage = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMoreClick = (event: MouseEvent<HTMLElement>, masterItem: IMasterItem) => {
        dispatch(toggleDrawer(true));
        dispatch(setForm('update'));
        dispatch(populateMasterItem(masterItem));
    };

    return (
        <Box sx={{paddingTop: 3, paddingLeft: 1, paddingRight: 1}}>
            <Paper elevation={3}>
                <TableContainer sx={{height: 750}}>
                    <Table stickyHeader size="small">
                        <TableHead sx={{backgroundColor: 'grey'}}>
                            <TableRow>
                                {columns.length > 0 &&
                                    columns.map((column) => (
                                        <StyledTableCell
                                            key={column.field}>
                                            {column.headerName}
                                        </StyledTableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {masterItemsSelector.response.content.length > 0 &&
                                masterItemsSelector.response.content.map((masterItem, index) => (
                                    <TableRow
                                        key={index}
                                        >
                                        <StyledTableCell >
                                            <Checkbox/>
                                        </StyledTableCell>
                                        <StyledTableCell>{masterItem.item}</StyledTableCell>
                                        <StyledTableCell>{masterItem.manufacturer}</StyledTableCell>
                                        <StyledTableCell>{masterItem.recent_cn}</StyledTableCell>
                                        <StyledTableCell>{masterItem.part_number}</StyledTableCell>
                                        <StyledTableCell>{masterItem.recent_vendor}</StyledTableCell>
                                        <StyledTableCell>{masterItem.fisher_cn}</StyledTableCell>
                                        <StyledTableCell>{masterItem.vwr_cn}</StyledTableCell>
                                        <StyledTableCell>{masterItem.lab_source_cn}</StyledTableCell>
                                        <StyledTableCell>{masterItem.next_advance_cn}</StyledTableCell>
                                        <StyledTableCell>{masterItem.purchase_unit}</StyledTableCell>
                                        <StyledTableCell>{masterItem.average_unit_price}</StyledTableCell>
                                        <StyledTableCell sx={{fontSize: 12, maxWidth: '200px' }}>{masterItem.comments}</StyledTableCell>
                                        <StyledTableCell>{masterItem.category}</StyledTableCell>
                                        <StyledTableCell>{masterItem.type}</StyledTableCell>
                                        <StyledTableCell>{masterItem.group}</StyledTableCell>
                                        <StyledTableCell>
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                onClick={(event: MouseEvent<HTMLElement>) =>
                                                    handleMoreClick(event, masterItem)
                                                }>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 50, 100]}
                    component="div"
                    count={masterItemsSelector.response.totalElements}
                    rowsPerPage={masterItemsSelector.response.size}
                    page={masterItemsSelector.response.number}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Paper>
        </Box>
    );
};

export default Master;
