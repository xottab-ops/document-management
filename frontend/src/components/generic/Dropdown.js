import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = ({ apiEndpoint, token, formatOption, dropdownID, setFieldValue, value }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get(apiEndpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных', error);
            });
    }, [apiEndpoint, token]);

    const handleChange = (event) => {
        const selectedOption = options.find(option => option.id === parseInt(event.target.value, 10));
        setFieldValue(dropdownID, selectedOption);
    };

    return (
        <div>
            <select
                id={dropdownID}
                value={value ? value.id : ''}
                onChange={handleChange}
            >
                <option value="" disabled>Выберите...</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {formatOption(option)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;