import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginRequest } from '../config/authConfig';
import { callProflesMsGraph } from '../config/graph';
import { useMsal } from '@azure/msal-react';
import { getProfiles, selectProfiles } from '../app/profilesSlice';
import { changeProfileDetails, createProfileDetailsThunk, getProfileDetailsThunk, selectProfileDetails, syncProfileDetailsThunk } from '../app/profileDetail/profileDetailsSlice';
import { department, permission, role } from '../common/constants';
import { iProfileDetail, updateProfileDetailThunk } from '../app/profileDetail/profileDetailSlice';

const columns: { field: string; headerName: string }[] = [
    { field: 'displayName', headerName: 'Name' },
    { field: 'department', headerName: 'Department' },
    { field: 'role', headerName: 'Role' },
    { field: 'permission', headerName: 'Permission' }
];

const Dashboard = () => {
    const { instance, accounts } = useMsal();
    const dispatch = useAppDispatch();
    const profilesSelector = useAppSelector(selectProfiles);
    const profileDetailsSelector = useAppSelector(selectProfileDetails);

    useEffect(() => {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            })
            .then((response) => {
                callProflesMsGraph(response.accessToken).then((response) => {
                    dispatch(getProfiles(response.value));
                });
            });
        dispatch(getProfileDetailsThunk());
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
                    response.value = response.value.map((user: any) => ({ id: user.id }));
                    dispatch(syncProfileDetailsThunk(response.value));
                });
            });
    };

    const handleDepartmentChange = (event: SelectChangeEvent, id: string) => {
        const profileDetail = profileDetailsSelector.profileDetails.find((profileDetail) => profileDetail.id === id);
        if (profileDetail) {
            const profileDetailRequest = { ...profileDetail, department: event.target.value };
            dispatch(updateProfileDetailThunk({ profileDetail: profileDetailRequest, id: id })).then((profileDetailResponse) => {
                dispatch(
                    changeProfileDetails(
                        profileDetailsSelector.profileDetails.map((profileDetail) => ({
                            ...profileDetail,
                            department: profileDetail.id === id ? profileDetailResponse.payload.department : profileDetail.department
                        }))
                    )
                );
            });
        }
    };

    const handleRoleChange = (event: SelectChangeEvent, id: string) => {
        const profileDetail = profileDetailsSelector.profileDetails.find((profileDetail) => profileDetail.id === id);
        if (profileDetail) {
            const profileDetailRequest = { ...profileDetail, role: event.target.value };
            dispatch(updateProfileDetailThunk({ profileDetail: profileDetailRequest, id: id })).then((profileDetailResponse) => {
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

    const handlePermissionChange = (event: SelectChangeEvent, id: string) => {
        const profileDetail = profileDetailsSelector.profileDetails.find((profileDetail) => profileDetail.id === id);
        if (profileDetail) {
            const profileDetailRequest = { ...profileDetail, permission: event.target.value };
            dispatch(updateProfileDetailThunk({ id: id, profileDetail: profileDetailRequest })).then((profileDetailResponse) => {
                dispatch(
                    changeProfileDetails(
                        profileDetailsSelector.profileDetails.map((profileDetail) => ({
                            ...profileDetail,
                            permission: profileDetail.id === id ? profileDetailResponse.payload.permission : profileDetail.permission
                        }))
                    )
                );
            });
        }
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ padding: 2 }}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" color="text.secondary">
                                    IMPORTANT!
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ textAlign: 'center', width: '100%' }}>
                                <Button onClick={requestProfileData}>SYNC ALL USER INFORMATION</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}></Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}></Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}></Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}></Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}></Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}></Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}></Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8} sx={{ padding: 2 }}>
                {' '}
                <Paper elevation={8}>
                    <TableContainer sx={{ height: '70vh' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.length > 0 &&
                                        columns.map((column) => (
                                            <TableCell key={column.field} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <Box>{column.headerName}</Box>
                                            </TableCell>
                                        ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {profilesSelector &&
                                    profilesSelector.profiles &&
                                    profilesSelector.profiles.length > 0 &&
                                    profilesSelector.profiles.map((profile, index) => (
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
                                                            onChange={(event: SelectChangeEvent) => handleDepartmentChange(event, profile.id)}>
                                                            {Object.values(department).map((department, index) => (
                                                                <MenuItem key={index} value={department}>
                                                                    <Typography sx={{ fontSize: '10pt' }}>{department}</Typography>
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
                                                            onChange={(event: SelectChangeEvent) => handleRoleChange(event, profile.id)}>
                                                            {Object.values(role).map((role, index) => (
                                                                <MenuItem key={index} value={role}>
                                                                    <Typography sx={{ fontSize: '10pt' }}>{role}</Typography>
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
                                                            onChange={(event: SelectChangeEvent) => handlePermissionChange(event, profile.id)}>
                                                            {Object.values(permission).map((role, index) => (
                                                                <MenuItem key={index} value={role}>
                                                                    <Typography sx={{ fontSize: '10pt' }}>{role}</Typography>
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
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
