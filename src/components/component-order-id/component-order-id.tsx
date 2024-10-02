import React, { FC } from "react";
import Styles from "./component-order-id.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../types/interfaces";
import { Ingredient } from "./ingredient";
import { getUniqueIngredients } from "../../functions";

export interface IComponentOrderIdProps {
  number: number;
  name: string;
  status: string;
  ingredients: IIngredient[];
  time: string;
  sum: number;
}

export const ComponentOrderId: FC<IComponentOrderIdProps> = ({
  number,
  name,
  status,
  ingredients,
  time,
  sum,
}) => {
  const counter: Record<string, number> = {};
  ingredients.forEach(({ _id }) => {
    if (counter[_id]) {
      counter[_id] += 1;
    } else {
      counter[_id] = 1;
    }
  });

  console.log(ingredients)

  let uniqueIngredients = getUniqueIngredients(ingredients)

  const ingredient = uniqueIngredients.map((value) => (
    <Ingredient
      key={value._id}
      photo={value.image_mobile}
      name={value.name}
      price={value.price}
      type={value.type}
      counter={counter[value._id]} //как передавать один ингредиент из нескольких
    />
  ));

  return (
    <div className={Styles.block}>
      <h2 className={`text text_type_digits-default mb-8 ${Styles.center}`}>
        #{number}
      </h2>
      <h1 className="text text_type_main-medium mb-3">{name}</h1>
      <p className={`${Styles.colored} text text_type_main-default mb-15`}>
        {status === "done" ? "Выполнен" : "Готовится"}
      </p>
      <h2 className="text text_type_main-medium mb-6">Состав:</h2>

      <div className={Styles.structure}>{ingredient} </div>

      <div className={Styles.priceAndDate}>
        <FormattedDate
          date={new Date(time)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={Styles.sum}>
          <p className="text text_type_digits-default mr-2">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
