import React, { FC } from "react";
import cx from "classnames";
import Styles from "./order-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { AppStore, useSelector } from "../../services";
import { MiniPhotos } from "./mini-photos";
import { getUniqueIngredients, ingredientsSum } from "../../functions";
import { IIngredient } from "../../types/interfaces";

interface IOrderCard {
  orderNum: number;
  ingredients: Array<string>;
  name: string;
  time: string;
  url: string;
  orderStatus?: string;
}

const statusToText: Record<string, string> = {
  done: "Выполнен",
  pending: "Готовится",
  created: "Создан",
};

export const OrderCard: FC<IOrderCard> = ({
  url,
  orderNum,
  ingredients,
  name,
  time,
  orderStatus,
}) => {
  const location = useLocation();
  const allIngredients = useSelector(
    (store: AppStore) => store.ingredients.ingredients
  );

  const orderIngredient = ingredients
    .map((value) => allIngredients.find((v) => value === v._id))
    .filter((value): value is IIngredient => Boolean(value));

  if (!orderIngredient) {
    return null;
  }

  let sum = ingredientsSum(orderIngredient);

  let uniqueIngredients = getUniqueIngredients(orderIngredient);

  const miniPhotos = uniqueIngredients
    .slice(0, 6)
    .map((value, idx) => (
      <MiniPhotos
        key={idx}
        image={value?.image_mobile}
        name={value?.name}
        index={orderIngredient.length - idx}
      />
    ));

  return (
    <Link
      to={url}
      state={{ background: location }}
      className={Styles.linkBlock}
    >
      <div className={Styles.block}>
        <div className={` ${Styles.timeAndNumber}`}>
          <p className="text text_type_digits-default">#{orderNum}</p>

          <FormattedDate
            date={new Date(time)}
            className="text text_type_main-default text_color_inactive"
          />
        </div>

        <div className={Styles.nameBlock}>
          <h1 className={`text text_type_main-medium mt-6 `}>{name}</h1>

          {orderStatus && (
            <h2
              className={cx(
                "text",
                "text_type_main-small",
                orderStatus === "done" && Styles.done
              )}
            >
              {statusToText[orderStatus]}
            </h2>
          )}
        </div>

        <div className={Styles.priceAndPhotos}>
          <div className={Styles.photosBlock}> {miniPhotos}</div>
          <div className={Styles.price}>
            <p className="text text_type_digits-default">{sum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
