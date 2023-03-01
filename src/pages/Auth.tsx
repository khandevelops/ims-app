import { useMsal } from '@azure/msal-react';
import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { loginRequest } from '../config/authConfig';

const Auth = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch();
    };

    return (
        <Container sx={{textAlign: 'center'}}>
            <Box
                sx={{
                    padding: 20
                }}>
                <h3>WELCOME TO THE USDTL INVENTORY SYSTEM</h3>
                <h6>A PROGRAM DESIGNED TO TRACK AND PROCURE INVENTORY</h6>
            </Box>
            <Box
            sx={{

            }}>
                <Button variant="outlined" onClick={handleLogin}>
                    Single Sign-On Button
                </Button>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    paddingBottom: 8,
                    margin: 'auto'
                }}>
                Copyright © 2021 United States Drug Testing Laboratories Inc. All rights reserved.
            </Box>
        </Container>
    );
};

export default Auth;
