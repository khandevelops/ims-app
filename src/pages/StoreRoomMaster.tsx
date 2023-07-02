import React, { useState } from 'react';
import { useEffect, MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';

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
    TextField,
    styled,
    tableCellClasses,
    IconButton
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
    changeStoreRoomMasterItems,
    getStoreRoomMasterItemsThunk,
    selectStoreRoomMasterItems
} from '../app/slice/storeRoom/storeRoomMasterItemsSlice';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DRAWER_TOGGLE_TYPE } from '../common/constants';
import { toggleDrawer } from '../app/slice/drawerToggle/drawerToggleTypeSlice';
import { updateStoreRoomItemThunk } from '../app/slice/storeRoom/storeRoomUpdateSlice';
import { IStoreRoomMaster } from '../app/api/properties/IStoreRoom';
import { getTotalAmount } from '../app/slice/totalAmount';

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
        field: 'part_number',
        tooltipName: 'Part Number',
        headerName: 'PN',
        align: 'left'
    },
    {
        field: 'recent_cn',
        tooltipName: 'Recent CN',
        headerName: 'RCN',
        align: 'left'
    },
    {
        field: 'location',
        tooltipName: 'Location',
        headerName: 'L',
        align: 'left'
    },
    {
        field: 'total_quantity',
        tooltipName: 'Total Quantity',
        headerName: 'TQ',
        align: 'left'
    },
    {
        field: 'usage_level',
        tooltipName: 'Usage Level',
        headerName: 'UL',
        align: 'left'
    },
    {
        field: 'minimum_quantity',
        tooltipName: 'Min Qty',
        headerName: 'MinQ',
        align: 'left'
    },
    {
        field: 'maximum_quantity',
        tooltipName: 'Max Qty',
        headerName: 'MaxQ',
        align: 'left'
    },
    {
        field: 'order_quantity',
        tooltipName: 'Order Qty',
        headerName: 'OQ',
        align: 'left'
    },
    {
        field: 'unit_price',
        tooltipName: 'Unit Price',
        headerName: 'UP',
        align: 'left'
    },
    { field: 'issued', tooltipName: 'Issued', headerName: 'Iss', align: 'left' },
    {
        field: 'received',
        tooltipName: 'Received',
        headerName: 'Rec',
        align: 'left'
    },
    {
        field: 'total_price',
        tooltipName: 'Total Price',
        headerName: 'TP',
        align: 'left'
    },
    {
        field: 'comments',
        tooltipName: 'Comment',
        headerName: 'Comment',
        align: 'left'
    },
    {
        field: 'action',
        tooltipName: 'Edit | Delete',
        headerName: 'Edit | Delete',
        align: 'right'
    }
];

const StoreRoomMaster = () => {
    const storeRoomMasterItemsSelector = useAppSelector(selectStoreRoomMasterItems);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(0);
    const location = useLocation();

    useEffect(() => {
        dispatch(getStoreRoomMasterItemsThunk(page))
            .then((response) => {
                const total = response.payload.content.reduce(
                    (total: number, storeRoomMasterItem: IStoreRoomMaster) =>
                        total + storeRoomMasterItem.masterItem.unit_price * storeRoomMasterItem.quantity,
                    0
                );

                dispatch(getTotalAmount({ totalAmount: total }));
            })
            .catch((error: Error) => console.error(error.message));
    }, [dispatch, location.state, page]);

    const handleChangePage = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPage(0);
    };

    const handleStoreRoomItemUpdate = (id: number, event: KeyboardEvent) => {
        const storeRoomMasterItem = storeRoomMasterItemsSelector.response?.content.find((item) => item.id === id);
        if (storeRoomMasterItem) {
            if (event.key === 'Enter') {
                dispatch(
                    updateStoreRoomItemThunk({
                        id: id,
                        storeRoomItem: {
                            id: storeRoomMasterItem.id,
                            location: storeRoomMasterItem.location,
                            quantity: storeRoomMasterItem.quantity,
                            minimum_quantity: storeRoomMasterItem.minimum_quantity,
                            maximum_quantity: storeRoomMasterItem.maximum_quantity,
                            usage_level: storeRoomMasterItem.usage_level,
                            lot_number: storeRoomMasterItem.lot_number,
                            expiration_date: storeRoomMasterItem.expiration_date,
                            received_date: storeRoomMasterItem.received_date
                        }
                    })
                );
            }
        }
    };

    const handleChangeTotalQty = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            changeStoreRoomMasterItems({
                ...storeRoomMasterItemsSelector.response,
                content: storeRoomMasterItemsSelector.response?.content.map((item) => ({
                    ...item,
                    total_quantity: item.id === id ? event.target.value : item.quantity
                }))
            })
        );
    };

    const getTotalPrice = (unit_price: number, quantity: number) => {
        return unit_price * quantity;
    };

    const handleEditClick = (event: MouseEvent<HTMLElement>, storeRoomMasterItem: IStoreRoomMaster) => {
        if (storeRoomMasterItem) {
            dispatch(
                toggleDrawer({
                    type: DRAWER_TOGGLE_TYPE.UPDATE_DEPARTMENT_ITEM,
                    departmentItem: {
                        id: storeRoomMasterItem.id,
                        location: storeRoomMasterItem.location,
                        quantity: storeRoomMasterItem.quantity,
                        lot_number: storeRoomMasterItem.lot_number,
                        usage_level: storeRoomMasterItem.usage_level,
                        minimum_quantity: storeRoomMasterItem.minimum_quantity,
                        maximum_quantity: storeRoomMasterItem.maximum_quantity,
                        expiration_date: storeRoomMasterItem.expiration_date,
                        received_date: storeRoomMasterItem.received_date
                    }
                })
            );
        }
    };

    const handleDeleteClick = (event: MouseEvent<HTMLElement>, storeRoomMasterItem: IStoreRoomMaster) => {};

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
                        {storeRoomMasterItemsSelector.response &&
                            storeRoomMasterItemsSelector.response.content.length > 0 &&
                            storeRoomMasterItemsSelector.response.content.map((storeRoomMasterItem, index) => (
                                <TableRow key={index} hover>
                                    <StyledTableCell>{storeRoomMasterItem.masterItem.item}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.masterItem.purchase_unit}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.masterItem.part_number}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.masterItem.recent_cn}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.location}</StyledTableCell>
                                    <StyledTableCell>
                                        <TextField
                                            sx={{ width: 70 }}
                                            size="small"
                                            InputProps={{
                                                inputProps: { min: 0 }
                                            }}
                                            id={storeRoomMasterItem.id?.toString()}
                                            value={storeRoomMasterItem.quantity}
                                            onKeyDown={(event: KeyboardEvent) =>
                                                handleStoreRoomItemUpdate(storeRoomMasterItem.id, event)
                                            }
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleChangeTotalQty(storeRoomMasterItem.id, event)
                                            }
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.usage_level}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.minimum_quantity}</StyledTableCell>
                                    <StyledTableCell>{storeRoomMasterItem.maximum_quantity}</StyledTableCell>
                                    <StyledTableCell>order quantity</StyledTableCell>
                                    <StyledTableCell>${storeRoomMasterItem.masterItem.unit_price}</StyledTableCell>
                                    <StyledTableCell>issued</StyledTableCell>
                                    <StyledTableCell>received</StyledTableCell>
                                    <StyledTableCell>
                                        {getTotalPrice(
                                            storeRoomMasterItem.masterItem.unit_price,
                                            storeRoomMasterItem.quantity
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell width={200}>
                                        {storeRoomMasterItem.masterItem.comment}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <IconButton
                                                sx={{ marginLeft: '0.7rem', marginRight: '0.7rem' }}
                                                onClick={(event: MouseEvent<HTMLElement>) =>
                                                    handleEditClick(event, storeRoomMasterItem)
                                                }
                                            >
                                                <ModeEditIcon color="primary" fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                onClick={(event: MouseEvent<HTMLElement>) =>
                                                    handleDeleteClick(event, storeRoomMasterItem)
                                                }
                                            >
                                                <DeleteIcon color="primary" fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {storeRoomMasterItemsSelector.response && (
                <TablePagination
                    sx={{ marginTop: 3 }}
                    rowsPerPageOptions={[]}
                    component="div"
                    count={storeRoomMasterItemsSelector.response.totalElements}
                    rowsPerPage={storeRoomMasterItemsSelector.response.size}
                    page={storeRoomMasterItemsSelector.response.number}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            )}
        </Box>
    );
};

export default StoreRoomMaster;
