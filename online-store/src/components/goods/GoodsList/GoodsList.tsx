import React, { FC } from 'react';
import styles from './GoodsList.scss';
import mockGoodsCards from '../../../assets/mocks/goodsCards';
import GoodsCard from '../GoodsCard/GoodsCard';
import { IGoodsListProps } from '../../../types/goods';

const GoodsList: FC<IGoodsListProps> = (props) => {
  const { layout } = props;

  return (
    <div className={styles.goods}>
      {mockGoodsCards.map((card) => (
        <GoodsCard
          data={card}
          layout={layout}
        />
      ))}
    </div>
  );
};

export default GoodsList;
