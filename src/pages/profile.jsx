import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./profile.module.css";
import { useAuth } from "../services/auth";

export const Profile = () => {
  let auth = useAuth();
  const inputRef = React.useRef(null);

  const [value, setValue] = React.useState(auth.user);
  
  const initial = auth.user;

  const [smtChanged, setSmtChanged] = React.useState(false);
  const onChange = (evt) => {
    setSmtChanged(true);
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  const onSave = useCallback(() => {
    auth.updateData(value);
    setSmtChanged(false)
  }, [auth, value]);

  const onCancel = () => {
    setValue(initial);
  };

  let exit = useCallback(auth.logOut, []);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.leftBlock}>
        <div className={`${Styles.linkContainer} ${Styles.first}`}>
          <h1 className={`text text_type_main-medium ${Styles.active}`}>
            Профиль
          </h1>
        </div>
        <div className={`${Styles.linkContainer}`}>
          <NavLink
            to="/profile/orders"
            className={`text text_type_main-medium ${Styles.passive}`}
          >
            История заказов
          </NavLink>
        </div>
        <div className={`mb-20 ${Styles.linkContainer} ${Styles.last}`}>
          <NavLink
            onClick={exit}
            to="/login"
            className={`text text_type_main-medium ${Styles.passive}`}
          >
            Выход
          </NavLink>
        </div>

        <p className={`text text_type_main-small ${Styles.annotation}`}>
          В этом разделе вы можете
          <br /> изменить свои персональные данные
        </p>
      </div>

      <div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={"EditIcon"}
            value={value.name}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>

        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={onChange}
            icon={"EditIcon"}
            value={value.email}
            name={"email"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>
        <div>
          <PasswordInput
            onChange={onChange}
            value={value.password}
            name={"password"}
            icon="EditIcon"
          />
        </div>

        {smtChanged ? (
          <div className={Styles.buttons}>
            <Button htmlType="button" onClick={onSave}>
              Сохранить
            </Button>
            <Button htmlType="button" onClick={onCancel}>
              Отмена
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
