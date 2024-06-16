import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTemplate from '../PageTemplate/PageTemplate';
import './ContractsPage.css';
import TableTemplate from "../generic/TableTemplate";
import { useNavigate } from 'react-router-dom';
import { headersContracts } from '../generic/consts'

const ContractsPage = ({ apiEndpoint, token }) => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const navigate = useNavigate();
  const headers = headersContracts;

  useEffect(() => {
    axios.get(apiEndpoint, {
      headers: {
        'Authorization': `Bearer ${token}` // Используем токен из пропсов
      }
    })
    .then(response => {
      setContracts(response.data);
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных', error);
    });
  },
      [apiEndpoint, token]);

  const handleRowClick = (contract) => {
    setSelectedContract(contract);
  };

  const handleNewContractClick = () => {
      navigate('/pizdets');
  };

  const handleViewContractClick = () => {

  };

  const footerButtons = [
    { label: 'Создать новый договор', onClick: handleNewContractClick },
    { label: 'Просмотреть договор', onClick: handleViewContractClick, disabled: !selectedContract }
  ];

  const formatContractData = (contract, index) => ({
    'id': contract.id,
    'discipline': contract.study_group.discipline.name,
    'creator_name': `${contract.creator.last_name} ${contract.creator.first_name}`,
    'customer_name': contract.customer.name,
    'student_name': contract.student.name,
    'contract_creation_date': contract.contract_creation_date,
    'contract_price': contract.contract_price,
  });

  return (
    <PageTemplate
        footerButtons={footerButtons}
    >
      <TableTemplate
        headers={headers}
        data={contracts.map(formatContractData)}
        onRowClick={handleRowClick}
        selectedRow={selectedContract}
      />
    </PageTemplate>
  );
};

export default ContractsPage;