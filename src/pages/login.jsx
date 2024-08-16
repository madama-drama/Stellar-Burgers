import React, { useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Styles from "./login.module.css";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../services/auth";

export const LoginPage = () => {
  let auth = useAuth();
  const inputRef = React.useRef(null);

  const [value, setValue] = useState({ email: "", password: "" });

  const onChange = (evt) => {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  let login = useCallback(
    (evt) => {
      evt.preventDefault();
      auth.logIn(value);
    },
    [auth, value]
  );

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={Styles.container}>
      <h1 className="text text_type_main-large mb-6 mt-20">Вход</h1>

      <div className="mb-6">
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={onChange}
          value={value.email}
          name="email"
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
      </div>

      <div className="mb-6">
        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={"password"}
          extraClass="mb-2"
        />
      </div>

      <div className="mb-20">
        <Button onClick={login} htmlType="button" type="primary" size="large">
          Войти
        </Button>
      </div>
      <div className={Styles.linkBox}>
        <p className="text text_type_main-default text_color_inactive">
          Вы новый пользователь?
        </p>
        <Link to="/register" className={Styles.link}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={Styles.linkBox}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Link to="/forgot-password" className={Styles.link}>
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};
