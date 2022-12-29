import React from 'react';
import styles from './GoodsPage.scss';
import FiltersList from '../../components/filters/FiltersList/FiltersList';
import GoodsList from '../../components/goods/GoodsList/GoodsList';
import GoodsHeader from '../../components/goods/GoodsHeader/GoodsHeader';

const GoodsPage = () => {
  const isGrid = false;
  const layout = isGrid ? 'list' : 'grid';

  return (
    <div className={styles.goodsPage}>
      <FiltersList />
      <div className={styles.goodsWrapper}>
        <GoodsHeader />
        <GoodsList layout={layout} />
      </div>
    </div>
  );
};

export default GoodsPage;
