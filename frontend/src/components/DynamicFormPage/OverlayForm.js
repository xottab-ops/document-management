import React, { useState } from 'react';
import './OverlayForm.css';

const OverlayForm = ({ isVisible, fields, onClose, onSave }) => {
    const [formData, setFormData] = useState(
        Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
    );

    if (!isVisible) {
        return null;
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div id="overlay">
            <div className="overlay-content">
                <form>
                    {Object.entries(fields).map(([id, label]) => (
                        <div key={id} className="form-group">
                            <label htmlFor={id}>{label}</label>
                            <input
                                type="text"
                                id={id}
                                value={formData[id]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div className="form-buttons">
                        <button type="button" onClick={onClose}>Назад</button>
                        <button type="button" onClick={handleSave}>Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OverlayForm;