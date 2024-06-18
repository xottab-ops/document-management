import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import ContractsPage from './components/ContractsPage/ContractsPage';
import CustomersPage from "./components/CustomersPage/CustomersPage";
import StudentsPage from "./components/StudentsPage/StudentsPage";
import DisciplinesPage from "./components/DisciplinesPage/DisciplinesPage";
import StudyGroupsPage from "./components/StudyGroupsPage/StudyGroupsPage"
import Header from "./components/generic/Header";
import { UsernameProvider, useUsername } from './components/generic/UsernameProvider';
import axios from "axios";

const App = () => {
    const { keycloak, initialized } = useKeycloak();
    const { setUsername } = useUsername();

    const handleProfileClose = () => {
        keycloak.logout();
    };

    React.useEffect(() => {
        if (initialized && keycloak.authenticated) {
            axios.get('http://localhost:5000/users/' + keycloak.idTokenParsed.azp, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            }).then(response => {
                setUsername(response.data)
            }).catch(error => {
                console.error('Ошибка при загрузке данных', error);
            });
        }
        if (initialized && !keycloak.authenticated) {
            keycloak.login();
        }

    }, [initialized, keycloak, setUsername]);

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        return <div>Redirecting...</div>;
    }

    const authToken = keycloak.token;

    return (
        <Router>
            <Header handlerLogout={handleProfileClose} />
            <Routes>
                <Route path="/" element={<ContractsPage apiEndpoint="http://localhost:5000/contracts/" token={authToken}/>} />
                <Route path="/customers" element={<CustomersPage apiEndpoint="http://localhost:5000/customers/" token={authToken}/>} />
                <Route path="/students" element={<StudentsPage apiEndpoint="http://localhost:5000/students/" token={authToken}/>} />
                <Route path="/disciplines" element={<DisciplinesPage apiEndpoint="http://localhost:5000/disciplines/" token={authToken}/>} />
                <Route path="/studygroups" element={<StudyGroupsPage apiEndpoint="http://localhost:5000/studygroups/" token={authToken}/>} />
            </Routes>
        </Router>
    );
};


const AppWithProvider = () => (
    <UsernameProvider>
        <App />
    </UsernameProvider>
);

export default AppWithProvider;