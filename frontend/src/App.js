import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    // Замените URL на ваш реальный endpoint Django API
    axios.get('http://localhost:8000/contracts', {
      headers: {
        'Authorization': 'Bearer '
      }
    })
      .then(response => {
        setContracts(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных', error);
      });
  }, []);

  const handleRowClick = (contract) => {
    setSelectedContract(contract);
  };

  return (
    <div className="container">
      <header>
        <h1>Дальневосточный Центр Математики</h1>
      </header>
      <aside>
        <h2>Курсы</h2>
        <ul>
          <li>Математический анализ</li>
          <li>Подготовка к ЕГЭ 11 класс</li>
          <li>Подготовка к ЕГЭ 10 класс</li>
          <li>Решение олимпиадных задач</li>
        </ul>
      </aside>
      <main>
        <h2>Заключенные договоры</h2>
        <table>
          <thead>
            <tr>
              <th>Номер договора</th>
              <th>Курс</th>
              <th>ФИО администратора</th>
              <th>ФИО заказчика</th>
              <th>ФИО обучающегося</th>
              <th>Дата заключения договора</th>
              <th>Стоимость договора</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
                <tr
                    key={index}
                    onClick={() => handleRowClick(contract)}
                    className={selectedContract === contract ? 'selected' : ''}
                >
                  <td>{index + 1}</td>
                  <td>{contract.study_group.discipline.name}</td>
                  <td>{`${contract.creator.last_name} ${contract.creator.first_name}`}</td>
                  <td>{contract.customer.name}</td>
                  <td>{contract.student.name}</td>
                  <td>{contract.contract_creation_date}</td>
                  <td>{contract.contract_price}</td>
                  <td>Статус</td>
                  {/* Место для статуса, если он доступен */}
                </tr>
            ))}
          </tbody>
        </table>
        <div className="buttons">
          <button>Заключить новый договор</button>
          {selectedContract && <button>Просмотреть договор</button>}
        </div>
      </main>
    </div>
  );
};

export default App;