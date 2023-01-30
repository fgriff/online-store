import React, { useEffect, useState } from 'react';
import style from './BasketPage.scss';
import BasketList from '../../components/basket/BasketList/BasketList';
import BasketSummary from '../../components/basket/BasketSummary/BasketSummary';
import FormProductRegistration from '../../components/basket/FormProductRegistration/FormProductRegistration';
import Modal from '../../components/Modal/Modal';
import { IProductsState } from '../../types/basket';
import { ILocalStorageProduct } from '../../types/localStorage';

import productsStorage from '../../assets/mocks/storage-mock';
import localStorage from '../../utils/localStorage';

import { setProductsState } from '../../redux/slices/basketSlice';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';

function BasketPage() {
  const isModal = useTypedSelector(({ basket }) => basket.isModal);

  const dispatch = useTypedDispatch();
  const productsState = useTypedSelector((state) => state.basket.productsState);

  useEffect(() => {
    if (localStorage.isNotEmpty()) {
      const savedData = localStorage.products;
      const products = getBasketProduct(savedData);
      dispatch(setProductsState({ products }));
    }
  }, [dispatch, localStorage]);

  const [modalActive, setModalActive] = useState(false);

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

  const hasProducts = Object.keys(productsState).length !== 0;

  return (
    <div className={style.basket}>
      {hasProducts ? (
        <BasketList basket={productsState} />
      ) : (
        <div className={style.empty}>The basket is empty</div>
      )}
      <BasketSummary onClick={setModalActive} />

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
