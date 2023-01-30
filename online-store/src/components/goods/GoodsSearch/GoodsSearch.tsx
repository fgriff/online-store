import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { setSearchField } from '../../../redux/slices/filtersSlice';
import { updateSearchQueryParams } from '../../../utils/queryParams';
import { parseQueryString } from '../../../utils/queryParser';
import styles from './GoodsSearch.scss';

const GoodsSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    parseQueryString('search', searchParams, dispatch);
  }, []);

  const searchValue = useTypedSelector(
    ({ filters }) => filters.filterValues.search,
  );

  const onChangeHandler = (value: string) => {
    dispatch(setSearchField({ search: value }));
    updateSearchQueryParams(
      'search',
      value.toLowerCase(),
      searchParams,
      setSearchParams,
    );
  };

  return (
    <div className={styles.searchField}>
      <input
        className={styles.searchField__input}
        type="search"
        value={searchValue}
        placeholder="Search"
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default GoodsSearch;
