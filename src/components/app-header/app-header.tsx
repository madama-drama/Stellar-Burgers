import React from "react";
import headerStyle from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import {
  ListIcon,
  ProfileIcon,
  Logo,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {

  return (
    <header className={headerStyle.header}>
      <nav className={headerStyle.doubleNav}>
        <div className={headerStyle.navigatorBlock}>
          <NavLink to="/">
            {({ isActive }) =>
              isActive ? (
                <BurgerIcon type="primary" />
              ) : (
                <BurgerIcon type="secondary" />
              )
            }
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? headerStyle.active : headerStyle.passive
            }
          >
            <p className="text text_type_main-default">Конструктор</p>
          </NavLink>
        </div>

        <div className={headerStyle.navigatorBlock}>
          <NavLink to="/feed">
            {({ isActive }) =>
              isActive ? (
                <ListIcon type="primary" />
              ) : (
                <ListIcon type="secondary" />
              )
            }
          </NavLink>

          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? headerStyle.active : headerStyle.passive
            }
          >
            Лента заказов
          </NavLink>
        </div>
      </nav>

      <div className={headerStyle.logo}>
        <Logo />
      </div>

      <div className={headerStyle.navigatorBlock}>
        <NavLink to="/profile">
          {({ isActive }) =>
            isActive ? (
              <ProfileIcon type="primary" />
            ) : (
              <ProfileIcon type="secondary" />
            )
          }
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? headerStyle.active : headerStyle.passive
          }
        >
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
};
