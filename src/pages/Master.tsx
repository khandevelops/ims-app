import { MouseEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMasterItems, getMasterItemsThunk, selectMasterItems } from '../app/master/masterItemSlice';
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
    AppBar,
    Toolbar,
    IconButton,
    Paper,
    Box,
    Stack
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MasterForm from '../components/UpdateMasterForm';
import { populateMasterItem } from '../app/master/masterFormSlice';
import { IMasterItem } from '../app/master/masterItemSlice';

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
    { field: 'next_advance_cn', headerName: 'Next Advance CN' },
    { field: 'purchase_unit', headerName: 'Purchase Unit' },
    { field: 'average_unit_price', headerName: 'Average Unit Price' },
    { field: 'category', headerName: 'Category' },
    { field: 'comments', headerName: 'Comments' },
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

    const handleAddClick = () => {
        dispatch(toggleDrawer(true));
        dispatch(setForm('add'));
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Drawer anchor="right" open={rightDrawerSelector.open}>
                <MasterForm />
            </Drawer>
            <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleAddClick}>
                        <AddBoxIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
                sx={{ padding: 2, height: '100%' }}>
                <TableContainer component={Paper}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                {columns.length > 0 &&
                                    columns.map((column) => (
                                        <TableCell 
                                        key={column.field}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >{column.headerName}</TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {masterItemsSelector.response.content.length > 0 &&
                                masterItemsSelector.response.content.map((masterItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>{masterItem.item}</TableCell>
                                        <TableCell>{masterItem.manufacturer}</TableCell>
                                        <TableCell>{masterItem.recent_cn}</TableCell>
                                        <TableCell>{masterItem.part_number}</TableCell>
                                        <TableCell>{masterItem.recent_vendor}</TableCell>
                                        <TableCell>{masterItem.fisher_cn}</TableCell>
                                        <TableCell>{masterItem.vwr_cn}</TableCell>
                                        <TableCell>{masterItem.lab_source_cn}</TableCell>
                                        <TableCell>{masterItem.next_advance_cn}</TableCell>
                                        <TableCell>{masterItem.purchase_unit}</TableCell>
                                        <TableCell>{masterItem.average_unit_price}</TableCell>
                                        <TableCell>{masterItem.category}</TableCell>
                                        <TableCell>{masterItem.comments}</TableCell>
                                        <TableCell>{masterItem.type}</TableCell>
                                        <TableCell>{masterItem.group}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                onClick={(event: MouseEvent<HTMLElement>) =>
                                                    handleMoreClick(event, masterItem)
                                                }>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{ marginTop: 3 }}
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={masterItemsSelector.response.totalElements}
                    rowsPerPage={masterItemsSelector.response.size}
                    page={masterItemsSelector.response.number}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Stack>
        </Box>
    );
};

export default Master;
