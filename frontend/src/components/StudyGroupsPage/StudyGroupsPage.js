import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTemplate from '../PageTemplate/PageTemplate';
import TableTemplate from "../generic/TableTemplate";
import { headersStudyGroups } from '../generic/consts';

const StudyGroupsPage = ({ apiEndpoint, token }) => {
    const [studyGroups, setStudyGroups] = useState([]);
    const [selected, setSelected] = useState(null);

    const headers = headersStudyGroups;

    useEffect(() => {
            axios.get(apiEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}` // Используем токен из пропсов
                }
            })
                .then(response => {
                    setStudyGroups(response.data);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке данных', error);
                });
        },
        [apiEndpoint, token]);

    const handleRowClick = (studyGroup) => {
        setSelected(studyGroup);
    };


    const formatStudyGroupData = (studyGroup, index) => ({
        'name': studyGroup.name,
        'education_date_start': studyGroup.education_date_start,
        'education_date_end': studyGroup.education_date_end,
        'discipline_name': studyGroup.discipline.name,
        'lessons_per_week': studyGroup.discipline.lessons_per_week,
        'lesson_time': studyGroup.discipline.lesson_time,
        'grade': studyGroup.grade
    });

    return (
        <PageTemplate
        >
            <TableTemplate
                headers={headers}
                data={studyGroups.map(formatStudyGroupData)}
                onRowClick={handleRowClick}
                selectedRow={selected}
            />
        </PageTemplate>
    );
};

export default StudyGroupsPage;