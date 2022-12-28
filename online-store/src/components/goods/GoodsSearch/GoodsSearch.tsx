import React from 'react';
import styles from './GoodsSearch.scss';

const GoodsSearch = () => {
  return (
    <div className={styles.search}>
      <input
        className={styles.search__input}
        type="search"
        placeholder="Search"
      />
    </div>
  );
};

export default GoodsSearch;
