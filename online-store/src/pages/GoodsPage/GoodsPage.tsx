import React, { useEffect } from 'react';
import styles from './GoodsPage.scss';
import FiltersList from '../../components/filters/FiltersList/FiltersList';
import GoodsList from '../../components/goods/GoodsList/GoodsList';
import GoodsHeader from '../../components/goods/GoodsHeader/GoodsHeader';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { URL } from '../../utils/constants';
import { getProductsTotalCount } from '../../utils/productsCount';
import { setInitialData } from '../../redux/slices/filtersSlice';

const GoodsPage = () => {
  const {
    filterValues: { layout },
  } = useTypedSelector(({ filters }) => filters);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    (async () => {
      const response = await fetch(URL);
      const dataBase = await response.json();
      const initialCount = getProductsTotalCount(dataBase.products);

      dispatch(
        setInitialData({ initialCount, initialProducts: dataBase.products }),
      );
    })();
  }, []);

  return (
    <div className={styles.goodsPage}>
      <FiltersList />
      <div className={styles.goodsWrapper}>
        <GoodsHeader />
        <GoodsList layout={layout} />
      </div>
    </div>
  );
};

export default GoodsPage;
