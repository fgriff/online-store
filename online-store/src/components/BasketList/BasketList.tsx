import React, { FC } from 'react';
import s from './BasketList.scss';
import BasketCart from '../BasketCart/BasketCart';
import { IBasket } from '../../types/basket';

interface IBasketList {
  basket: IBasket;
  addQuantity: (id: number) => void;
  minusQuantity: (id: number) => void;
}

const BasketList: FC<IBasketList> = (props) => {
  const { basket, addQuantity, minusQuantity } = props;

  return (
    <div className={s.list}>
      <h2 className={s.list__title}>Products In Cart</h2>
      {basket.map((prod, index) => (
        <BasketCart
          key={prod.id}
          basket={prod}
          item={index + 1}
          addQuantity={addQuantity}
          minusQuantity={minusQuantity}
        />
      ))}
    </div>
  );
};

export default BasketList;
