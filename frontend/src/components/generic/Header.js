import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
          <ul>
              <li>
                  <NavLink to="/contracts" activeClassName="active">
                      Договоры
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/customers" activeClassName="active">
                      Заказчики
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/students" activeClassName="active">
                      Студенты
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/courses" activeClassName="active">
                      Дисциплины
                  </NavLink>
              </li>
          </ul>
      </nav>
    </header>
  );
};

export default Header;