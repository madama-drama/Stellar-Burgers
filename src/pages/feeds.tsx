import React, { useEffect } from "react";
import { ProgressOrders } from "../components/progress-orders/progress-orders";
import Styles from "./feeds.module.css";
import { OrderCard } from "../components/order-card/order-card";
import {
  getLiveData,
  getWebsocketStatus,
} from "../services/ws/list-order/slice";
import { wsConnect, wsDisconnect } from "../services/ws/list-order/actions";
import { AppDispatch, useDispatch, useSelector } from "../services";
import { getIngredientsRequest } from "../services/burger-ingredients";

export const LIVE_LIST_SERVER_URL =
  "wss://norma.nomoreparties.space/orders/all";

export const Feeds = () => {
  const dispatchOrder = useDispatch();
  const config = useSelector(getLiveData);
  const status = useSelector(getWebsocketStatus);
  const dispatchAllIngr = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatchAllIngr(getIngredientsRequest());
  }, [dispatchAllIngr]);

  console.log(status);

  useEffect(() => {
    dispatchOrder(wsConnect(LIVE_LIST_SERVER_URL));

    return () => {
      dispatchOrder(wsDisconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchOrder]);

  const orderArray = config?.orders.map((value) => (
    <OrderCard
      key={value._id}
      url={`/feed/${value.number}`}
      orderNum={value.number}
      name={value.name}
      time={value.createdAt}
      ingredients={value.ingredients}
    />
  ));

  return (
    <div className={Styles.page}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <main className={Styles.orderContainer}>
        <div className={Styles.blockWithScroll}>{orderArray}</div>
        
        <ProgressOrders
          counterToday={config?.totalToday}
          counterAll={config?.total}
          orders={config?.orders}
        />

      </main>
    </div>
  );
};
