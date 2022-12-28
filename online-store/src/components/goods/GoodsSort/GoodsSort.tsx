import React from 'react';
import styles from './GoodsSort.scss';

const GoodsSort = () => {
  return (
    <div className={styles.sorting}>
      <select className={styles.sorting__select}>
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
