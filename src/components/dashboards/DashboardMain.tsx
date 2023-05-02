import { useMsal } from '@azure/msal-react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { loginRequest } from '../../config/authConfig';
import { callProflesMsGraph } from '../../config/graph';
import { useAppDispatch } from '../../app/hooks';
import { createProfileDetailsThunk } from '../../app/profileDetail/profileDetailsSlice';

const DashboardMain = () => {
    const { instance, accounts } = useMsal();
    const dispatch = useAppDispatch();

    const requestProfileData = () => {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            })
            .then((response) => {
                callProflesMsGraph(response.accessToken).then((response) => {
                    response.value = response.value.map((user: any) => ({ id: user.id }));
                    dispatch(createProfileDetailsThunk(response.value));
                });
            });
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ padding: 2 }}>
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
    );
};

export default DashboardMain;