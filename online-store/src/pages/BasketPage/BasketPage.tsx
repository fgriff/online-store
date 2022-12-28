import React, { useState } from 'react';
import style from './BasketPage.scss';
import BasketList from '../../components/BasketList/BasketList';
import BasketSummary from '../../components/BasketSummary/BasketSummary';
import { IBasketData } from '../../types/basket';

import basketMock from '../../assets/mocks/basket-mock';

const BasketPage = () => {
  const [basketState, setBasketState] = useState<IBasketData>(basketMock);

  const incQuantityHandler = (id: number): void => {
    setBasketState((basket) => {
      const product = basket.find((prod) => prod.id === id);
      if (product) product.quantity += 1;
      return [...basket];
    });
  };

  const decQuantityHandler = (id: number): void => {
    setBasketState((basket) => {
      const product = basket.find((prod) => prod.id === id);
      if (product) product.quantity -= 1;
      return [...basket].filter((prod) => prod.quantity !== 0);
    });
  };

  const totalSum = basketState.reduce((sum, prod) => {
    return sum + prod.price * prod.quantity;
  }, 0);

  const totalProducts = basketState.reduce((sum, prod) => {
    return sum + prod.quantity;
  }, 0);

  return (
    <div className={style.basket}>
      <BasketList
        basket={basketState}
        incQuantity={incQuantityHandler}
        decQuantity={decQuantityHandler}
      />
      <BasketSummary
        totalProducts={totalProducts}
        totalSum={totalSum}
      />
    </div>
  );
};

export default BasketPage;
