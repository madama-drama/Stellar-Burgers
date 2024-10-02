import React, { useEffect } from "react";
import { ComponentOrderId } from "../components/component-order-id/component-order-id";
import { AppDispatch,  useDispatch, useSelector } from "../services";
import {
  getLiveDataProfile,
  getWebsocketStatusProfile,
} from "../services/ws/list-order-profile/slice";

import {
  wsConnectProfile,
  wsDisconnectProfile,
} from "../services/ws/list-order-profile/actions";
import { getWsOrdersUrlWithToken, useOrderByNumber } from "../functions";

export const OrderProfileNumber = () => {
const PROFILE_LIVE_LIST_SERVER_URL = getWsOrdersUrlWithToken()

  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector(getLiveDataProfile);
  const status = useSelector(getWebsocketStatusProfile);

  console.log(status);

  useEffect(() => {
    dispatch(wsConnectProfile(PROFILE_LIVE_LIST_SERVER_URL));

    return () => {
      dispatch(wsDisconnectProfile());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const dataForOrderComponent = useOrderByNumber(config);

  if (!dataForOrderComponent) {
    return null;
  }
  return <ComponentOrderId {...dataForOrderComponent} />;
};
