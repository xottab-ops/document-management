import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTemplate from '../PageTemplate/PageTemplate';
import './ContractsPage.css';
import TableTemplate from "../generic/TableTemplate";
import { headersContracts } from '../generic/consts'
import OverlayContractForm, {OverlayContractViewForm} from "../DynamicFormPage/OverlayContractForm";

const ContractsPage = ({ apiEndpoint, token }) => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isOverlayViewVisible, setOverlayViewVisible] = useState(false);
  const headers = headersContracts;

  const fetchContracts = () => {
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
  }

  useEffect(() => {
    fetchContracts()
  },
      [apiEndpoint, token]);



  const handleRowClick = (contract) => {
    setSelectedContract(contract);
  };

  const handleNewContractClick = () => {
    setOverlayVisible(true);
  };

  const handleViewContractClick = () => {
    if (selectedContract === null) {
      alert("Выберите договор")
    }
    else{
      setOverlayViewVisible(true)
    }
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    fetchContracts()
  };

  const handleCloseViewOverlay = () => {
    setOverlayViewVisible(false);
  };

  const footerButtons = [
    { label: 'Создать новый договор', onClick: handleNewContractClick },
    { label: 'Просмотреть договор', onClick: handleViewContractClick, disabled: !selectedContract }
  ];

  const formatContractData = (contract) => ({
    'id': contract.id,
    'discipline': contract.study_group.discipline.name,
    'creator_name': `${contract.creator.last_name} ${contract.creator.first_name}`,
    'customer_name': contract.customer.name,
    'student_name': contract.student.name,
    'contract_creation_date': contract.contract_creation_date,
    'contract_price': contract.contract_price,
    'address': contract.address.address,
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
      <OverlayContractForm
          isVisible={isOverlayVisible}
          onClose={handleCloseOverlay}
          apiEndpoint={apiEndpoint}
          token={token}
      />
      <OverlayContractViewForm
          isVisible={isOverlayViewVisible}
          onClose={handleCloseViewOverlay}
          contract={selectedContract}
          contracts={contracts}
          token={token}/>


    </PageTemplate>
  );
};

export default ContractsPage;