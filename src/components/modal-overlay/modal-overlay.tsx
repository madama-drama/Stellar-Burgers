import React, { FC, ReactNode } from "react";
import cx from 'classnames'
import OverlayStyles from "./modal-overlay.module.css";

interface IOverlayProps {
  onClose: () => void;
  children: ReactNode;
}
export const ModalOverlay: FC<IOverlayProps> = ({ onClose, children }) => {
  return (
    <div className={OverlayStyles.back}>
      <div className={cx(OverlayStyles.shadow)} onClick={onClose} data-testid='overlay' />
      {children}
    </div>
  );
};
