import { IIngredient } from "./types/interfaces";

import { IComponentOrderIdProps } from "./components/component-order-id/component-order-id";
import { useEffect } from "react";
import { AppDispatch, AppStore, useDispatch, useSelector } from "./services";
import { useParams } from "react-router-dom";
import { getOrderbyNumberRequest } from "./services/ws/order-by-number/slice";
import { getIngredientsRequest } from "./services/burger-ingredients";
import { OrdersConfig } from "./types/list-order";

//итоговая сумма заказа
export const ingredientsSum = (ingredients: IIngredient[]) => {
  let sum = 0;
  ingredients.forEach((ing) => {
    if (ing.type === "bun") {
      sum += ing.price * 2;
    } else {
      sum += ing.price;
    }
  });

  return sum;
};

//проверка на исчезнувший и нормальный заказ
export const useOrderByNumber = (
  config: OrdersConfig | null
): IComponentOrderIdProps | null => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderNumber } = useParams();

  //все ингредиенты
  useEffect(() => {
    dispatch(getIngredientsRequest());
  }, [dispatch]);

  const allIngredients = useSelector(
    (store: AppStore) => store.ingredients.ingredients
  );

  const orderFromWS = config?.orders.find(
    (value) => value.number === Number(orderNumber)
  );

  //заказы, которые уже не отображаются
  useEffect(() => {
    if (!orderFromWS) {
      dispatch(getOrderbyNumberRequest(Number(orderNumber)));
    }
  }, [dispatch, orderFromWS, orderNumber]);

  const orderByNumber = useSelector(
    (store: AppStore) => store.orderByNumber.order
  );

  if (!config) {
    return null;
  }

  if (!orderFromWS) {
    if (!orderByNumber) {
      return null;
    }

    const ingredientsByNumber = orderByNumber.ingredients.map(
      (value) => allIngredients.find((v) => value === v._id)!
    );

    const sumByNumber = ingredientsSum(ingredientsByNumber);

    return {
      number: orderByNumber.number,
      sum: sumByNumber,
      time: orderByNumber.createdAt,
      name: orderByNumber.name,
      status: orderByNumber.status,
      ingredients: ingredientsByNumber,
    };
  }

  const ingredients = orderFromWS.ingredients.map(
    (value) => allIngredients.find((v) => value === v._id)!
  );

  const sum = ingredientsSum(ingredients);

  return {
    number: orderFromWS.number,
    sum: sum,
    time: orderFromWS.createdAt,
    name: orderFromWS.name,
    status: orderFromWS.status,
    ingredients: ingredients,
  };
};

//передача уникальных элементов массива объектов
export const getUniqueIngredients = (ingredients: IIngredient[]) => {
  let temporyObject: Record<string, boolean> = {};
  let uniqueIngredients = [];

  for (let i = 0; i < ingredients.length; i++) {
    if (temporyObject[ingredients[i]._id]) {
      continue;
    }

    temporyObject[ingredients[i]._id] = true;
    uniqueIngredients.push(ingredients[i]);
  }
  return uniqueIngredients;
};

//url с токеном для заказов определенного пользователя
export const getWsOrdersUrlWithToken = () => {
  const token = window.localStorage.getItem("access")?.slice(7);
  const wsUrl = "wss://norma.nomoreparties.space/orders";

  return `${wsUrl}?token=${token}`;
};
