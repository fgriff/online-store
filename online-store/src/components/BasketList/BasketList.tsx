import React, { FC } from 'react';
import s from './BasketList.scss';
import BasketCart from '../BasketCart/BasketCart';
import { IBasket } from '../../types/basket';

interface IBasketList {
  basket: IBasket;
  incQuantity: (id: number) => void;
  decQuantity: (id: number) => void;
}

const BasketList: FC<IBasketList> = (props) => {
  const { basket, incQuantity, decQuantity } = props;

  return (
    <div className={s.list}>
      <h2 className={s.list__title}>Products In Cart</h2>
      {basket.map((prod, index) => (
        <BasketCart
          key={prod.id}
          basket={prod}
          item={index + 1}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      ))}
    </div>
  );
};

export default BasketList;
