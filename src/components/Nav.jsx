import React, { useState } from 'react';
import './Nav.css';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { IoGameController } from "react-icons/io5";
import { TbListSearch } from "react-icons/tb";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { FaSearchLocation } from "react-icons/fa";

const Nav = ({ onLoginClick }) => {
    const location = useLocation();

    return (
        <nav className="nav containers fixed-top">
            <Link to="/" className="nav__logo">SMART RATION</Link>

            <div className="nav__menu" id="nav-menu">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to="/" className={`nav__link ${location.pathname === '/' ? 'active-link' : ''}`}>
                            <AiFillHome />
                            <span className="nav__name">Home</span>
                        </Link>
                    </li>

                    <li className="nav__item">
                        <Link to="/product" className={`nav__link ${location.pathname === '/product' ? 'active-link' : ''}`}>
                            <TbListSearch />
                            <span className="nav__name">Products</span>
                        </Link>
                    </li>

                    <li className="nav__item">
                        <Link to="/map" className={`nav__link ${location.pathname === '/map' ? 'active-link' : ''}`}>
                            <FaSearchLocation />
                            <span className="nav__name">Map</span>
                        </Link>
                    </li>

                    <li className="nav__item">
                        <Link to="/about" className={`nav__link ${location.pathname === '/about' ? 'active-link' : ''}`}>
                            <TbInfoHexagonFilled />
                            <span className="nav__name">About</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="nav__img-container" onClick={onLoginClick}>
            <BsPersonCircle size={35}/>
            </div>
        </nav>
    );
}

export default Nav;
