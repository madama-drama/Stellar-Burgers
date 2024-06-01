import React from "react";
import CardIngredientStyle from "./card-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientDetails } from "../../ingredient-details/ingredient-details";

export const CardIngredient = ({ ingredient }) => {
  const [opened, setOpened] = React.useState(false);

  const onClick = () => {
    setOpened(true);
  };

  const onClose = () => {
    setOpened(false);
  };

  return (
    <>
      <button onClick={onClick} className={CardIngredientStyle.card}>
        <img src={ingredient.image} alt="" />
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
        <IngredientDetails ingredient={ingredient} onClose={onClose} />
      )}
    </>
  );
};

CardIngredient.propTypes = {
  ingredient: PropTypes.array.isRequired
};
