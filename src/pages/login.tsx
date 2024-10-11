import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Styles from "./login.module.css";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getLogInRequest } from "../services/auth2";

import {AppDispatch, useDispatch } from "../services";

export interface ILogin{
  email: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const inputRef = React.useRef(null);

  const [value, setValue] =useState<ILogin>({ email: "", password: "" });

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  const logIn = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(
      getLogInRequest({
        loginData: value,
        onSuccess: () => {
          navigate("/");
        },
      })
    );
  };

  return (
    <div className={Styles.container}>
      <h1 className="text text_type_main-large mb-6 mt-20">Вход</h1>
      <form onSubmit={logIn} className={Styles.form}>
        <div className="mb-6" data-testid='email_input'>
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

        <div className="mb-6" data-testid='password_input'>
          <PasswordInput
            onChange={onChange}
            value={value.password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>

        <div className="mb-20">
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </div>
      </form>
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
