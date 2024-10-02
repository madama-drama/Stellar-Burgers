import React, { useMemo } from "react";
import { ShopingCart } from "./shoping-cart/shoping-cart";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyle from "./burger-constructor.module.css";
import { OrderDetails } from "../order-details/order-details";
import { useSelector, useDispatch } from "react-redux";
import { postOrderRequest } from "../../services/order";
import { useNavigate } from "react-router-dom";

import { AppStore, AppDispatch } from "../../services";
import { ingredientsSum } from "../../functions";

export const BurgerConstructor = () => {
  const navigate = useNavigate();
  const orderCart = useSelector(
    (store: AppStore) => store.burgerConstructor.ingredients
  );
  const dispatch = useDispatch<AppDispatch>();

  const [order, setOrder] = React.useState(false);
  const user = useSelector((store: AppStore) => store.auth.user);

  const onClick = () => {
    if (user) {
      setOrder(true);

      const ingredientsIds = orderCart.map((ingr) => ingr._id);
      dispatch(postOrderRequest(ingredientsIds));
    } else {
      return navigate("/login");
    }
  };

  const onClose = () => {
    setOrder(false);
  };

  const sum = useMemo(() => ingredientsSum(orderCart), [orderCart]);

  return (
    <div>
      <ShopingCart />
      <div className={ConstructorStyle.priceBlock}>
        <p className="text text_type_digits-medium ">{sum}</p>
        <CurrencyIcon type="primary" />
        <Button
          onClick={onClick}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
        {order && <OrderDetails onClose={onClose} />}
      </div>
    </div>
  );
};
