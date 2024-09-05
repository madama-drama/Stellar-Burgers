import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getLogOutRequest, getUpdateDataRequest } from "../services/auth2";

import { AppStore, AppDispatch } from "../services";

export const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = React.useRef(null);

  // user не может быть null, поскольку в этом случае на страницу /profile нельзя попасть 
  const initial = useSelector((store: AppStore) => store.auth.user!);

  const [value, setValue] = useState(initial);
  const [password, setPassword] = useState("");

  const [smtChanged, setSmtChanged] = React.useState(false);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSmtChanged(true);
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  const changePass = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSmtChanged(true);
    setPassword(evt.target.value);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(getUpdateDataRequest({ value, password }));
    setSmtChanged(false);
  };

  const onCancel = (e: React.FormEvent) => {
    e.preventDefault();

    setValue(initial);
    setSmtChanged(false);
  };

  const exit = () => {
    dispatch(getLogOutRequest());
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

      <form onSubmit={onSave}>
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
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
        </div>
        <div>
          <PasswordInput
            onChange={changePass}
            value={password}
            name={"password"}
            icon="EditIcon"
          />
        </div>

        {smtChanged ? (
          <div className={Styles.buttons}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={onCancel}
            >
              Отмена
            </Button>

            <Button htmlType="submit">Сохранить</Button>
          </div>
        ) : null}
      </form>
    </div>
  );
};
