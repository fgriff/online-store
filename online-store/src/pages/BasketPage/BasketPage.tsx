import React, { useEffect, useLayoutEffect, useState } from 'react';
import style from './BasketPage.scss';
import BasketList from '../../components/basket/BasketList/BasketList';
import BasketSummary from '../../components/basket/BasketSummary/BasketSummary';
import FormProductRegistration from '../../components/basket/FormProductRegistration/FormProductRegistration';
import Modal from '../../components/Modal/Modal';
import { IProductsState, ITotal } from '../../types/basket';
import { ILocalStorageProduct } from '../../types/localStorage';

import productsStorage from '../../assets/mocks/storage-mock';
import localStorage from '../../utils/localStorage';

import { addProduct, removeProduct } from '../../redux/slices/basketSlice';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';

function BasketPage() {
  const isModal = useTypedSelector(({ basket }) => basket.isModal);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (localStorage.isNotEmpty()) {
      const savedData = localStorage.products;
      const products = getBasketProduct(savedData);
      setProductsState(products);
    }
  }, []);

  const [productsState, setProductsState] = useState<IProductsState>({});
  const [total, setTotal] = useState<ITotal>({
    totalSum: 0,
    totalProducts: 0,
  });
  const [modalActive, setModalActive] = useState(false);

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
  }, [productsState]);

  const getBasketProduct = (data: ILocalStorageProduct[]): IProductsState => {
    const res: IProductsState = {};
    productsStorage.forEach((prod) => {
      data.forEach((item) => {
        if (item.id === prod.id) {
          res[prod.id] = { product: prod, quantity: item.count };
        }
      });
    });
    return res;
  };

  const incQuantityHandler = (id: number, price: number): void => {
    if (productsState === null) return;

    const newProductsState = { ...productsState };
    const prod = newProductsState[id];
    prod.quantity += 1;

    localStorage.addProduct(id);
    dispatch(addProduct({ price }));
    setProductsState(newProductsState);
  };

  const decQuantityHandler = (id: number, price: number): void => {
    if (productsState === null) return;

    const newProductsState = { ...productsState };
    const prod = newProductsState[id];
    prod.quantity -= 1;
    if (prod.quantity === 0) {
      delete newProductsState[id];
    }

    localStorage.removeProduct(id);
    dispatch(removeProduct({ price }));
    setProductsState(newProductsState);
  };

  const hasProducts = Object.keys(productsState).length !== 0;

  return (
    <div className={style.basket}>
      {hasProducts ? (
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
      {}
      <Modal
        isOpen={modalActive || isModal}
        setModalState={setModalActive}
      >
        <FormProductRegistration />
      </Modal>
    </div>
  );
}

export default BasketPage;
