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
      <div className={styles.goodsHeader__left}>
        <GoodsSort />
        <ShowInfo
          title={'Found: '}
          total={count}
        />
      </div>
      <div className={styles.goodsHeader__right}>
        <GoodsSearch />
        <LayoutToggle />
      </div>
    </div>
  );
};

export default GoodsHeader;
