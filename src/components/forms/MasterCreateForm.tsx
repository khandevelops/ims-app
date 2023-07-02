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
import { toggleDrawer } from '../../app/slice/drawerToggle/drawerToggleTypeSlice';
import { CATEGORY, DEPARTMENT } from '../../common/constants';
import { createMasterItemThunk } from '../../app/slice/master/masterItemCreateSlice';
import { changeMasterItems, selectMasterItems } from '../../app/slice/master/masterItemsSlice';
import { IMaster } from '../../app/api/properties/IMaster';

const MasterCreateForm = () => {
    const dispatch = useAppDispatch();
    const masterItemsSelector = useAppSelector(selectMasterItems);

    const [departments, setDepartments] = useState<string[]>([]);
    const [masterItem, setMasterItem] = useState<IMaster>({
        item: '',
        manufacturer: '',
        recent_cn: '',
        part_number: '',
        recent_vendor: '',
        fisher_cn: '',
        vwr_cn: '',
        lab_source_cn: '',
        other_cn: '',
        purchase_unit: '',
        unit_price: 0,
        category: '',
        comment: '',
        type: '',
        group: '',
        drug_class: ''
    });

    const handleSubmit = () => {
        if (masterItem) {
            dispatch(
                createMasterItemThunk({
                    masterItem: masterItem,
                    departments: departments
                })
            )
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
                    dispatch(toggleDrawer({ type: '' }));
                })
                .catch((error: Error) => console.error(error.message));
        }
    };

    const handleCancel = () => {
        dispatch(toggleDrawer({ type: '' }));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>, masterItemKey: string) => {
        setMasterItem({ ...masterItem, [masterItemKey]: event.target.value });
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setMasterItem({ ...masterItem, category: event.target.value });
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (departments.some((department) => department === event.target.name)) {
            setDepartments(departments.filter((department) => department !== event.target.name));
        } else {
            setDepartments([...departments, event.target.name]);
        }
    };

    return (
        <Box sx={{ padding: 5 }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    <TextField
                        required
                        sx={{ width: '100%' }}
                        error={false}
                        helperText=""
                        id="item"
                        label="ITEM"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.item}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'item')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="manufacturer"
                        label="MANUFACTURER"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.manufacturer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'manufacturer')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="recent_cn"
                        label="RECENT CN"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.recent_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'recent_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="part_number"
                        label="PART NUMBER"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.part_number}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'part_number')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="recent_vendor"
                        label="RECENT VENDOR"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.recent_vendor}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'recent_vendor')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="fisher_cn"
                        label="FISHER CN"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.fisher_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'fisher_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="vwr_cn"
                        label="VWR CN"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.vwr_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'vwr_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="lab_source_cn"
                        label="LAB SOURCE CN"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.lab_source_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'lab_source_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="other_cn"
                        label="OTHER CN"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.other_cn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'other_cn')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="purchase_unit"
                        label="PURCHASE UNIT"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.purchase_unit}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'purchase_unit')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="unit_price"
                        label="UNIT PRICE"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        size="small"
                        value={masterItem.unit_price}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'unit_price')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    <FormControl fullWidth required>
                        <InputLabel shrink={true} id="category">
                            Category
                        </InputLabel>
                        <Select
                            id="category"
                            labelId="category"
                            label="Category"
                            notched={true}
                            value={masterItem.category}
                            onChange={handleCategoryChange}
                            sx={{ width: '100%' }}
                            size="small"
                        >
                            {Object.keys(CATEGORY).map((category) => (
                                <MenuItem value={category}>{category.split('_').join(' ')}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="drug_class"
                        label="DRUG CLASS"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.drug_class}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'drug_class')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="type"
                        label="TYPE"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.type}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'type')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: '0.75rem 0.5rem' }}>
                    {' '}
                    <TextField
                        sx={{ width: '100%' }}
                        id="group"
                        label="GROUP"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        value={masterItem.group}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'group')}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ padding: '0.75rem 0.5rem' }}>
                    <TextField
                        sx={{ width: '100%', marginTop: 2 }}
                        id="comment"
                        label="COMMENT"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={4}
                        value={masterItem.comment}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, 'comment')}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ padding: '0.75rem 0.5rem' }}>
                    <FormGroup
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                            height: 60,
                            marginTop: 3,
                            backgroundColor: '#ECECEC'
                        }}
                    >
                        {Object.values(DEPARTMENT).map((department, index) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={handleCheckboxChange}
                                        checked={departments.some((departmentName) => departmentName === department)}
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

            <Grid container gap={5} sx={{ marginTop: 5 }} justifyContent="center">
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={handleSubmit}
                        sx={{ width: 200 }}
                        disabled={masterItem.category === '' || masterItem.item === ''}
                    >
                        CREATE
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

export default MasterCreateForm;
