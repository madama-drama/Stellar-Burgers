import React, { FC } from "react";
import Styles from "./progress-orders.module.css";
import { IOrder } from "../../types/list-order";

interface IProgressProps {
  counterToday: number | undefined;
  counterAll: number | undefined;
  orders: IOrder[] | undefined;
}

export const ProgressOrders: FC<IProgressProps> = ({
  counterToday,
  counterAll,
  orders,
}) => {

  const done = orders
    ?.filter((statusDone) => statusDone.status === "done")
    .map((v) => (
      <p
        key={v._id}
        className={`text text_type_digits-default mb-2 ${Styles.num}`}
      >
        {v.number}
      </p>
    ));

  const atWork = orders
    ?.filter((statusDone) => statusDone.status === "pending")
    .map((v) => (
      <p key={v._id} className="text text_type_digits-default mb-2">
        {v.number}
      </p>
    ));

  return (
    <div className={Styles.block}>
      <div className={Styles.ready}>
        <div className={Styles.inProgressSection}>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <div className={Styles.doneList}>{done}</div>
        </div>

        <div className={Styles.inProgressSection}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <div className={Styles.doneList}>{atWork}</div>
        </div>
      </div>

      <h2 className="text text_type_main-medium mt-15">
        Выполенено за все время:
      </h2>
      <p className={`text text_type_digits-large ${Styles.shadow}`}>
        {counterAll}
      </p>

      <h2 className="text text_type_main-medium mt-15">
        Выполенено за сегодня:
      </h2>
      <p className={`text text_type_digits-large ${Styles.shadow}`}>
        {counterToday}
      </p>
    </div>
  );
};
