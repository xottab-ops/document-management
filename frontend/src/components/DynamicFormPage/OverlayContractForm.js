import React, { useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Dropdown from "../generic/Dropdown";
import { useUsername } from "../generic/UsernameProvider";
import { contractFields } from "../generic/FormFields";

const OverlayContractForm = ({ isVisible, onClose, apiEndpoint, token }) => {
    const [errorMessage, setErrorMessage] = useState([]);
    const { username } = useUsername()
    if (!isVisible) {
        return null;
    }

    const fields = {
        study_group: '',
        student: '',
        customer: '',
        contract_creation_date: '',
        contract_expiration_date: '',
    };

    const emptyValues = Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: '' }), {});

    const handleSubmit = (valuesContract, { setSubmitting }) => {
        const content = {
            'student': valuesContract.student.id,
            'customer': valuesContract.customer.id,
            'study_group': valuesContract.study_group.id,
            'contract_price': valuesContract.study_group.discipline.discipline_price,
            'contract_creation_date': valuesContract.contract_creation_date,
            'contract_expiration_date': valuesContract.contract_expiration_date,
            'creator': username.id
        }

        axios.post(apiEndpoint, content, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSubmitting(false);
                onClose();
            })
            .catch(error => {
                setSubmitting(false);
                const errors = error.response.data;
                const errorMessages = Object.keys(errors).map(key => `${key}: ${errors[key][0]}`);
                setErrorMessage(errorMessages);
            });

    };

    return (
        <div id="overlay">
            <div className="overlay-content">
                <Formik
                    initialValues={emptyValues}
                    validationSchema={contractFields}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="customer">Заказчик:</label>
                                <Dropdown
                                    apiEndpoint="http://localhost:5000/customers/"
                                    token={token}
                                    formatOption={(option) => `${option.id}. ${option.name}, ${option.phone_number}`}
                                    dropdownID="customer"
                                    setFieldValue={setFieldValue}
                                    value={values.customer}
                                />
                                <ErrorMessage name="customer" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="student">Студент:</label>
                                <Dropdown
                                    apiEndpoint="http://localhost:5000/students/"
                                    token={token}
                                    formatOption={(option) => `${option.id}. ${option.name}. ${option.phone_number}`}
                                    dropdownID="student"
                                    setFieldValue={setFieldValue}
                                    value={values.student}
                                />
                                <ErrorMessage name="student" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="study_group">Учебная группа:</label>
                                <Dropdown
                                    apiEndpoint="http://localhost:5000/studygroups/"
                                    token={token}
                                    formatOption={(option) => `${option.id}. ${option.name}. ${option.education_date_start} - ${option.education_date_end}. ${option.discipline.discipline_price}р.`}
                                    dropdownID="study_group"
                                    setFieldValue={setFieldValue}
                                    value={values.study_group}
                                />
                                <ErrorMessage name="study_group" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contract_creation_date">Дата начала договора:</label>
                                <Field type="date" id="contract_creation_date" name="contract_creation_date" />
                                <ErrorMessage name="contract_creation_date" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contract_expiration_date">Дата конца договора:</label>
                                <Field type="date" id="contract_expiration_date" name="contract_expiration_date" />
                                <ErrorMessage name="contract_expiration_date" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label>Информация:</label>
                                <Field type="text" name="info" readOnly />
                            </div>

                            {errorMessage.length > 0 && (
                                <div className="error-message">
                                    {errorMessage.map((error, index) => (
                                        <div key={index}>{error}</div>
                                    ))}
                                </div>
                            )}
                            <div className="form-buttons">
                                <button type="button" onClick={onClose} disabled={isSubmitting}>Назад</button>
                                <button type="submit" disabled={isSubmitting}>Сохранить</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};


const OverlayContractViewForm = ({ isVisible, onClose, contract, contracts }) => {
    if (!isVisible) {
        return null;
    }

    const handlePrint = () => {
        window.print();
    };

    let selectedContract = contracts.find(selectedContract => selectedContract.id === contract.id)

    const contractInfo = `
        Договор №${selectedContract.id}
        
        Студент: ${selectedContract.student.name}
        Телефон студента: ${selectedContract.student.phone_number}
        
        Заказчик: ${selectedContract.customer.name}
        Телефон заказчика: ${selectedContract.customer.phone_number}
        Паспорт заказчика: ${selectedContract.customer.passport_number}
        Дата выдачи паспорта: ${selectedContract.customer.passport_issue_date}
        
        Учебная группа: ${selectedContract.study_group.name}
        Период обучения: ${selectedContract.study_group.education_date_start} - ${selectedContract.study_group.education_date_end}
        Дисциплина: ${selectedContract.study_group.discipline.name}
        Цена дисциплины: ${selectedContract.study_group.discipline.discipline_price} руб.
        
        Создатель договора: ${selectedContract.creator.first_name} ${selectedContract.creator.last_name}
        Дата создания договора: ${selectedContract.contract_creation_date}
        Дата окончания договора: ${selectedContract.contract_expiration_date}
        
        Стоимость договора: ${selectedContract.contract_price} руб.
    `;

    return (
        <div id="overlay">
            <div className="overlay-content">
                <Formik
                    onSubmit={(values, actions) => {}}
                >
                    <Form>
                        <div className="form-group">
                            <label>Информация:</label>
                            <Field
                                as="textarea"
                                name="info"
                                className="contract-info"
                                value={contractInfo}
                                readOnly
                                style={{ width: '100%', height: '80%', resize: 'none' }}
                            />
                        </div>

                        <div className="form-buttons">
                            <button type="button" onClick={onClose}>Закрыть</button>
                            <button type="button" onClick={handlePrint}>Напечатать</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};


export {OverlayContractViewForm};
export default OverlayContractForm;