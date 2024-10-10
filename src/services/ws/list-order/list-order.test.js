import { WebsocketStatus } from "../../../types/list-order";
import {
  initialState,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
  reducer,
} from "./slice";

describe("list-order reducer", () => {
  it("should return the initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should return ws status with "wsOpen" action', () => {
    const action = wsOpen();

    const state = reducer(initialState, action);
    expect(state.status).toBe(WebsocketStatus.ONLINE);
  });

  it('should return ws status with "wsClose" action', () => {
    const action = wsClose();

    const state = reducer(initialState, action);
    expect(state.status).toBe(WebsocketStatus.OFFLINE);
  });

  it('should return error with "wsError" action', () => {
    const action = wsError();

    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, connectionError: action.payload });
  });

  it('should return error with "wsMessage" action', () => {
    const action = wsMessage();

    const state = reducer(initialState, action);

    expect(state).toEqual({ ...initialState, config: action.payload });
  });
});
