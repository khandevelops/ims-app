import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDrawerToggleType, toggleDrawer } from '../../app/slice/drawerToggle/drawerToggleTypeSlice';
import { CATEGORY, DEPARTMENT, DRAWER_TOGGLE_TYPE } from '../../common/constants';
import { updateMasterItemThunk } from '../../app/slice/master/masterItemUpdateSlice';
import { createMasterItemThunk } from '../../app/slice/master/masterItemCreateSlice';
import { changeMasterItems, selectMasterItems } from '../../app/slice/master/masterItemsSlice';

const MasterUpdateForm = () => {
    const dispatch = useAppDispatch();
    const masterItemsSelector = useAppSelector(selectMasterItems);
    const drawer = useAppSelector(selectDrawerToggleType);
    const { type, masterItem } = drawer;

    const [departments, setDepartments] = useState<string[]>([]);

    const handleSubmit = () => {
        if (masterItem) {
            if (type === DRAWER_TOGGLE_TYPE.ADD_MASTER_ITEM) {
                dispatch(createMasterItemThunk({ masterItem: masterItem, departments: departments }));
            }
            if (type === DRAWER_TOGGLE_TYPE.UPDATE_MASTER_ITEM) {
                dispatch(updateMasterItemThunk(masterItem))
                    .then((response) => {
                        dispatch(
                            changeMasterItems(
                                masterItemsSelector.response.content.map((masterItem) => {
                                    return masterItem.id === response.payload.id
                                        ? { ...masterItem, ...response.payload }
                                        : masterItem;
                                })
                            )
                        );
                    })
                    .catch((error: Error) => console.error(error.message));
            }
            dispatch(toggleDrawer({ type: '' }));
        }
    };

    const handleCancel = () => {
        dispatch(toggleDrawer({ type: '' }));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>, masterItemKey: string) => {
        masterItem &&
            Object.keys(masterItem).forEach((key) => {
                if (key === masterItemKey) {
                    dispatch(toggleDrawer({ ...drawer, masterItem: { ...masterItem, [key]: event.target.value } }));
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
        if (masterItem) {
            dispatch(toggleDrawer({ ...drawer, masterItem: { ...masterItem, category: event.target.value } }));
        }
    };

    return (
        <Box sx={{ padding: 5 }}>
            <Grid container>
                {type === DRAWER_TOGGLE_TYPE.ADD_MASTER_ITEM && (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                        <TextField
                            sx={{ width: '100%' }}
                            id=""
                            label="ID"
                            variant="outlined"
                            size="small"
                            value={masterItem && masterItem.id}
                            disabled
                        />
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
                        value={masterItem && masterItem.item}
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
                        value={masterItem && masterItem.manufacturer}
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
                        value={masterItem && masterItem.recent_cn}
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
                        value={masterItem && masterItem.part_number}
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
                        value={masterItem && masterItem.recent_vendor}
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
                        value={masterItem && masterItem.fisher_cn}
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
                        value={masterItem && masterItem.vwr_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'vwr_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="lab_source_cn"
                        label="LAB SOURCE CN"
                        variant="outlined"
                        size="small"
                        value={masterItem && masterItem.lab_source_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'lab_source_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="other_cn"
                        label="OTHER CN"
                        variant="outlined"
                        size="small"
                        value={masterItem && masterItem.other_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'other_cn')}
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
                        value={masterItem && masterItem.purchase_unit}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'purchase_unit')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="unit_price"
                        label="UNIT PRICE"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        size="small"
                        value={masterItem && masterItem.unit_price}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'unit_price')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            id="category"
                            labelId="category"
                            label="Category"
                            value={masterItem && masterItem.category}
                            onChange={handleCategoryChange}
                            sx={{ width: '100%' }}
                            size="small">
                            {Object.keys(CATEGORY).map((category) => (
                                <MenuItem value={category}>{category.split('_').join(' ')}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="drug_class"
                        label="DRUG CLASS"
                        variant="outlined"
                        size="small"
                        value={masterItem && masterItem.drug_class}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'drug_class')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 1 }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="type"
                        label="TYPE"
                        variant="outlined"
                        size="small"
                        value={masterItem && masterItem.type}
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
                        value={masterItem && masterItem.group}
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
                        value={masterItem && masterItem.comment}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'comment')}
                    />
                </Grid>
            </Grid>

            {type === DRAWER_TOGGLE_TYPE.ADD_MASTER_ITEM && (
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} justifyContent="center">
                        <FormGroup
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: '100%',
                                paddingTop: 3
                            }}>
                            {Object.values(DEPARTMENT).map((department, index) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={handleCheckboxChange}
                                            checked={departments.some(
                                                (departmentName) => departmentName === department
                                            )}
                                            name={department}
                                        />
                                    }
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
                        {type === DRAWER_TOGGLE_TYPE.ADD_MASTER_ITEM ? 'ADD' : 'UPDATE'}
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

export default MasterUpdateForm;