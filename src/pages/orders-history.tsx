import React, { useEffect } from "react";
import Styles from "./orders-history.module.css";
import { NavLink } from "react-router-dom";
import { getLogOutRequest } from "../services/auth2";

import { AppDispatch, useDispatch, useSelector } from "../services";
import { OrderCard } from "../components/order-card/order-card";
import {
  getLiveDataProfile,
  getWebsocketStatusProfile,
} from "../services/ws/list-order-profile/slice";
import { getIngredientsRequest } from "../services/burger-ingredients";
import {
  wsConnectProfile,
  wsDisconnectProfile,
} from "../services/ws/list-order-profile/actions";
import { getWsOrdersUrlWithToken } from "../functions";



export const OrdersHistory = () => {
  const PROFILE_LIVE_LIST_SERVER_URL = getWsOrdersUrlWithToken();

  const dispatch = useDispatch<AppDispatch>();

  const exit = () => {
    dispatch(getLogOutRequest());
  };

  const config = useSelector(getLiveDataProfile);
  const status = useSelector(getWebsocketStatusProfile);

  useEffect(() => {
    dispatch(getIngredientsRequest());
  }, [dispatch]);

  console.log(status);
  console.log(config);
  useEffect(() => {
    dispatch(wsConnectProfile(PROFILE_LIVE_LIST_SERVER_URL));

    return () => {
      dispatch(wsDisconnectProfile());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!config) {
    return null;
  }
  const orderArray = config?.orders?.map((value) => (
    <OrderCard
      key={value._id}
      url={`/profile/orders/${value.number}`}
      name={value.name}
      ingredients={value.ingredients}
      time={value.createdAt}
      orderNum={value.number}
      orderStatus={value.status}
    />
  ));

  return (
    <div className={Styles.container}>
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

      <div className={Styles.blockWithScroll}>{orderArray}</div>
    </div>
  );
};
