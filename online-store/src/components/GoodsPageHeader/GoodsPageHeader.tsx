import React from 'react';
import ShowInfo from '../ShowInfo/ShowInfo';
import GoodsSearch from '../GoodsSearch/GoodsSearch';
import GoodsSort from '../GoodsSort/GoodsSort';
import LayoutToggle from '../LayoutToggle/LayoutToggle';
import styles from './GoodsPageHeader.scss';

const GoodsPageHeader = () => {
  return (
    <div className={styles.goodsHeader}>
      <GoodsSort />
      <ShowInfo
        title={'Found: '}
        total={50}
      />
      <GoodsSearch />
      <LayoutToggle />
    </div>
  );
};

export default GoodsPageHeader;
