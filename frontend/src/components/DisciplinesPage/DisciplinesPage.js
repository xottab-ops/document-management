import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTemplate from '../PageTemplate/PageTemplate';
import TableTemplate from "../generic/TableTemplate";
import { headersDisciplines } from '../generic/consts';

const DisciplinesPage = ({ apiEndpoint, token }) => {
    const [disciplines, setDisciplines] = useState([]);
    const [selected, setSelected] = useState(null);

    const headers = headersDisciplines;

    useEffect(() => {
            axios.get(apiEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}` // Используем токен из пропсов
                }
            })
                .then(response => {
                    setDisciplines(response.data);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке данных', error);
                });
        },
        [apiEndpoint, token]);

    const handleRowClick = (discipline) => {
        setSelected(discipline);
    };


    const formatDisciplineData = (discipline, index) => ({
        'name': discipline.name,
        'lessons_per_week': discipline.lessons_per_week,
        'lesson_time': discipline.lesson_time,
        'discipline_price': discipline.discipline_price,
    });

    return (
        <PageTemplate
        >
            <TableTemplate
                headers={headers}
                data={disciplines.map(formatDisciplineData)}
                onRowClick={handleRowClick}
                selectedRow={selected}
            />
        </PageTemplate>
    );
};

export default DisciplinesPage;