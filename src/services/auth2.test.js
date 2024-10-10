import {
  initialState,
  reducer,
  getAuthorizationRequest,
  getLogInRequest,
  getLogOutRequest,
  getRegistrRequest,
  getUpdateDataRequest,
  getResetPasswordRequest,
  getSendEmailRequest,
} from "./auth2";

const temporyData = {
  user: {
    email: "1",
    name: "1",
  },
};

describe("auth2 reducers", () => {
  it("should return the initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  //РЕГИСТРАЦИЯ
  it('should return user and success with "getRegistrRequest.fulfilled" action', () => {
    const state = reducer(
      initialState,
      getRegistrRequest.fulfilled(temporyData)
    );

    expect(state.user).toEqual(temporyData);
    expect(state.success).toEqual(true);
  });

  it('should return initialState with "getRegistrRequest.reject"', () => {
    const state = reducer(initialState, getRegistrRequest.rejected(undefined));
    expect(state.user).toEqual(initialState.user);
    expect(state.success).toEqual(initialState.success);
  });

  //АВТОРИЗАЦИЯ
  it('should return user and success with "getAuthorizationRequest.fulfilled" action', () => {
    const state = reducer(
      initialState,
      getAuthorizationRequest.fulfilled(temporyData)
    );

    expect(state.user).toEqual(temporyData);
    expect(state.success).toEqual(true);
  });

  it('should return initialState with "getAuthorizationRequest.reject"', () => {
    const state = reducer(
      initialState,
      getAuthorizationRequest.rejected(undefined)
    );
    expect(state.user).toEqual(initialState.user);
    expect(state.success).toEqual(initialState.success);
  });

  //ВХОД
  it('should return user and success with "getLogInRequest.fulfilled" action', () => {
    const state = reducer(initialState, getLogInRequest.fulfilled(temporyData));

    expect(state.user).toEqual(temporyData);
    expect(state.success).toEqual(true);
  });

  it('should return initialState with "getLogInRequest.reject"', () => {
    const state = reducer(initialState, getLogInRequest.rejected(undefined));
    expect(state.user).toEqual(initialState.user);
    expect(state.success).toEqual(initialState.success);
  });

  //ВЫХОД
  it('should return user and success with "getLogOutRequest.fulfilled" action', () => {
    const state = reducer(initialState, getLogOutRequest.fulfilled(null));

    expect(state.user).toEqual(null);
    expect(state.success).toEqual(true);
  });

  it('should return initialState with "getLogOutRequest.reject"', () => {
    const state = reducer(initialState, getLogOutRequest.rejected(undefined));
    expect(state.user).toEqual(initialState.user);
    expect(state.success).toEqual(initialState.success);
  });

  //ЗАПРОС ПОЧТЫ
  it('should return success with "getSendEmailRequest.fulfilled" action', () => {
    const state = reducer(initialState, getSendEmailRequest.fulfilled(false));

    expect(state.success).toEqual(true);
  });

  it('should return initialState with "getSendEmailRequest.reject"', () => {
    const state = reducer(
      initialState,
      getSendEmailRequest.rejected(undefined)
    );

    expect(state.success).toEqual(initialState.success);
  });

  //ВОССТАНОВЛЕНИЕ ПАРОЛЯ
  it('should return success with "getResetPasswordRequest.fulfilled" action', () => {
    const state = reducer(
      initialState,
      getResetPasswordRequest.fulfilled(false)
    );

    expect(state.success).toEqual(true);
  });

  it('should return initialState with "getResetPasswordRequest.reject"', () => {
    const state = reducer(
      initialState,
      getResetPasswordRequest.rejected(undefined)
    );

    expect(state.success).toEqual(initialState.success);
  });

  //ОБНОВЛЕНИЕ ДАННЫХ
  it('should return user and success with "getUpdateDataRequest.fulfilled" action', () => {
    const state = reducer(
      initialState,
      getUpdateDataRequest.fulfilled(temporyData)
    );

    expect(state.user).toEqual(temporyData);
    expect(state.success).toEqual(true);
  });

  it('should return initialState with "getUpdateDataRequest.reject"', () => {
    const state = reducer(
      initialState,
      getUpdateDataRequest.rejected(undefined)
    );
    expect(state.user).toEqual(initialState.user);
    expect(state.success).toEqual(initialState.success);
  });
});
