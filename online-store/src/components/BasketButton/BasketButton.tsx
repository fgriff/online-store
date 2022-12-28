import React, { FC } from 'react';
import style from './BasketButton.scss';

interface IButton {
  children: React.ReactNode;
  noClick: (id: number) => void;
  id: number;
}

const BasketButton: FC<IButton> = (props) => {
  const { children, id, noClick } = props;
  return (
    <button
      onClick={() => noClick(id)}
      className={style.button}
    >
      {children}
    </button>
  );
};

export default BasketButton;
