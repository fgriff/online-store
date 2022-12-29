import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { setSortType } from '../../../redux/slices/filtersSlice';
import styles from './GoodsSort.scss';

const GoodsSort = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(setSortType({ sortType: 'priceASC' }));
  }, []);

  const sortType = useTypedSelector((state) => state.filters.sortType);

  const onChangeHandler = (value: string) => {
    dispatch(setSortType({ sortType: value }));
  };

  return (
    <div className={styles.sorting}>
      <select
        className={styles.sorting__select}
        value={sortType}
        onChange={(e) => onChangeHandler(e.target.value)}
      >
        <option value="priceASC">Price (asc)</option>
        <option value="priceDESC">Price (desc)</option>
        <option value="brandASC">Brand (asc)</option>
        <option value="brandDESC">Brand (desc)</option>
        <option value="discountASC">Discount (asc)</option>
        <option value="discountDESC">Discount (desc)</option>
      </select>
    </div>
  );
};

export default GoodsSort;
