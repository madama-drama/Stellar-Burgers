import React from "react";
import headerStyle from "./app-header.module.css";
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
          <BurgerIcon type="primary" />
          <a href="#s" className={`${headerStyle.newPage} text text_type_main-default ${headerStyle.active}`}>
            Конструктор
          </a>
        </div>

        <div className={headerStyle.navigatorBlock}>
          <ListIcon type="secondary" />
          <a href="#s" className={`${headerStyle.newPage} text text_type_main-default passive`}>
            Лента заказов
          </a>
        </div>
      </nav>

      <div className={headerStyle.logo}>
        <Logo />
      </div>

      <div className={headerStyle.navigatorBlock}>
        <ProfileIcon type="secondary" />
        <a href="#s" className={`${headerStyle.newPage} text text_type_main-default`}>
          Личный кабинет
        </a>
      </div>
    </header>
  );
};
