import React, { FC } from "react";
import Style from "./mini-photos.module.css";
import cx from 'classnames'

interface IPhotosProps {
  image?: string;
  name?: string;
  index?: number;
  className?: string;
}

export const MiniPhotos: FC<IPhotosProps> = ({ image, name, index, className }) => {
  return (
    <div className={cx(Style.firstCircle, className)} style={{ zIndex: index }}>
      <div className={Style.secondCircle}>
        <img src={image} alt={name} className={Style.photo} />
      </div>
    </div>
  );
};
