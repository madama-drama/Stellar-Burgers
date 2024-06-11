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

export const BurgerConstructor = () => {
  const orderCart = useSelector((store) => store.burgerConstructor.ingredients);
  const dispatch = useDispatch();

  const [order, setOrder] = React.useState(false);

  const onClick = () => {
    setOrder(true);

    const orederIds = orderCart.map((ingr) => ingr._id);
    dispatch(postOrderRequest(orederIds));
  };

  const onClose = () => {
    setOrder(false);
  };

  const sum = useMemo(() => {
    let sum = 0;
    orderCart.forEach((ing) => {
      if (ing.type === "bun") {
        sum += ing.price * 2;
      } else {
        sum += ing.price;
      }
    });

    return sum;
  }, [orderCart]);

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
