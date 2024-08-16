import React, { useCallback } from "react";
import Styles from "./order.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../services/auth";

export const Orders = () => {
  const auth = useAuth();

  let exit = useCallback(() => auth.logOut, [auth]);

  return (
    <div className={Styles.leftBlock}>
      <div className={`${Styles.linkContainer} ${Styles.first}`}>
        <NavLink
          to="/profile"
          className={`text text_type_main-medium ${Styles.passive}`}
        >
          Профиль
        </NavLink>
      </div>
      <div className={`${Styles.linkContainer}`}>
        <h1 className={`text text_type_main-medium ${Styles.active}`}>
          История заказов
        </h1>
      </div>
      <div
        className={`mb-20 text text_type_main-medium ${Styles.linkContainer} ${Styles.last}`}
      >
        <NavLink
          onClick={exit}
          to="/login"
          className={`text text_type_main-medium ${Styles.passive}`}
        >
          Выход
        </NavLink>
      </div>

      <p className={`text text_type_main-small ${Styles.annotation}`}>
        В этом разделе вы можете <br /> просмотреть свою историю заказов
      </p>
    </div>
  );
};
