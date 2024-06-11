import React from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

import CardIngredientStyle from "./card-ingredient.module.css";
import { IngredientDetails } from "../../ingredient-details/ingredient-details";
import { Modal } from "../../modal/modal";

export const CardIngredient = ({ ingredient }) => {
  const [opened, setOpened] = React.useState(false);

  const cart = useSelector((store) => store.burgerConstructor.ingredients);

  const arrayIngredientsId = cart.filter((ingr) => ingr._id === ingredient._id);
  const counter = arrayIngredientsId.length;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
  });

  const onClick = () => setOpened(true);
  const onClose = () => setOpened(false);

  return (
    <>
      <button
        ref={dragRef}
        onClick={onClick}
        className={CardIngredientStyle.card}
      >
        {counter > 0 && (
          <div className={CardIngredientStyle.counterPosition}>
              <Counter count={counter} size={counter <= 99 ? "default" : "small"} />
          </div>
        )}
        <img src={ingredient.image} alt={ingredient.name} />
        <p
          className={`${CardIngredientStyle.price} text text_type_digits-default`}
        >
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </p>
        <h3 className={`text text_type_main-default mt-2`}>
          {ingredient.name}
        </h3>
      </button>
      {opened && (
        <Modal title={"Детали ингредиента"} onClose={onClose}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

CardIngredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
};
