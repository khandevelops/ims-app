import {
    Backdrop,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Pagination,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginRequest } from '../config/authConfig';
import { callProfilesMsGraph } from '../config/graph';
import { useMsal } from '@azure/msal-react';
import {
    changeProfileDetails,
    filterProfileDetailsThunk,
    getProfileDetailsThunk,
    selectProfileDetails,
    syncProfileDetailsThunk
} from '../app/slice/profileDetail/profileDetailsSlice';
import { PERMISSION, ROLE } from '../common/constants';
import { updateProfileDetailThunk } from '../app/slice/profileDetail/profileDetailSlice';
import {
    changeDepartmentName,
    getDepartmentNamesThunk,
    selectDepartmentNames
} from '../app/slice/departmentName/departmentNamesSlice';
import {
    departmentNameCreateThunk,
    departmentNameDeleteThunk,
    departmentNameUpdateThunk
} from '../app/slice/departmentName/departmentNameActionSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { IProfileDetail } from '../app/api/properties/IProfileDetail';

const columns: { field: string; headerName: string }[] = [
    { field: 'displayName', headerName: 'Name' },
    { field: 'department', headerName: 'Department' },
    { field: 'role', headerName: 'Role' },
    { field: 'permission', headerName: 'Permission' }
];

const Dashboard = () => {
    const departmentNamesSelector = useAppSelector(selectDepartmentNames);
    const { instance, accounts } = useMsal();
    const dispatch = useAppDispatch();
    const profileDetailsSelector = useAppSelector(selectProfileDetails);
    const [departmentName, setDepartmentName] = useState<string>('');
    const [edit, setEdit] = useState<{ action: boolean; id: number }>({ action: false, id: 0 });
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle');

    useEffect(() => {
        setLoading('loading');
        dispatch(getDepartmentNamesThunk())
            .then(() => {
                dispatch(getProfileDetailsThunk(page - 1))
                    .then(() => {
                        setLoading('success');
                    })
                    .catch((error: Error) => console.error(error.message));
            })
            .catch((error: Error) => console.error(error.message));
    }, []);

    const requestProfileData = () => {
        setLoading('loading');
        getAccessToken().then((response) => {
            callProfilesMsGraph(response.accessToken).then((response) => {
                dispatch(syncProfileDetailsThunk({ profileDetails: response.value, page: page }))
                    .then(() => {
                        dispatch(getProfileDetailsThunk(page))
                            .then(() => {
                                setLoading('success');
                            })
                            .catch((error: Error) => console.error(error.message));
                    })
                    .catch((error: Error) => console.error(error.message));
            });
        });
    };

    const handleSelectChange = (id: string, event: SelectChangeEvent) => {
        const profileDetail = profileDetailsSelector.response.content.find((profileDetail) => profileDetail.id === id);
        if (profileDetail) {
            dispatch(
                updateProfileDetailThunk({
                    id: id,
                    profileDetail: { ...profileDetail, [event.target.name as keyof IProfileDetail]: event.target.value }
                })
            ).then((profileDetailResponse) => {
                dispatch(
                    changeProfileDetails(
                        profileDetailsSelector.response.content.map((profileDetail) => ({
                            ...profileDetail,
                            [event.target.name as keyof IProfileDetail]:
                                profileDetail.id === id
                                    ? profileDetailResponse.payload[event.target.name as keyof IProfileDetail]
                                    : profileDetail[event.target.name as keyof IProfileDetail]
                        }))
                    )
                );
            });
        }
    };

    const updateDepartmentName = (id: number): void => {
        const departmentName = departmentNamesSelector.departmentNames.find((name) => name.id === id);
        if (departmentName) {
            dispatch(departmentNameUpdateThunk({ id: id, name: departmentName.name, mapping: departmentName.mapping }))
                .then((response) => {
                    setEdit({ action: false, id: 0 });
                    dispatch(
                        changeDepartmentName(
                            departmentNamesSelector.departmentNames.map((department) => ({
                                ...department,
                                name: department.id === id ? response.payload.name : department.name,
                                mapping: department.id === id ? response.payload.mapping : department.mapping
                            }))
                        )
                    );
                })
                .catch((error: Error) => console.error(error.message));
        }
    };

    const createDepartmentName = () => {
        dispatch(departmentNameCreateThunk({ name: departmentName, mapping: departmentName }))
            .then((response) => {
                setDepartmentName('');
                dispatch(changeDepartmentName([...departmentNamesSelector.departmentNames, response.payload]));
            })
            .catch((error: Error) => console.error(error.message));
    };

    const deleteDepartmentName = (id: number): void => {
        dispatch(departmentNameDeleteThunk(id))
            .then((response) => {
                dispatch(
                    changeDepartmentName(
                        departmentNamesSelector.departmentNames.filter(
                            (department) => response.payload.id !== department.id
                        )
                    )
                );
            })
            .catch((error: Error) => console.error(error.message));
    };

    const handleChangeDepartmentName = (event: ChangeEvent<HTMLInputElement>, id: number) => {
        dispatch(
            changeDepartmentName(
                departmentNamesSelector.departmentNames.map((name) => ({
                    ...name,
                    name: name.id === id ? event.target.value : name.name,
                    mapping: name.id === id ? event.target.value : name.mapping
                }))
            )
        );
    };

    const getAccessToken = async () => {
        return await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        });
    };

    const handleCancel = () => {
        setEdit({ action: false, id: 0 });
        dispatch(getDepartmentNamesThunk());
    };

    const handlePageChange = (param: any, page: number) => {
        dispatch(getProfileDetailsThunk(page - 1));
        setPage(page);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(filterProfileDetailsThunk({ displayName: event.target.value, page: page - 1 }));
    };

    return (
        <Fragment>
            {loading === 'loading' && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading === 'loading'}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ height: '80vh', padding: 5 }}>
                    <Grid container gap={4}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" color="text.secondary">
                                        IMPORTANT!
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%'
                                    }}>
                                    <Button onClick={requestProfileData}>SYNC ALL USER INFORMATION</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} height={1}>
                            <Card>
                                <CardContent sx={{ textAlign: 'center', overflowY: 'auto', height: '58vh' }}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        label="Department Name"
                                        variant="outlined"
                                        size="medium"
                                        value={departmentName}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton onClick={createDepartmentName}>
                                                    <AddCircleIcon />
                                                </IconButton>
                                            )
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        sx={{ marginBottom: 4, marginTop: 2 }}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                            setDepartmentName(event.target.value)
                                        }
                                    />
                                    <List>
                                        <Divider />
                                        {departmentNamesSelector.departmentNames &&
                                            departmentNamesSelector.departmentNames.length > 0 &&
                                            departmentNamesSelector.departmentNames.map((department, index) => (
                                                <Fragment key={index}>
                                                    {edit.action && department.id === edit.id ? (
                                                        <TextField
                                                            id="name"
                                                            fullWidth
                                                            variant="outlined"
                                                            value={department.name}
                                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                                handleChangeDepartmentName(event, department.id)
                                                            }
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <Fragment>
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                updateDepartmentName(department.id)
                                                                            }>
                                                                            <CheckIcon />
                                                                        </IconButton>
                                                                        <IconButton onClick={handleCancel}>
                                                                            <CloseIcon />
                                                                        </IconButton>
                                                                    </Fragment>
                                                                )
                                                            }}
                                                            size="medium"
                                                        />
                                                    ) : (
                                                        <ListItem>
                                                            <ListItemText primary={department.name} />
                                                            <ListItemIcon>
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    onClick={() =>
                                                                        setEdit({
                                                                            action: true,
                                                                            id: department.id ? department.id : 0
                                                                        })
                                                                    }>
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    aria-label="update"
                                                                    onClick={() => deleteDepartmentName(department.id)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </ListItemIcon>
                                                        </ListItem>
                                                    )}
                                                    <Divider />
                                                </Fragment>
                                            ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                    sx={{ paddingTop: 5, paddingRight: 5, paddingBottom: 5 }}>
                    <Paper>
                        <TableContainer sx={{ height: '65vh' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {columns.length > 0 &&
                                            columns.map((column) => (
                                                <TableCell
                                                    key={column.field}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <Box>{column.headerName}</Box>
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {profileDetailsSelector &&
                                        profileDetailsSelector.response &&
                                        profileDetailsSelector.response.content &&
                                        profileDetailsSelector.response.content.length > 0 &&
                                        profileDetailsSelector.response.content.map((profile, index) => (
                                            <Fragment key={index}>
                                                <TableRow>
                                                    <TableCell sx={{ width: 500 }}>{profile.displayName}</TableCell>
                                                    <TableCell sx={{ width: 200 }}>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                size="small"
                                                                id={profile.userPrincipalName}
                                                                name="department"
                                                                value={profile.department}
                                                                onChange={(event: SelectChangeEvent) =>
                                                                    handleSelectChange(profile.id, event)
                                                                }>
                                                                {departmentNamesSelector.departmentNames.map(
                                                                    (department, index) => (
                                                                        <MenuItem key={index} value={department.name}>
                                                                            <Typography sx={{ fontSize: '10pt' }}>
                                                                                {department.name}
                                                                            </Typography>
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell sx={{ width: 200 }}>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                size="small"
                                                                id={profile.userPrincipalName}
                                                                name="role"
                                                                value={profile.role}
                                                                onChange={(event: SelectChangeEvent) =>
                                                                    handleSelectChange(profile.id, event)
                                                                }>
                                                                {Object.values(ROLE).map((role, index) => (
                                                                    <MenuItem key={index} value={role}>
                                                                        <Typography sx={{ fontSize: '10pt' }}>
                                                                            {role}
                                                                        </Typography>
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell sx={{ width: 200 }}>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                size="small"
                                                                id={profile.userPrincipalName}
                                                                name="permission"
                                                                value={profile.permission}
                                                                onChange={(event: SelectChangeEvent) =>
                                                                    handleSelectChange(profile.id, event)
                                                                }>
                                                                {Object.values(PERMISSION).map((role, index) => (
                                                                    <MenuItem key={index} value={role}>
                                                                        <Typography sx={{ fontSize: '10pt' }}>
                                                                            {role}
                                                                        </Typography>
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                            </Fragment>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingTop: 2,
                                paddingBottom: 2
                            }}>
                            <TextField
                                size="small"
                                sx={{ width: '30rem' }}
                                onChange={handleSearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Pagination
                                count={profileDetailsSelector.response.totalPages}
                                page={page}
                                onChange={handlePageChange}
                                shape="rounded"
                            />
                        </Toolbar>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Dashboard;
