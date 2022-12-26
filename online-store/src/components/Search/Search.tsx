import React from 'react';
import styles from './Search.module.scss';

const Search = () => {
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

export default Search;
