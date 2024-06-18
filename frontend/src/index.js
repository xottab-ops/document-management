import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './auth/Instance';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ReactKeycloakProvider authClient={keycloak}>
        <App />
    </ReactKeycloakProvider>
);


