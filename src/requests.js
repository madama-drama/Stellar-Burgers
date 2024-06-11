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
