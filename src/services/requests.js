const domain = "https://norma.nomoreparties.space";

export const requestIngredients = async () => {
  const ingredientResponse = await fetch(`${domain}/api/ingredients`);

  if (ingredientResponse.ok) {
    const ingredient = await ingredientResponse.json();
    return ingredient;
  }

  return Promise.reject(`Ошибка ${ingredientResponse.status}`);
};

export const requestsOrder = async (orderIds) => {
  const orderResponse = await fetch(`${domain}/api/orders`, {
    method: "POST",
    body: JSON.stringify({ ingredients: orderIds }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (orderResponse.ok) {
    const order = await orderResponse.json();
    return order;
  }

  return Promise.reject(`Ошибка ${orderResponse.status}`);
};

//

export const loginRequest = async (loginData) => {
  return await fetch(`${domain}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "same-origin",
  });
};

export const logOutRequest = async () => {
  return await fetch(`${domain}/api/auth/logout `, {
    method: "POST",
    body: JSON.stringify({ token: window.localStorage.getItem("refresh") }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "same-origin",
  });
};

export const authRequest = async () => {
  return await fetch(`${domain}/api/auth/user `, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: window.localStorage.getItem("access"),
    },
    credentials: "same-origin",
  });
};

export const registerRequest = async (registerData) => {
  return await fetch(`${domain}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(registerData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "same-origin",
  });
};

export const emailRequest = async (emailData) => {
  return await fetch(`${domain}/api/password-reset`, {
    method: "POST",
    body: JSON.stringify(emailData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export const resetPasswordRequest = async (passwordData) => {
  return await fetch(`${domain}/api/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      token: window.localStorage.getItem("refresh"),
      passwordData,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "same-origin",
  });
};

export const updatingRequest = async (update)=>{
  return await fetch(`${domain}/api/auth/user`, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: window.localStorage.getItem("access"),
    },
    credentials: "same-origin",
  })
}
