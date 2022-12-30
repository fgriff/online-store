import React from 'react';
import styles from './GoodsPage.scss';
import FiltersList from '../../components/filters/FiltersList/FiltersList';
import GoodsList from '../../components/goods/GoodsList/GoodsList';
import GoodsHeader from '../../components/goods/GoodsHeader/GoodsHeader';
import { useTypedSelector } from '../../redux/hooks';

const GoodsPage = () => {
  const isGrid = useTypedSelector((state) => state.filters.isGrid);
  const layout = isGrid ? 'grid' : 'list';

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
