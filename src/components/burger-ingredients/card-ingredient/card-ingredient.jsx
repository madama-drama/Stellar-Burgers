import React from "react";
import CardIngredientStyle from "./card-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientDetails } from "../../ingredient-details/ingredient-details";
import { Modal } from "../../modal/modal";

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
        <img src={ingredient.image} alt={ingredient.name}/>
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
