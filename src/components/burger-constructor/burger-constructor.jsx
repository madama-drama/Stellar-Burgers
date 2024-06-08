import React from "react";
import { ShopingCart } from "./shoping-cart/shoping-cart";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyle from "./burger-constructor.module.css";
import { OrderDetails } from "../order-details/order-details";
import PropTypes from "prop-types";

export const BurgerConstructor = ({ ingredients }) => {
  const [order, setOrder] = React.useState(false);

  const onClick = () => {
    setOrder(true);
  };

  const onClose = () => {
    setOrder(false);
  };

  return (
    <div>
      <ShopingCart ingredients={ingredients} />
      <div className={ConstructorStyle.priceBlock}>
        <p className="text text_type_digits-medium ">900000</p>
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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
};
