import React, { FC, ReactNode } from "react";
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

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <section className={ModalStyles.windowSize}>
        <div className={ModalStyles.titleBlock}>
          <h1 className={`text text_type_main-large ${ModalStyles.titleCard}`}>
            {title}
          </h1>
          <button className={ModalStyles.buttonClose} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </section>
    </ModalOverlay>,
    modalsRoot
  );
};


