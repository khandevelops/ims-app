import { useMsal } from '@azure/msal-react';
import { Button } from '@mui/material';
import { useState } from 'react';
import { loginRequest } from '../config/authConfig';
import { callMsGraph } from '../config/graph';

function Profile() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState<string | null>(null);

    const name = accounts[0] && accounts[0].name;

    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance
            .acquireTokenSilent(request)
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            })
            .catch((e) => {
                instance.acquireTokenPopup(request).then((response) => {
                    callMsGraph(response.accessToken).then((response) => setGraphData(response));
                });
            });
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {/* {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button onClick={RequestProfileData}>Request Profile Information</Button>
            } */}
        </>
    );
}

export default Profile;
