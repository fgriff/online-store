import React, { FC } from 'react';
import { IGoodsCardProps } from '../../types/goods';
import styles from './GoodsCard.scss';
import StarIcon from '@mui/icons-material/Star';
import EuroIcon from '@mui/icons-material/Euro';
import classnames from 'classnames';

const GoodsCard: FC<IGoodsCardProps> = (props) => {
  const { title, description, price, rating, thumbnail } = props.data;
  const { layout } = props;

  return (
    <div className={`${styles[layout]}`}>
      <div className={styles.goodsCard}>
        <div className={styles.goodsCard__rating}>
          <StarIcon />
          <span className={styles.goodsCard__ratingCount}>{rating}</span>
        </div>
        <div className={styles.goodsCard__imageWrapper}>
          <img
            className={styles.goodsCard__image}
            src={thumbnail}
            alt="Goods image"
          />
        </div>
        <div className={classnames(styles.goodsCard__info, styles.info)}>
          <div className={styles.info__leftSide}>
            <p className={styles.goodsCard__title}>{title}</p>
            <p className={styles.goodsCard__description}>
              {layout === 'list'
                ? description
                : `${description.slice(0, 20)}...`}
            </p>
          </div>
          <div className={styles.info__rightSide}>
            <p className={styles.goodsCard__price}>
              {layout === 'list' ? (
                <EuroIcon sx={{ fontSize: 22 }} />
              ) : (
                <EuroIcon />
              )}
              {price}
            </p>
            <button className={styles.goodsCard__button}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsCard;
