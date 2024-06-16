import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContractsPage from './components/ContractsPage/ContractsPage';
import CustomersPage from "./components/CustomersPage/CustomersPage";
import DynamicFormPage from "./components/DynamicFormPage/DynamicFormPage";
import StudentsPage from "./components/StudentsPage/StudentsPage";
// Импортируйте другие страницы здесь

const App = () => {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2UzcyLTB3R1FzeXR2OVFHZm55V0JuWTN6ajRXZjNzSHVOZHRfZUFqcjdVIn0.eyJleHAiOjE3MTg1Njc1ODQsImlhdCI6MTcxODUzMTU4NCwianRpIjoiYmMxMGY1NmEtZDM2Yy00OGJkLWJkMDMtMWU2MzY4Mjg5ZTVkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9maW5hbC1wcm9qZWN0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImVlZGI0YjJkLTNkOTgtNDEwZC1hOWY4LTJjNDcyMWY5ZDcyYiIsInR5cCI6IkJlYXJlciIsImF6cCI6InhvdHRhYiIsInNlc3Npb25fc3RhdGUiOiI2NGMzMGQ3ZS05M2FlLTQ3N2YtODVlNi01MzVjMzY5ODFhMDciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWZpbmFsLXByb2plY3QiLCJ4b3R0YWItcm9sZSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJ4b3R0YWIiOnsicm9sZXMiOlsibmV3cm9sZSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIG9wZW5pZCIsInNpZCI6IjY0YzMwZDdlLTkzYWUtNDc3Zi04NWU2LTUzNWMzNjk4MWEwNyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZ3JvdXBzIjpbImRlZmF1bHQtcm9sZXMtZmluYWwtcHJvamVjdCIsInhvdHRhYi1yb2xlIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ4b3R0YWIifQ.Ns22g8_qKosf6FeMkrQ8oE1oz_m6KWBL2gpNsm7DZvMV7AnLfO50ZyWj4ZN9erdYuBkZlGeYYl2YHPmOOS9l_e_3Mqmf91Qp3SK695rvgsIvNiGJnfFOYd8ZGGGKsM_jFcEU-ZAkulKfyTVSdQTvd4Q-cWSBfOPor5Mj0FKaPqCH1S_jbEvQpRHSJi1PjGF5JGwOo-M7JdA_cg7qtpRbtd3vW8Rux5ACPIwqppmFnUTLbXwQUb_qXrt7NfTuKu5T0GRRtDlwAEVcCPuUrJra9sAdEAHkgeuM5qyi2IrJ-4iQ84PEXRvqgMWzVcKJiFnQwh1ABl3nXYRTHGm33SCLhQ'

    const fields = {
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Электронная почта',
    };



    const handleSave = (formData) => {
        console.log('Сохраненные данные:', formData);
        alert('Сохранено');
    };
  return (
    <Router>
      <Routes>
          <Route path="/contracts" element={<ContractsPage apiEndpoint="http://localhost:5000/contracts" token={token}/>} />
          <Route path="/customers" element={<CustomersPage apiEndpoint="http://localhost:5000/customers" token={token}/>} />
          <Route path="/students" element={<StudentsPage apiEndpoint="http://localhost:5000/students" token={token}/>} />
          <Route path="/pizdets" element={<DynamicFormPage fields={fields} onSave={handleSave} />} />
      </Routes>
    </Router>
  );
};

export default App;