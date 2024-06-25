import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTemplate from '../PageTemplate/PageTemplate';
import './CustomersPage.css';
import TableTemplate from "../generic/TableTemplate";
import { headersCustomers } from '../generic/consts';
import { customerFields } from '../generic/FormFields';
import OverlayForm from "../DynamicFormPage/OverlayForm";


const CustomersPage = ({ apiEndpoint, token }) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const headers = headersCustomers;
    const [isEdited, setIsEdited] = useState(false);

    const fetchCustomers = () => {
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
    };

    useEffect(() => {
        fetchCustomers();
    },
        [apiEndpoint, token]);

    const handleRowClick = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleNewCustomerClick = () => {
        setIsEdited(false);
        setSelectedCustomer(null)
        setOverlayVisible(true);
    };

    const handleViewCustomerClick = () => {
        if (selectedCustomer) {
            setIsEdited(true);
            setOverlayVisible(true);
        }
        else {
            alert("Вы не выбрали заказчика")
        }
    };

    const fields = customerFields;

    const handleCloseOverlay = () => {
        setOverlayVisible(false);
        fetchCustomers();
    };

    const footerButtons = [
        { label: 'Создать нового заказчика', onClick: handleNewCustomerClick },
        { label: 'Изменить данные заказчика', onClick: handleViewCustomerClick }
    ];

    const formatCustomerData = (customer) => ({
        'name': customer.name,
        'phone_number': customer.phone_number,
        'email': customer.email,
        'passport_number': customer.passport_number,
        'passport_issuance': customer.passport_issuance,
        'passport_registration': customer.passport_registration,
        'passport_issue_date': customer.passport_issue_date,
        'passport_division_code': customer.passport_division_code,
        'id': customer.id,
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
            <OverlayForm
                isVisible={isOverlayVisible}
                fields={fields}
                onClose={handleCloseOverlay}
                initialValues={selectedCustomer ? selectedCustomer : null}
                apiEndpoint={apiEndpoint}
                isEdited={isEdited}
                token={token}
            />
        </PageTemplate>
    );
};

export default CustomersPage;