import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./forgot-password.module.css";
import { getSendEmailRequest } from "../services/auth2";
import { AppDispatch, useDispatch } from "../services";



export const ForgotPassword = () => {
  let dispatch = useDispatch<AppDispatch>();

  const [value, setValue] = useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const onSend = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(
      getSendEmailRequest({
        email: value,
        onSuccess: () => {
          toast("Отправлен email", { type: "success" });
          navigate("/reset-password");
        },
      })
    );
  };

  return (
    <div className={Styles.container}>
      <h1 className="text text_type_main-large mb-6 mt-20">
        Восстановление пароля
      </h1>
      <form onSubmit={onSend} className={Styles.form}>
        <div className="mb-6">
          <Input
            type="email"
            placeholder={"E-mail"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={"email"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>
        <div className="mb-20">
          <Button htmlType="submit" disabled={!value}>
            Восстановить
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
