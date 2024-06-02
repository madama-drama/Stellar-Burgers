import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ShopingCartStyle from "./shoping-cart.module.css";
import PropTypes from "prop-types";

export const ShopingCart = ({ ingredients }) => {
  if (ingredients.length === 0) {
    return null;
  }

  let firstBun = (
    <ConstructorElement
      isLocked={true}
      type="top"
      thumbnail={ingredients[0].image_mobile}
      text={`${ingredients[0].name} (верх)`}
      price={ingredients[0].price}
    />
  );

  let lastBun = (
    <ConstructorElement
      isLocked={true}
      type="bottom"
      thumbnail={ingredients[0].image_mobile}
      text={`${ingredients[0].name} (низ)`}
      price={ingredients[0].price}
    />
  );

  let positionList = ingredients.slice(1, ingredients.length).map((ingr) => {
    if (ingr.type === "bun") {
      return null;
    }

    return (
      <div className={ShopingCartStyle.shiftPosition} key={ingr._id}>
        <div className={ShopingCartStyle.positionSize}>
          {<DragIcon type="primary" />}
        </div>
        <ConstructorElement
          thumbnail={ingr.image_mobile}
          text={ingr.name}
          price={ingr.price}
        />
      </div>
    );
  });

  return (
    <>
      <div className="pl-7">{firstBun}</div>
      <div className={ShopingCartStyle.scrollCart}>{positionList}</div>
      <div className="pl-7">{lastBun}</div>
    </>
  );
};

ShopingCart.propTypes = {
  ingredients: PropTypes.array.isRequired,
};
