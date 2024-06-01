import React from "react";
import { Modal } from "../modal/modal";
import OrderStyle from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';


export const OrderDetails = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className={OrderStyle.orderBlock}>
        <p className={`text text_type_digits-large mb-8 ${OrderStyle.shadowTitle}`}>
          123456
        </p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <div className={OrderStyle.underGIF}>
          <CheckMarkIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-15">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};

OrderDetails.propTypes={
  onClose: PropTypes.func.isRequired
}
