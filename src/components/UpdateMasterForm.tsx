import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addMasterItem, populateMasterItem, selectMasterForm, updateMasterItem } from '../app/master/masterFormSlice';
import { IMasterItem } from '../app/master/masterItemSlice';
import { selectDrawerToggleType, toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { drawerToggleType } from '../common/constants';

const defaultMasterItem = {
    id: 0,
    item: '',
    manufacturer: '',
    recent_cn: '',
    part_number: '',
    recent_vendor: '',
    fisher_cn: '',
    vwr_cn: '',
    lab_source_cn: '',
    next_advance_cn: '',
    purchase_unit: '',
    average_unit_price: 0,
    category: '',
    comments: '',
    type: '',
    group: '',
    drug_class: '',
    usage_level: '',
    expiration_date: null,
    received_date: null
};

const MasterForm = () => {
    const masterFormSelector = useAppSelector(selectMasterForm);
    const drawerToggleTypeSelector = useAppSelector(selectDrawerToggleType);
    const dispatch = useAppDispatch();
    const [masterItem, setMasterItem] = useState<IMasterItem>(defaultMasterItem);

    useEffect(() => {
        if (drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FROM) {
            setMasterItem(defaultMasterItem);
            return;
        }
        if (drawerToggleTypeSelector.drawerToggleType === drawerToggleType.UPDATE_MASTER_ITEM_FROM) {
            setMasterItem(masterFormSelector.masterItem);
            return;
        }
    }, [drawerToggleTypeSelector, masterFormSelector]);

    const handleSubmit = () => {
        if (drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FROM) {
            dispatch(addMasterItem(masterItem));
        }
        if (drawerToggleTypeSelector.drawerToggleType === drawerToggleType.UPDATE_MASTER_ITEM_FROM) {
            dispatch(updateMasterItem({ id: masterItem.id, masterItem: masterItem }));
        }
        dispatch(toggleDrawer(''));
        setMasterItem(defaultMasterItem);
    };

    const handleCancel = () => {
        dispatch(toggleDrawer('')); 
        setMasterItem(defaultMasterItem);
        dispatch(populateMasterItem(defaultMasterItem));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>, masterItemKey: string) => {
        Object.keys(masterItem).forEach((key) => {
            if (key === masterItemKey) {
                setMasterItem((previousMasterItem) => ({ ...previousMasterItem, [key]: event.target.value }));
            }
        });
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {},
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 5,
                gap: 2,
                width: 500,
                height: '100%'
            }}
            noValidate
            autoComplete="off">
            <Stack spacing={2} direction="column">
                { drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FROM && (
                    <TextField
                        sx={{ width: 500 }}
                        id=""
                        label="ID"
                        variant="outlined"
                        size="small"
                        value={masterItem.id}
                        disabled
                    />
                )}

                <TextField
                    sx={{ width: 500 }}
                    id="item"
                    label="ITEM"
                    variant="outlined"
                    size="small"
                    value={masterItem.item}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'item')}
                />

                <TextField
                    sx={{ width: 500 }}
                    id="manufacturer"
                    label="MANUFACTURER"
                    variant="outlined"
                    size="small"
                    value={masterItem.manufacturer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'manufacturer')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="recent_cn"
                    label="RECENT CN"
                    variant="outlined"
                    size="small"
                    value={masterItem.recent_cn}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'recent_cn')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="part_number"
                    label="PART NUMBER"
                    variant="outlined"
                    size="small"
                    value={masterItem.part_number}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'part_number')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="recent_vendor"
                    label="RECENT VENDOR"
                    variant="outlined"
                    size="small"
                    value={masterItem.recent_vendor}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'recent_vendor')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="fisher_cn"
                    label="FISHER CN"
                    variant="outlined"
                    size="small"
                    value={masterItem.fisher_cn}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'fisher_cn')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="vwr_cn"
                    label="VWR CN"
                    variant="outlined"
                    size="small"
                    value={masterItem.vwr_cn}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'vwr_cn')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="lab_source_cn"
                    label="SOURCE CN"
                    variant="outlined"
                    size="small"
                    value={masterItem.lab_source_cn}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'lab_source_cn')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="next_advance_cn"
                    label="NEXT ADVANCE CN"
                    variant="outlined"
                    size="small"
                    value={masterItem.next_advance_cn}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'next_advance_cn')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="purchase_unit"
                    label="PURCHASE UNIT"
                    variant="outlined"
                    size="small"
                    value={masterItem.purchase_unit}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'purchase_unit')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="average_unit_price"
                    label="AVERAGE UNIT PRICE"
                    variant="outlined"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    size="small"
                    value={masterItem.average_unit_price}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'average_unit_price')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="category"
                    label="CATEGORY"
                    variant="outlined"
                    size="small"
                    value={masterItem.category}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'category')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="comments"
                    label="COMMENTS"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                    value={masterItem.comments}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'comments')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="type"
                    label="TYPE"
                    variant="outlined"
                    size="small"
                    value={masterItem.type}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'type')}
                />
                <TextField
                    sx={{ width: 500 }}
                    id="group"
                    label="GROUP"
                    variant="outlined"
                    size="small"
                    value={masterItem.group}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'group')}
                />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
                <Button variant="outlined" fullWidth onClick={handleSubmit}>
                    {drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FROM ? 'ADD' : 'UPDATE'}
                </Button>
                <Button variant="outlined" fullWidth color="secondary" onClick={handleCancel}>
                    CANCEL
                </Button>
            </Stack>
        </Box>
    );
};

export default MasterForm;
