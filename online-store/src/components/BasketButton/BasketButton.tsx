import React, { FC } from 'react';
import s from './BasketButton.scss';

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
      className={s.button}
    >
      {children}
    </button>
  );
};

export default BasketButton;
