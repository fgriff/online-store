import React, { useState } from 'react';
import s from './BasketPage.scss';
import BasketList from '../../components/BasketList/BasketList';
import BasketSummary from '../../components/BasketSummary/BasketSummary';
import { IBasket } from '../../types/basket';

import basketMock from '../../assets/mocks/basket-mock';

const BasketPage = () => {
  const [basketState, setBasketState] = useState<IBasket>(basketMock);
  console.log('basketState', basketState);

  const incQuantityHandler = (id: number): void => {
    setBasketState(
      basketState.map((prod) => {
        return prod.id === id
          ? { ...prod, quantity: prod.quantity + 1 }
          : { ...prod };
      }),
    );
  };

  const decQuantityHandler = (id: number): void => {
    setBasketState(
      basketState
        .map((prod) => {
          return prod.id === id
            ? { ...prod, quantity: prod.quantity - 1 }
            : { ...prod };
        })
        .filter((prod) => prod.quantity !== 0),
    );
  };

  const totalSum = basketState.reduce((sum, prod) => {
    return sum + prod.price * prod.quantity;
  }, 0);

  const products = basketState.reduce((sum, prod) => {
    return sum + prod.quantity;
  }, 0);

  return (
    <div className={s.basket}>
      <BasketList
        basket={basketState}
        incQuantity={incQuantityHandler}
        decQuantity={decQuantityHandler}
      />
      <BasketSummary
        products={products}
        total={totalSum}
      />
    </div>
  );
};

export default BasketPage;
