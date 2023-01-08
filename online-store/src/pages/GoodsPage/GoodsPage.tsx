import React, { useEffect } from 'react';
import styles from './GoodsPage.scss';
import FiltersList from '../../components/filters/FiltersList/FiltersList';
import GoodsList from '../../components/goods/GoodsList/GoodsList';
import GoodsHeader from '../../components/goods/GoodsHeader/GoodsHeader';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { getProductsTotalCount } from '../../utils/productsCount';
import {
  resetFilters,
  setFilteredData,
  setInitialData,
} from '../../redux/slices/filtersSlice';
import { filterData } from '../../utils/filterData';
import database from '../../assets/mocks/storage-mock';
import { useSearchParams } from 'react-router-dom';

const GoodsPage = () => {
  const {
    filterValues: filters,
    filterValues: { layout },
    initialProducts,
    filteredProducts: products,
  } = useTypedSelector(({ filters }) => filters);

  const dispatch = useTypedDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const keys = [...searchParams.keys()];

    if (!keys.length) {
      dispatch(resetFilters());
    }

    const initialCount = getProductsTotalCount(database);

    dispatch(setInitialData({ initialCount, initialProducts: database }));
  }, []);

  useEffect(() => {
    const filteredData = filterData(initialProducts, filters);
    const filteredCount = getProductsTotalCount(filteredData);

    dispatch(setFilteredData({ filteredCount, products: filteredData }));
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
