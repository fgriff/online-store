import React, { useEffect } from 'react';
import styles from './GoodsPage.scss';
import FiltersList from '../../components/filters/FiltersList/FiltersList';
import GoodsList from '../../components/goods/GoodsList/GoodsList';
import GoodsHeader from '../../components/goods/GoodsHeader/GoodsHeader';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { URL } from '../../utils/constants';
import { getProductsTotalCount } from '../../utils/productsCount';
import {
  setFilteredData,
  setInitialData,
} from '../../redux/slices/filtersSlice';
import { filterData } from '../../utils/filterData';

const GoodsPage = () => {
  const {
    filterValues: filters,
    filterValues: { layout },
    initialProducts,
    filteredProducts: products,
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

  useEffect(() => {
    (async () => {
      const filteredData = filterData(initialProducts, filters);
      const filteredCount = getProductsTotalCount(filteredData);

      dispatch(setFilteredData({ filteredCount, products: filteredData }));
    })();
  }, [filters]);

  return (
    <div className={styles.goodsPage}>
      <FiltersList />
      <div className={styles.goodsWrapper}>
        <GoodsHeader count={products.length} />
        <GoodsList layout={layout} />
      </div>
    </div>
  );
};

export default GoodsPage;
