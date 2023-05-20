import { MouseEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMasterItemsThunk, selectMasterItems } from '../app/master/masterItemSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TablePagination, IconButton, Paper, Box, styled, Drawer, Tooltip } from '@mui/material';
import { populateMasterItem } from '../app/master/masterFormSlice';
import { IMasterItem } from '../app/master/masterItemSlice';
import { tableCellClasses } from '@mui/material/TableCell';
import { selectDrawerToggleType, toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { drawerToggleType } from '../common/constants';
import MasterForm from '../components/UpdateMasterForm';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffd740',
        fontSize: 13,
        fontWeight: 700,
        color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12
    }
}));

const columns: { field: string; tooltipName: string; headerName: string | JSX.Element }[] = [
    { field: 'checkbox', tooltipName: 'Select', headerName: 'Select' },
    { field: 'item', tooltipName: 'Item', headerName: 'Item' },
    { field: 'manufacturer', tooltipName: 'Manufacturer', headerName: 'M' },
    { field: 'recent_cn', tooltipName: 'Recent CN', headerName: 'RCN' },
    { field: 'part_number', tooltipName: 'Part Number', headerName: 'PN' },
    { field: 'recent_vendor', tooltipName: 'Recent Vendor', headerName: 'RV' },
    { field: 'fisher_cn', tooltipName: 'Fisher CN', headerName: 'FCN' },
    { field: 'vwr_cn', tooltipName: 'VWR CN', headerName: 'VCN' },
    { field: 'lab_source_cn', tooltipName: 'Lab Source CN', headerName: 'LSCN' },
    { field: 'next_advance_cn', tooltipName: 'Other CN', headerName: 'OCN' },
    { field: 'purchase_unit', tooltipName: 'Purchase Unit', headerName: 'PU' },
    { field: 'average_unit_price', tooltipName: 'Average Unit Price', headerName: 'AUP' },
    { field: 'category', tooltipName: 'Category', headerName: 'Ca' },
    { field: 'drug_class', tooltipName: 'Drug Class', headerName: 'DC' },
    { field: 'usage_level', tooltipName: 'Usage Level', headerName: 'UL' },
    { field: 'expiration_date', tooltipName: 'Exp Date', headerName: 'ED' },
    { field: 'received_date', tooltipName: 'Rec Date', headerName: 'RD' },
    { field: 'type', tooltipName: 'Type', headerName: 'Type' },
    { field: 'group', tooltipName: 'Group', headerName: 'Group' },
    { field: 'comments', tooltipName: 'Comment', headerName: 'Comment' },
    { field: 'nore', tooltipName: 'More', headerName: 'More' }
];

const Master = () => {
    const masterItemsSelector = useAppSelector(selectMasterItems);
    const drawerToggleTypeSelector = useAppSelector(selectDrawerToggleType);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        dispatch(getMasterItemsThunk(page));
    }, [dispatch, page]);

    const handleChangePage = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPage(0);
    };

    const handleMoreClick = (event: MouseEvent<HTMLElement>, masterItem: IMasterItem) => {
        dispatch(toggleDrawer(drawerToggleType.UPDATE_MASTER_ITEM_FROM));
        dispatch(populateMasterItem(masterItem));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} component={Paper} elevation={3}>
            <TableContainer sx={{ height: '70vh' }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow sx={{ height: 50 }}>
                            {columns.length > 0 &&
                                columns.map((column) => (
                                    <StyledTableCell key={column.field} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <Tooltip title={column.tooltipName}>
                                            <Box>{column.headerName}</Box>
                                        </Tooltip>
                                    </StyledTableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {masterItemsSelector.response.content.length > 0 &&
                            masterItemsSelector.response.content.map((masterItem, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell>
                                        <Checkbox />
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
                                    <StyledTableCell>{masterItem.category}</StyledTableCell>
                                    <StyledTableCell>{masterItem.drug_class}</StyledTableCell>
                                    <StyledTableCell>{masterItem.usage_level}</StyledTableCell>
                                    <StyledTableCell>{masterItem.expiration_date?.toDateString()}</StyledTableCell>
                                    <StyledTableCell>{masterItem.received_date?.toDateString()}</StyledTableCell>
                                    <StyledTableCell>{masterItem.type}</StyledTableCell>
                                    <StyledTableCell>{masterItem.group}</StyledTableCell>
                                    <StyledTableCell width={200}>{masterItem.comment}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton aria-label="more" id="long-button" onClick={(event: MouseEvent<HTMLElement>) => handleMoreClick(event, masterItem)}>
                                            <MoreVertIcon />
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
        </Box>
    );
};

export default Master;
