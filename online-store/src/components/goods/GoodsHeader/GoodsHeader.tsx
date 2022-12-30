import React from 'react';
import ShowInfo from '../../ShowInfo/ShowInfo';
import GoodsSearch from '../GoodsSearch/GoodsSearch';
import GoodsSort from '../GoodsSort/GoodsSort';
import LayoutToggle from '../../layout/LayoutToggle/LayoutToggle';
import styles from './GoodsHeader.scss';

const GoodsHeader = () => {
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

export default GoodsHeader;
