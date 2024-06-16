import React from 'react';
import './TableTemplate.css';

const TableTemplate = ({ headers, data, onRowClick, selectedRow }) => {
    return (
        <table>
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr
                    key={index}
                    onClick={() => onRowClick(row)}
                    className={selectedRow === row ? 'selected' : ''}
                >
                    {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableTemplate;