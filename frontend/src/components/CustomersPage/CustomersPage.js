import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTemplate from '../PageTemplate/PageTemplate';
import './CustomersPage.css';
import TableTemplate from "../generic/TableTemplate";
import { headersCustomers } from '../generic/consts';

const CustomersPage = ({ apiEndpoint, token }) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const headers = headersCustomers;

    useEffect(() => {
            axios.get(apiEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}` // Используем токен из пропсов
                }
            })
                .then(response => {
                    setCustomers(response.data);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке данных', error);
                });
        },
        [apiEndpoint, token]);

    const handleRowClick = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleNewCustomerClick = () => {

    };

    const handleViewCustomerClick = () => {

    };


    const footerButtons = [
        { label: 'Создать нового заказчика', onClick: handleNewCustomerClick },
        { label: 'Изменить данные заказчика', onClick: handleViewCustomerClick, disabled: selectedCustomer === null }
    ];

    const formatCustomerData = (customer, index) => ({
        'name': customer.name,
        'phone_number': customer.phone_number,
        'passport_number': customer.passport_number,
        'passport_issuance': customer.passport_issuance,
        'passport_registration': customer.passport_registration,
        'passport_issue_date': customer.passport_issue_date,
        'passport_division_code': customer.passport_division_code
    });

    return (
        <PageTemplate
            footerButtons={footerButtons}
        >
            <TableTemplate
                headers={headers}
                data={customers.map(formatCustomerData)}
                onRowClick={handleRowClick}
                selectedRow={selectedCustomer}
            />
        </PageTemplate>
    );
};

export default CustomersPage;