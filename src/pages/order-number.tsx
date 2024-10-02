import React, { useEffect } from "react";
import { AppDispatch, useDispatch, useSelector } from "../services";
import {
  getLiveData,
  getWebsocketStatus,
} from "../services/ws/list-order/slice";
import { wsConnect, wsDisconnect } from "../services/ws/list-order/actions";
import { LIVE_LIST_SERVER_URL } from "./feeds";
import { useOrderByNumber } from "../functions";
import { ComponentOrderId } from "../components/component-order-id/component-order-id";

export const OrderNumber = () => {
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector(getLiveData);
  const status = useSelector(getWebsocketStatus);

  //сокет-соединение
  console.log(status);

  useEffect(() => {
    dispatch(wsConnect(LIVE_LIST_SERVER_URL));

    return () => {
      dispatch(wsDisconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const dataForOrderComponent = useOrderByNumber(config);

  if (!dataForOrderComponent) {
    return null;
  }

  return <ComponentOrderId {...dataForOrderComponent} />;
};
