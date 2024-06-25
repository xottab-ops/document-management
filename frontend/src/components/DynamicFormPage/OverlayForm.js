import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './OverlayForm.css';
import axios from 'axios';


const OverlayForm = ({ isVisible, fields, initialValues, onClose, apiEndpoint, token, isEdited }) => {
    const [errorMessage, setErrorMessage] = useState([]);

    if (!isVisible) {
        return null;
    }

    const emptyValues = Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: '' }), {});

    const handleSubmit = (values, { setSubmitting }) => {

        if (isEdited){
            axios.patch(apiEndpoint + values.id + '/', values, {
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
        }
        else{
            axios.post(apiEndpoint, values, {
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
                    const firstKey = Object.keys(error.response.data)[0];
                    const errorMessage = error.response.data[firstKey][0];
                    const message = error.response ? errorMessage : 'Ошибка при отправке данных';
                    setErrorMessage(message);
                });
        }

    };

    const validationSchema = Yup.object(
        Object.keys(fields).reduce((acc, key) => {
            acc[key] = fields[key].validation;
            return acc;
        }, {})
    );

    return (
        <div id="overlay">
            <div className="overlay-content">
                <Formik
                    initialValues={initialValues || emptyValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {Object.entries(fields).map(([id, config]) => (
                                <div key={id} className="form-group">
                                    <label htmlFor={id}>{config.label}</label>
                                    <Field type={config.isDate ? 'date' : 'text'} id={id} name={id} />
                                    <ErrorMessage name={id} component="div" className="error" />
                                </div>
                            ))}
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


export default OverlayForm;