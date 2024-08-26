import React from "react";
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
  // useEffect(() => {

  // const firstBun = ingredients.find((i) => i.type === "bun");

  // dispatch(actions.add(firstBun));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ingredients, dispatch]);

  const handleAdd = ({ id }) => {
    dispatch(actions.add(ingredients.find((ingr) => ingr._id === id)));
  };

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    drop: handleAdd,
  });

  const positionList = cart.slice(1, cart.length).map((ingr, index) => {
    return (
      <ElementContainer ingredient={ingr} order={index + 1} key={ingr.id} />
    );
  });

  return (
    <div ref={dropTargetRef}>
      {!cart.length ? (
        <div className={ShopingCartStyle.blockText}>
          <p className="text text_type_main-medium text_color_inactive">
            Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
          </p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
