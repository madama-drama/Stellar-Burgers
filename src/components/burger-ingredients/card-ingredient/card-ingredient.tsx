import React, { FC } from "react";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

import CardIngredientStyle from "./card-ingredient.module.css";
import { Link, useLocation } from "react-router-dom";

import { AppStore } from "../../../services";
import { IIngredient } from "../../../interfaces";

interface ICardProps{
  ingredient: IIngredient
}

export const CardIngredient: FC<ICardProps> = ({ ingredient }) => {
  const location = useLocation();

  const cart = useSelector((store: AppStore) => store.burgerConstructor.ingredients);

  const arrayIngredientsId = cart.filter((ingr) => ingr._id === ingredient._id);
  const counter = arrayIngredientsId.length;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
  });

  const ingredientId = ingredient._id;


  return (
    <Link className={CardIngredientStyle.underline}
      key={ingredientId}
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
    >
      <div
        ref={dragRef}
        className={CardIngredientStyle.card}
      >
        {counter > 0 && (
          <div>
            <Counter
              count={counter}
              size={counter <= 99 ? "default" : "small"}
            />
          </div>
        )}
        <img src={ingredient.image} alt={ingredient.name} />
        <p
          className={`${CardIngredientStyle.price} text text_type_digits-default`}
        >
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </p>
        <h3 className={`${CardIngredientStyle.name} text text_type_main-default mt-2`}>
          {ingredient.name}
        </h3>
      </div>
    </Link>
  );
};


