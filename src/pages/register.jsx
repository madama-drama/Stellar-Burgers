import React, { useCallback, useState } from "react";
import Styles from "./register.module.css";
import { Link, Navigate } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../services/auth";

export const Register = () => {
  let auth = useAuth();
  const inputRef = React.useRef(null);

  const [value, setValue] = useState({ email: "", password: "", name: "" });

  const onChange = (evt) => {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  let regist = useCallback(
    (evt) => {
      evt.preventDefault();
      auth.reg(value);
    },
    [auth, value]
  );

  if (auth.user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className={Styles.container}>
      <h1 className="text text_type_main-large mb-6 mt-20">Регистрация</h1>
      <div className="mb-6">
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={value.name}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
      </div>
      <div className="mb-6">
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={onChange}
          value={value.email}
          name={"email"}
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
        <Button onClick={regist} htmlType="button" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>

      <div className={Styles.linkBox}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Link to="/login" className={Styles.link}>
          Войти
        </Link>
      </div>
    </div>
  );
};
