import React, { FC, useCallback, useEffect } from 'react';
import style from './Modal.scss';
import classnames from 'classnames';

interface IModal {
  children: React.ReactNode;
  isActive: boolean;
  setActive: (active: boolean) => void;
}

const Modal: FC<IModal> = (props) => {
  const { isActive, setActive, children } = props;

  const stopScroll = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('scroll', stopScroll);
    } else window.removeEventListener('scroll', stopScroll);
  }, [isActive]);

  return (
    <div
      className={
        isActive ? classnames(style.modal, style.modal__active) : style.modal
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          isActive
            ? classnames(style.content, style.content__active)
            : style.content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
