import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from "@reduxjs/toolkit";

export type TWsActionTypes<R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, RootState>(
  wsActions: TWsActionTypes<R>,
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const { connect, disconnect, onOpen, onClose, onError, onMessage } =
      wsActions;
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        isConnected = true

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onclose = () => {
          dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(action.payload));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onmessage = (e) => {
          const { data } = e;

          try {
            const parsedData = JSON.parse(data);
            dispatch(onMessage(parsedData));
          } catch (err) {
            dispatch(onError((err as Error).message));
          }
        };
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        isConnected = false;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
