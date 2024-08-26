import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./reset-password.module.css";
import { useDispatch } from "react-redux";
import { getResetPasswordRequest } from "../services/auth2";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRef = React.useRef(null);
  const [code, setCode] = React.useState("");
  const [value, setValue] = React.useState("");

  const resetPass = (evt) => {
    evt.preventDefault();
    dispatch(
      getResetPasswordRequest({
        password: value,
        onSuccess: () => {
          navigate("/login");
        },
      })
    );
  };

  return (
    <div className={Styles.container}>
      <h1 className="text text_type_main-large mb-6 mt-20">
        Восстановление пароля
      </h1>

      <form onSubmit={resetPass} className={Styles.form}>
        <div className="mb-6">
          <PasswordInput
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={"password"}
            extraClass="mb-2"
          />
        </div>

        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setCode(e.target.code)}
            value={code}
            name={"name"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>

        <div className="mb-20">
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </form>

      <div className={Styles.linkBox}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Link to="/login" className={Styles.link}>
          Войти
        </Link>
      </div>
    </div>
  );
};
