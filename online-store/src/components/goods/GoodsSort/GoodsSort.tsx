import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { setSortType } from '../../../redux/slices/filtersSlice';
import { updateSortQueryParams } from '../../../utils/queryParams';
import { parseQueryString } from '../../../utils/queryParser';
import styles from './GoodsSort.scss';

const GoodsSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(setSortType({ sort: 'selected' }));
    parseQueryString('sort', searchParams, dispatch);
  }, []);

  const sortType = useTypedSelector(({ filters }) => filters.filterValues.sort);

  const onChangeHandler = (value: string) => {
    dispatch(setSortType({ sort: value }));
    updateSortQueryParams(
      'sort',
      value.toLowerCase(),
      searchParams,
      setSearchParams,
    );
  };

  return (
    <div className={styles.sorting}>
      <select
        className={styles.sorting__select}
        value={sortType}
        onChange={(e) => onChangeHandler(e.target.value)}
      >
        <option
          disabled
          value="selected"
        >
          Sort options:
        </option>
        <option value="price-asc">Price (asc)</option>
        <option value="price-desc">Price (desc)</option>
        <option value="brand-asc">Brand (asc)</option>
        <option value="brand-desc">Brand (desc)</option>
        <option value="discount-asc">Discount (asc)</option>
        <option value="discount-desc">Discount (desc)</option>
      </select>
    </div>
  );
};

export default GoodsSort;
