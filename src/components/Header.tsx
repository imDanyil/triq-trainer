import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom"; // Замінимо Link на NavLink для стилізації активного посилання
import { AppRoutes } from "../configs/routesConfig";
import { trainers } from "../configs/trainersConfig";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollWrapper = document.querySelector(".app__scroll-wrapper");
    if (!scrollWrapper) return;

    const handleScroll = () => {
      setIsScrolled(scrollWrapper.scrollTop > 0);
    };

    scrollWrapper.addEventListener("scroll", handleScroll);
    return () => scrollWrapper.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      {/* Додамо посилання на головну сторінку для логотипа */}
      <Link to={AppRoutes.home.path}>
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink to={AppRoutes.home.path} className="header__nav-link">
              {AppRoutes.home.name}
            </NavLink>
          </li>

          {/* === ОСНОВНІ ЗМІНИ ТУТ === */}
          <li className="header__nav-item header__nav-item--dropdown">
            <NavLink
              to={AppRoutes.trainersList.path}
              className="header__nav-link"
            >
              {AppRoutes.trainersList.name}
            </NavLink>
            {/* Випадаючий список */}
            <ul className="header__dropdown-menu">
              {trainers.map((trainer) => (
                <li key={trainer.id} className="header__dropdown-item">
                  <Link to={trainer.path} className="header__dropdown-link">
                    {trainer.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {/* ========================== */}

          <li className="header__nav-item">
            <NavLink to={AppRoutes.statsPage.path} className="header__nav-link">
              {AppRoutes.statsPage.name}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
