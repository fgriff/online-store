import React, { FC } from 'react';
import styles from './GoodsList.scss';
import GoodsCard from '../GoodsCard/GoodsCard';
import { IGoodsListProps } from '../../../types/goods';
import { useTypedSelector } from '../../../redux/hooks';

const GoodsList: FC<IGoodsListProps> = (props) => {
  const { layout } = props;

  const data = useTypedSelector(({ filters }) => filters.filteredProducts);

  return (
    <div className={styles.goods}>
      {!data.length && (
        <h2 className={styles.goods__result}>No products found!</h2>
      )}
      {data.map((card) => (
        <GoodsCard
          key={card.id}
          data={card}
          layout={layout}
        />
      ))}
    </div>
  );
};

export default GoodsList;
