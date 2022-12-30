import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { setSearchField } from '../../../redux/slices/filtersSlice';
import { updateSearchQueryParams } from '../../../utils/queryParams';
import styles from './GoodsSearch.scss';

const GoodsSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = useTypedSelector((state) => state.filters.searchValue);

  const dispatch = useTypedDispatch();

  const onChangeHandler = (value: string) => {
    dispatch(setSearchField({ searchValue: value }));
    updateSearchQueryParams(
      'search',
      value.toLowerCase(),
      searchParams,
      setSearchParams,
    );
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.search__input}
        type="search"
        value={searchValue}
        placeholder="Search"
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default GoodsSearch;
