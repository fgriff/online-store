import React from 'react';
import ShowInfo from '../ShowInfo/ShowInfo';
import Search from '../Search/Search';
import Sort from '../Sort/Sort';
import View from '../View/View';
import styles from './GoodsPageHeader.module.scss';

const GoodsPageHeader = () => {
  return (
    <div className={styles.goodsHeader}>
      <Sort />
      <ShowInfo
        title={'Found: '}
        total={50}
      />
      <Search />
      <View />
    </div>
  );
};

export default GoodsPageHeader;
