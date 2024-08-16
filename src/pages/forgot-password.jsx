import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./forgot-password.module.css";
import { useAuth } from "../services/auth";

export const ForgotPassword = () => {
  let auth = useAuth();

  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);

  const navigate = useNavigate();

  const onSend = useCallback(
    async (evt) => {
      evt.preventDefault();
      const success = await auth.sendEmail({ email: value });

      if (success) {
        toast("Отправлен email", { type: "success" });
        navigate("/reset-password");
      }
    },
    [auth, value, navigate]
  );

  return (
    <div className={Styles.container}>
      <h1 className="text text_type_main-large mb-6 mt-20">
        Восстановление пароля
      </h1>
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
        <Button onClick={onSend} htmlType="button" disabled={!value}>
          Восстановить
        </Button>
      </div>
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
