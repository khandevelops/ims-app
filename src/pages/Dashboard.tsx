import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginRequest } from '../config/authConfig';
import { callProflesMsGraph } from '../config/graph';
import { useMsal } from '@azure/msal-react';
import { getProfiles, selectProfiles } from '../app/profilesSlice';
import {
    changeProfileDetails,
    selectProfileDetails,
    syncProfileDetailsThunk
} from '../app/profileDetail/profileDetailsSlice';
import { DEPARTMENT, PERMISSION, ROLE } from '../common/constants';
import { updateProfileDetailThunk } from '../app/profileDetail/profileDetailSlice';
import { getDepartmentNamesThunk, selectDepartmentNames } from '../app/profileDetail/departmentNamesSlice';
import {
    departmentNameCreateThunk,
    departmentNameDeleteThunk,
    departmentNameUpdateThunk
} from '../app/profileDetail/departmentNameCreateSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
    const [profiles, setProfiles] = useState<{ id: string; displayName: string; mail: string }[]>([]);
    const [departmentName, setDepartmentName] = useState<string>('');

    useEffect(() => {
        dispatch(getDepartmentNamesThunk());
        // instance
        //     .acquireTokenSilent({
        //         ...loginRequest,
        //         account: accounts[0]
        //     })
        //     .then((response) => {
        //         callProflesMsGraph(response.accessToken).then((response) => {
        //             setProfiles(response.value);
        //             dispatch(getProfiles(response.value));
        //         });
        //     });
        // dispatch(getProfileDetailsThunk());
    }, [accounts, dispatch, instance]);

    const getProfileDetail = (id: string) => {
        return profileDetailsSelector.profileDetails.find((profile) => profile.id === id);
    };

    const requestProfileData = () => {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            })
            .then((response) => {
                callProflesMsGraph(response.accessToken).then((response) => {
                    dispatch(syncProfileDetailsThunk(response.value));
                });
            });
    };

    const handleDepartmentChange = (id: string, event: SelectChangeEvent) => {
        const profileDetail = profileDetailsSelector.profileDetails.find((profileDetail) => profileDetail.id === id);
        if (profileDetail) {
            dispatch(
                updateProfileDetailThunk({
                    id: id,
                    profileDetail: { ...profileDetail, department: event.target.value }
                })
            ).then((profileDetailResponse) => {
                dispatch(
                    changeProfileDetails(
                        profileDetailsSelector.profileDetails.map((profileDetail) => ({
                            ...profileDetail,
                            department:
                                profileDetail.id === id
                                    ? profileDetailResponse.payload.department
                                    : profileDetail.department
                        }))
                    )
                );
            });
        }
    };

    const handleRoleChange = (id: string, event: SelectChangeEvent) => {
        const profileDetail = profileDetailsSelector.profileDetails.find((profileDetail) => profileDetail.id);
        if (profileDetail) {
            dispatch(
                updateProfileDetailThunk({
                    id: id,
                    profileDetail: { ...profileDetail, role: event.target.value }
                })
            ).then((profileDetailResponse) => {
                dispatch(
                    changeProfileDetails(
                        profileDetailsSelector.profileDetails.map((profileDetail) => ({
                            ...profileDetail,
                            role: profileDetail.id === id ? profileDetailResponse.payload.role : profileDetail.role
                        }))
                    )
                );
            });
        }
    };

    const handlePermissionChange = (id: string, event: SelectChangeEvent) => {
        const profileDetail = profileDetailsSelector.profileDetails.find((profileDetail) => profileDetail.id);
        if (profileDetail) {
            dispatch(
                updateProfileDetailThunk({
                    id: id,
                    profileDetail: { ...profileDetail, permission: event.target.value }
                })
            ).then((profileDetailResponse) => {
                dispatch(
                    changeProfileDetails(
                        profileDetailsSelector.profileDetails.map((profileDetail) => ({
                            ...profileDetail,
                            permission: profileDetail.id
                                ? profileDetailResponse.payload.permission
                                : profileDetail.permission
                        }))
                    )
                );
            });
        }
    };

    const createDepartmentName = () => {
        dispatch(departmentNameCreateThunk({ name: departmentName, mapping: departmentName }));
    };

    const updateDepartmentName = (id: number | undefined) => {
        if (id) {
            dispatch(
                departmentNameUpdateThunk({
                    id: id,
                    departmentName: { name: departmentName, mapping: departmentName }
                })
            );
        }
    };

    const deleteDepartmentName = (id: number | undefined) => {
        if (id) {
            dispatch(departmentNameDeleteThunk(id));
        }
    };

    return (
        <Grid container sx={{ height: '100%' }}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ padding: 5 }}>
                <Grid container justifyContent="stretch" alignItems="stretch" sx={{ height: '100%' }}>
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
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, marginBottom: 2 }}>
                            <TextField
                                id="name"
                                label="Department Name"
                                variant="outlined"
                                size="small"
                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                    setDepartmentName(event.target.value)
                                }
                            />
                            <Button onClick={createDepartmentName}>ADD</Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 3 }}>
                            {departmentNamesSelector.departmentNames.map((department, index) => (
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }} key={index}>
                                    <TextField
                                        id="name"
                                        label="get"
                                        variant="outlined"
                                        value={department.name}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                            setDepartmentName(event.target.value)
                                        }
                                        size="small"
                                    />
                                    <IconButton aria-label="delete" onClick={() => updateDepartmentName(department.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => dispatch(deleteDepartmentName(department.id))}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8} sx={{ padding: 5 }}>
                <TableContainer sx={{ height: '70vh' }} component={Paper} elevation={3}>
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
                            {profiles &&
                                profiles.length > 0 &&
                                profiles.map((profile, index) => (
                                    <Fragment key={index}>
                                        <TableRow>
                                            <TableCell sx={{ width: 500 }}>{profile.displayName}</TableCell>
                                            <TableCell sx={{ width: 200 }}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        variant="standard"
                                                        size="small"
                                                        id={profile.mail}
                                                        name="department"
                                                        value={getProfileDetail(profile.id)?.department}
                                                        onChange={(event: SelectChangeEvent) =>
                                                            handleDepartmentChange(profile.id, event)
                                                        }>
                                                        {Object.values(DEPARTMENT).map((department, index) => (
                                                            <MenuItem key={index} value={department}>
                                                                <Typography sx={{ fontSize: '10pt' }}>
                                                                    {department}
                                                                </Typography>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell sx={{ width: 200 }}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        variant="standard"
                                                        size="small"
                                                        id={profile.mail}
                                                        value={getProfileDetail(profile.id)?.role}
                                                        onChange={(event: SelectChangeEvent) =>
                                                            handleRoleChange(profile.id, event)
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
                                                        variant="standard"
                                                        size="small"
                                                        id={profile.mail}
                                                        value={getProfileDetail(profile.id)?.permission}
                                                        onChange={(event: SelectChangeEvent) =>
                                                            handlePermissionChange(profile.id, event)
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
            </Grid>
        </Grid>
    );
};

export default Dashboard;
