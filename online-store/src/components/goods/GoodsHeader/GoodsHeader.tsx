import React, { FC } from 'react';
import ShowInfo from '../../ShowInfo/ShowInfo';
import GoodsSearch from '../GoodsSearch/GoodsSearch';
import GoodsSort from '../GoodsSort/GoodsSort';
import LayoutToggle from '../../layout/LayoutToggle/LayoutToggle';
import styles from './GoodsHeader.scss';
import { IProductsCount } from '../../../types/filters';

const GoodsHeader: FC<IProductsCount> = (props) => {
  const { count } = props;

  return (
    <div className={styles.goodsHeader}>
      <GoodsSort />
      <ShowInfo
        title={'Found: '}
        total={count}
      />
      <GoodsSearch />
      <LayoutToggle />
    </div>
  );
};

export default GoodsHeader;
