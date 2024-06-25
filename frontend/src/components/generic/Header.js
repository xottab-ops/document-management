import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiAccountCircleLine } from 'react-icons/ri';
import './Header.css';
import {useUsername} from "./UsernameProvider";

const Header = ({ handlerLogout }) => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const handleProfileClick = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleProfileClose = () => {
        handlerLogout()
    }

    const { username } = useUsername()
    return (
        <header className="header">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="active">
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
                            Ученики
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/disciplines" activeClassName="active">
                            Дисциплины
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/studygroups" activeClassName="active">
                            Учебные группы
                        </NavLink>
                    </li>
                    <div className="profile-icon" onClick={handleProfileClick}>
                        <RiAccountCircleLine size={24}/>

                    </div>
                </ul>
                {profileMenuOpen && (
                    <div className="profile-menu">
                        <p>{username.username}</p>
                        <button onClick={handleProfileClose}>Выход</button>
                    </div>
                )}
            </nav>

        </header>
    );

};

export default Header;