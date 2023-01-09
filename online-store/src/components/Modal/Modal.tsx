import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.scss';
import classnames from 'classnames';
import { useTypedDispatch } from '../../redux/hooks';
import { closeModal } from '../../redux/slices/basketSlice';

interface IModal {
  children: React.ReactNode;
  isOpen: boolean;
  setModalState: (isOpen: boolean) => void;
}

function Modal(props: IModal) {
  const { isOpen, setModalState, children } = props;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setIsVisible(true);
  }, [isOpen]);

  const dispatch = useTypedDispatch();

  const closeHandler = () => {
    setIsVisible(false);
    setTimeout(() => {
      setModalState(false);
      dispatch(closeModal({ open: false }));
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
        document.body,
      )
    : null;
}

export default Modal;
