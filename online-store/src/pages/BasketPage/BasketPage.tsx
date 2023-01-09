import React, { useEffect, useLayoutEffect, useState } from 'react';
import style from './BasketPage.scss';
import BasketList from '../../components/basket/BasketList/BasketList';
import BasketSummary from '../../components/basket/BasketSummary/BasketSummary';
import Modal from '../../components/Modal/Modal';
import { IProductsState, ITotal } from '../../types/basket';

import productsStorage from '../../assets/mocks/storage-mock';
import FormProductRegistration from '../../components/basket/FormProductRegistration/FormProductRegistration';
const basketContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
localStorage.setItem('basketContent', JSON.stringify(basketContent));

function BasketPage() {
  const [basketState, setBasketState] = useState<number[] | null>(null);
  const [productsState, setProductsState] = useState<IProductsState | null>(
    null,
  );
  const [total, setTotal] = useState<ITotal>({
    totalSum: 0,
    totalProducts: 0,
  });
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const localBasket = localStorage.getItem('basketContent');
    if (localBasket !== null) {
      const basketContent = JSON.parse(localBasket);
      setBasketState(basketContent);
    }
  }, []);

  useEffect(() => {
    if (basketState !== null) {
      const products = getBasketProduct(basketState);
      setProductsState(products);
    }
  }, [basketState]);

  useLayoutEffect(() => {
    setTotal(() => {
      let totalSum = 0;
      let totalProducts = 0;
      if (productsState !== null) {
        Object.values(productsState).forEach((prod) => {
          totalSum = totalSum + prod.product.price * prod.quantity;
          totalProducts = totalProducts + prod.quantity;
        });
      }
      return { totalSum, totalProducts };
    });

    if (productsState !== null) {
      const basketContent = Object.keys(productsState);
      localStorage.setItem('basketContent', JSON.stringify(basketContent));
    }
  }, [productsState]);

  const getBasketProduct = (arr: number[]): IProductsState => {
    const res: IProductsState = {};
    productsStorage.forEach((prod) => {
      if (arr.includes(prod.id)) {
        res[prod.id] = { product: prod, quantity: 1 };
      }
    });
    return res;
  };

  const incQuantityHandler = (id: number): void => {
    if (productsState === null) return;

    const newProductsState = { ...productsState };
    const prod = newProductsState[id];
    prod.quantity += 1;

    setProductsState(newProductsState);
  };

  const decQuantityHandler = (id: number): void => {
    if (productsState === null) return;

    const newProductsState = { ...productsState };
    const prod = newProductsState[id];
    prod.quantity -= 1;
    if (prod.quantity === 0) {
      delete newProductsState[id];
    }

    setProductsState(newProductsState);
  };

  return (
    <div className={style.basket}>
      {productsState !== null ? (
        <BasketList
          basket={productsState}
          incQuantity={incQuantityHandler}
          decQuantity={decQuantityHandler}
        />
      ) : (
        <div className={style.empty}>The basket is empty</div>
      )}
      <BasketSummary
        totalProducts={total.totalProducts}
        totalSum={total.totalSum}
        onClick={setModalActive}
      />
      <Modal
        isOpen={modalActive}
        setModalState={setModalActive}
      >
        <FormProductRegistration />
      </Modal>
    </div>
  );
}

export default BasketPage;
