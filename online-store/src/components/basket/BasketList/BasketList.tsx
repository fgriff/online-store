import React, { FC } from 'react';
import style from './BasketList.scss';
import BasketCart from '../BasketCart/BasketCart';
import { IProduct } from '../../../types/basket';

interface IBasketList {
  basket: {
    [key: number]: {
      product: IProduct;
      quantity: number;
    };
  };
  incQuantity: (id: number) => void;
  decQuantity: (id: number) => void;
}

const BasketList: FC<IBasketList> = (props) => {
  const { basket, incQuantity, decQuantity } = props;

  const cards = Object.values(basket);

  return (
    <div className={style.list}>
      <h2 className={style.list__title}>Products In Cart</h2>
      {cards.map((card, index) => (
        <BasketCart
          key={card.product.id}
          card={card}
          item={index + 1}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      ))}
    </div>
  );
};

export default BasketList;
