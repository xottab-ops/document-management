import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTemplate from '../PageTemplate/PageTemplate';
import TableTemplate from "../generic/TableTemplate";
import { headersStudents } from '../generic/consts';

const StudentsPage = ({ apiEndpoint, token }) => {
    const [students, setStudents] = useState([]);
    const [selected, setSelected] = useState(null);

    const headers = headersStudents;

    useEffect(() => {
            axios.get(apiEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}` // Используем токен из пропсов
                }
            })
                .then(response => {
                    setStudents(response.data);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке данных', error);
                });
        },
        [apiEndpoint, token]);

    const handleRowClick = (customer) => {
        setSelected(customer);
    };

    const handleNewCustomerClick = () => {

    };


    const footerButtons = [
        { label: 'Создать нового студента', onClick: handleNewCustomerClick },
    ];

    const formatCustomerData = (student, index) => ({
        'name': student.name,
        'phone_number': student.phone_number
    });

    return (
        <PageTemplate
            footerButtons={footerButtons}
        >
            <TableTemplate
                headers={headers}
                data={students.map(formatCustomerData)}
                onRowClick={handleRowClick}
                selectedRow={selected}
            />
        </PageTemplate>
    );
};

export default StudentsPage;