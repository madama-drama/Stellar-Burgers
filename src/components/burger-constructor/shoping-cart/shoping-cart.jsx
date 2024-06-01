import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ShopingCartStyle from "./shoping-cart.module.css";
import PropTypes from 'prop-types';

export const ShopingCart = ({ingredients}) => {
  let PositionList = ingredients.map((ingr, i) => {
    let type = undefined;

    if (i === 0) {
      type = "top";
    } else if (i === ingredients.length - 1) {
      type = "bottom";
    }

    return (
      <div className={ShopingCartStyle.shiftPosition}>
        <div className={ShopingCartStyle.positionSize}>{!type && <DragIcon type="primary" />}</div>
        <ConstructorElement
          isLocked={Boolean(type)}
          type={type}
          thumbnail={ingr.image_mobile}
          text={ingr.name}
          price={ingr.price}
        />
      </div>
    );
  });

  return (
    <div className={ShopingCartStyle.scrollCart}>
      {PositionList}
    </div>
  );
};

ShopingCart.propTypes ={
  ingredients: PropTypes.array.isRequired
}
