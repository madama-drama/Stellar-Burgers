import React, { useEffect } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";

import { actions } from "../../../services/burger-constructor";
import { ElementContainer } from "../element-container/container";
import ShopingCartStyle from "./shoping-cart.module.css";

export const ShopingCart = () => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const cart = useSelector((store) => store.burgerConstructor.ingredients);

  const dispatch = useDispatch();

  // добавляем начальную булку
  useEffect(() => {
    if (ingredients.length && !cart[0]) {
      const firstBun = ingredients.find((i) => i.type === "bun");

      dispatch(actions.add(firstBun));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, dispatch]);

  const handleAdd = ({ id }) => {
    dispatch(actions.add(ingredients.find((ingr) => ingr._id === id)));
  };

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    drop: handleAdd,
  });

  if (cart.length === 0) {
    return null;
  }

  const positionList = cart.slice(1, cart.length).map((ingr, index) => {
    return <ElementContainer ingredient={ingr} order={index + 1} key={ingr.id} />;
  });

  return (
    <div ref={dropTargetRef}>
      <div className="pl-7">
        <ConstructorElement
          isLocked={true}
          type="top"
          thumbnail={cart[0].image_mobile}
          text={`${cart[0].name} (верх)`}
          price={cart[0].price}
        />
      </div>

      <div className={ShopingCartStyle.scrollCart}>{positionList}</div>

      <div className="pl-7">
        <ConstructorElement
          isLocked={true}
          type="bottom"
          thumbnail={cart[0].image_mobile}
          text={`${cart[0].name} (низ)`}
          price={cart[0].price}
        />
      </div>
    </div>
  );
};
