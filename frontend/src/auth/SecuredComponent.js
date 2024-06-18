import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const SecuredComponent = () => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        return <div>You are not authenticated</div>;
    }

    return (
        <div>
            <h1>Welcome {keycloak.tokenParsed.preferred_username}</h1>
            <button onClick={() => keycloak.logout()}>Logout</button>
        </div>
    );
};

export default SecuredComponent;