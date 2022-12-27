import React, { FC } from 'react';
import { IGoodsItemData } from '../../types/goods';
import styles from './GoodsCard.scss';
import StarIcon from '@mui/icons-material/Star';
import EuroIcon from '@mui/icons-material/Euro';
import classnames from 'classnames';

const GoodsCard: FC<IGoodsItemData> = (props) => {
  const { title, description, price, rating, thumbnail } = props;

  const isColumn = false;
  const extraClass = isColumn ? styles.goodsCard_line : styles.goodsCard_mesh;

  return (
    <div className={classnames(styles.goodsCard, extraClass)}>
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
            {`${isColumn ? description : `${description.slice(0, 20)}...`}`}
          </p>
        </div>
        <div className={styles.info__rightSide}>
          <p className={styles.goodsCard__price}>
            {isColumn ? <EuroIcon sx={{ fontSize: 22 }} /> : <EuroIcon />}
            {price}
          </p>
          <button className={styles.goodsCard__button}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default GoodsCard;
