import React from 'react';
import styles from './Sort.scss';

const Sort = () => {
  return (
    <div className={styles.sorting}>
      <select className={styles.sorting__select}>
        <option value="priceASC">
          <span>Price (asc)</span>
        </option>
        <option value="priceDESC">
          <span>Price (desc)</span>
        </option>
        <option value="brandASC">
          <span>Brand (asc)</span>
        </option>
        <option value="brandDESC">
          <span>Brand (desc)</span>
        </option>
        <option value="discountASC">
          <span>Discount (asc)</span>
        </option>
        <option value="discountDESC">
          <span>Discount (desc)</span>
        </option>
      </select>
    </div>
  );
};

export default Sort;
