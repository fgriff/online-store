import React from 'react';
import CheckboxFilter from '../../components/CheckboxFilter/CheckboxFilter';
import DualFilter from '../../components/DualFilter/DualFilter';
import GoodsCard from '../../components/GoodsCard/GoodsCard';
import GoodsHeader from '../../components/GoodsHeader/GoodsHeader';
import styles from './GoodsPage.scss';
import mockBrands from '../../assets/mocks/brands';
import mockCategories from '../../assets/mocks/categories';
import mockGoodsCards from '../../assets/mocks/goodsCards';

const GoodsPage = () => {
  const isGrid = false;
  const layout = isGrid ? 'list' : 'grid';

  return (
    <div className={styles.goodsPage}>
      <div className={styles.filters}>
        <CheckboxFilter
          title={'Brand'}
          data={mockBrands}
        />
        <CheckboxFilter
          title={'Category'}
          data={mockCategories}
        />
        <DualFilter
          title="Price"
          min={10}
          max={2000}
        />
        <DualFilter
          title="Stock"
          min={2}
          max={200}
          sign={true}
        />
      </div>
      <div className={styles.goodsWrapper}>
        <GoodsHeader />
        <div className={styles.goods}>
          {mockGoodsCards.map((card) => (
            <GoodsCard
              data={card}
              layout={layout}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoodsPage;
