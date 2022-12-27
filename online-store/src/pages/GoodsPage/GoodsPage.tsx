import React from 'react';
import CheckboxFilter from '../../components/CheckboxFilter/CheckboxFilter';
import DualFilter from '../../components/DualFilter/DualFilter';
import GoodsCard from '../../components/GoodsCard/GoodsCard';
import GoodsPageHeader from '../../components/GoodsPageHeader/GoodsPageHeader';
import styles from './GoodsPage.scss';
import mockBrands from '../../assets/mocks/brands';
import mockCategories from '../../assets/mocks/categories';
import mockGoodsCards from '../../assets/mocks/goodsCards';

const GoodsPage = () => {
  const cardElements = mockGoodsCards.map((c) => <GoodsCard {...c} />);

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
        <GoodsPageHeader />
        <div className={styles.goods}>{cardElements}</div>
      </div>
    </div>
  );
};

export default GoodsPage;
