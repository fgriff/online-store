import React, { FC, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.scss';
import classnames from 'classnames';

interface IModal {
  children: React.ReactNode;
  isOpen: boolean;
  setModalState: (active: boolean) => void;
}

const Modal: FC<IModal> = (props) => {
  const { isOpen, setModalState, children } = props;

  const element = useMemo(() => document.createElement('div'), []);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setIsVisible(true);
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  }, [isOpen]);

  const closeHandler = () => {
    setIsVisible(false);
    setTimeout(() => {
      setModalState(false);
    }, 300);
  };

  return isOpen
    ? createPortal(
        <div
          className={
            isVisible
              ? classnames(style.modal, style.modal__visible)
              : style.modal
          }
          onClick={closeHandler}
        >
          <div
            className={
              isVisible
                ? classnames(style.content, style.content__visible)
                : style.content
            }
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>,
        element,
      )
    : null;
};

export default Modal;
