import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createMasterItemThunk, populateMasterItem, selectMasterForm, updateMasterItemThunk } from '../app/master/masterFormSlice';
import { IMasterItem } from '../app/master/masterItemSlice';
import { selectDrawerToggleType, toggleDrawer } from '../app/drawerToggle/drawerToggleTypeSlice';
import { category, department, drawerToggleType } from '../common/constants';

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
    comment: '',
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

    const [departments, setDepartments] = useState<string[]>([]);

    useEffect(() => {
        if (drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FORM) {
            setMasterItem(defaultMasterItem);
            return;
        }
        if (drawerToggleTypeSelector.drawerToggleType === drawerToggleType.UPDATE_MASTER_ITEM_FORM) {
            setMasterItem(masterFormSelector.masterItem);
            return;
        }
    }, [drawerToggleTypeSelector, masterFormSelector]);

    const handleSubmit = () => {
        if (drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FORM) {
            dispatch(createMasterItemThunk({ masterItem: masterItem, departments: departments }));
        }
        if (drawerToggleTypeSelector.drawerToggleType === drawerToggleType.UPDATE_MASTER_ITEM_FORM) {
            dispatch(updateMasterItemThunk({ id: masterItem.id, masterItem: masterItem }));
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

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (departments.some((department) => department === event.target.name)) {
            setDepartments(departments.filter((department) => department !== event.target.name));
        } else {
            setDepartments([...departments, event.target.name]);
        }
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setMasterItem({...masterItem, category: event.target.value})
    };

    return (
        <Box sx={{ padding: 5 }}>
            <Grid container>
                {drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FORM && (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                        <TextField sx={{ width: '100%' }} id="" label="ID" variant="outlined" size="small" value={masterItem.id} disabled />
                    </Grid>
                )}
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="item"
                        label="ITEM"
                        variant="outlined"
                        size="small"
                        value={masterItem.item}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'item')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="manufacturer"
                        label="MANUFACTURER"
                        variant="outlined"
                        size="small"
                        value={masterItem.manufacturer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'manufacturer')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="recent_cn"
                        label="RECENT CN"
                        variant="outlined"
                        size="small"
                        value={masterItem.recent_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'recent_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="part_number"
                        label="PART NUMBER"
                        variant="outlined"
                        size="small"
                        value={masterItem.part_number}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'part_number')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="recent_vendor"
                        label="RECENT VENDOR"
                        variant="outlined"
                        size="small"
                        value={masterItem.recent_vendor}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'recent_vendor')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="fisher_cn"
                        label="FISHER CN"
                        variant="outlined"
                        size="small"
                        value={masterItem.fisher_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'fisher_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="vwr_cn"
                        label="VWR CN"
                        variant="outlined"
                        size="small"
                        value={masterItem.vwr_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'vwr_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="lab_source_cn"
                        label="SOURCE CN"
                        variant="outlined"
                        size="small"
                        value={masterItem.lab_source_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'lab_source_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="next_advance_cn"
                        label="NEXT ADVANCE CN"
                        variant="outlined"
                        size="small"
                        value={masterItem.next_advance_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'next_advance_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="purchase_unit"
                        label="PURCHASE UNIT"
                        variant="outlined"
                        size="small"
                        value={masterItem.purchase_unit}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'purchase_unit')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
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
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <Select id="category" value={masterItem.category} onChange={handleCategoryChange} sx={{width: '100%'}} size='small'>
                        {Object.keys(category).map((category) => (
                            <MenuItem value={category}>{category.split('_').join(' ')}</MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="type"
                        label="TYPE"
                        variant="outlined"
                        size="small"
                        value={masterItem.type}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'type')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="group"
                        label="GROUP"
                        variant="outlined"
                        size="small"
                        value={masterItem.group}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'group')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ padding: 1 }}>
                    <TextField
                        sx={{ width: '100%', marginTop: 2 }}
                        id="comment"
                        label="COMMENT"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={4}
                        value={masterItem.comment}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'comment')}
                    />
                </Grid>
            </Grid>

            {drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FORM && (
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} justifyContent="center">
                        <FormGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', paddingTop: 3 }}>
                            {Object.values(department).map((department, index) => (
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckboxChange} checked={departments.some((departmentName) => departmentName === department)} name={department} />}
                                    label={department.split('_').join(' ')}
                                    key={index}
                                />
                            ))}
                        </FormGroup>
                    </Grid>
                </Grid>
            )}

            <Grid container gap={5} sx={{ paddingTop: 10 }} justifyContent="center">
                <Grid item>
                    <Button variant="outlined" onClick={handleSubmit} sx={{ width: 200 }}>
                        {drawerToggleTypeSelector.drawerToggleType === drawerToggleType.ADD_MASTER_ITEM_FORM ? 'ADD' : 'UPDATE'}
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ width: 200 }}>
                        CANCEL
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MasterForm;
