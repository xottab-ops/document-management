import React, { useState } from 'react';
import './DynamicFormPage.css'
import { useNavigate } from 'react-router-dom';

const DynamicFormPage = ({ fields, onBack, onSave }) => {
    const [formValues, setFormValues] = useState(
        Object.keys(fields).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {})
    );

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({
            ...formValues,
            [id]: value,
        });
    };

    const handleSave = () => {
        onSave(formValues);
        navigate(-1);
    };

    return (
        <div>
            <h1>Dynamic Form</h1>
            <form>
                {Object.keys(fields).map((key) => (
                    <div key={key} className="form-group">
                        <label htmlFor={key}>{fields[key]}</label>
                        <input
                            type="text"
                            id={key}
                            value={formValues[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </form>
            <div className="buttons">
                <button type="button" onClick={() => navigate(-1)}>Назад</button>
                <button type="button" onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default DynamicFormPage;