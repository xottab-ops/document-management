import React from 'react';
import './FooterButtons.css';

const Footer = ({ buttons }) => {
    return (
        <footer className="footer-buttons">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    onClick={button.onClick}
                    className="footer-button"
                    disabled={button.disabled}
                >
                    {button.label}
                </button>
            ))}
        </footer>
    );
};

export default Footer;