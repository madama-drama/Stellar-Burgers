import React, { FC, ReactNode } from "react";
import cx from 'classnames'
import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";


interface IModalProps{
  title?: string,
  children: ReactNode
  onClose: ()=>void
}

const modalsRoot = document.getElementById("react-modals")!;

export const Modal: FC<IModalProps> = ({ title, children, onClose }) => {
  React.useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <section className={cx(ModalStyles.windowSize)} data-testid='modalCard'>
        <div className={ModalStyles.titleBlock}>
          <h1 className={`text text_type_main-large ${ModalStyles.titleCard}`}>
            {title}
          </h1>
          <button className={cx(ModalStyles.buttonClose)} onClick={onClose} data-testid='close-button'>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </section>
    </ModalOverlay>,
    modalsRoot
  );
};


