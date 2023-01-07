import React, { FC, useEffect, useState } from 'react';
import { IGoodsCardProps } from '../../../types/goods';
import styles from './GoodsCard.scss';
import StarIcon from '@mui/icons-material/Star';
import EuroIcon from '@mui/icons-material/Euro';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useTypedDispatch } from '../../../redux/hooks';
import { decAllData, incAllData } from '../../../redux/slices/headerSlice';
import localStorage from '../../../utils/localStorage';

const GoodsCard: FC<IGoodsCardProps> = (props) => {
  const {
    id,
    title,
    brand,
    category,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    thumbnail,
  } = props.data;
  const { layout } = props;

  const newProductData = {
    id,
    title,
    brand,
    category,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    thumbnail,
  };

  const [buttonLabel, setButtonLabel] = useState('Add to cart');
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (localStorage.hasProduct(id)) {
      setButtonLabel('Remove from cart');
    }
  }, []);

  const onClickHandler = () => {
    if (buttonLabel === 'Add to cart') {
      localStorage.addProduct({ ...newProductData });
      dispatch(incAllData({ price }));
      setButtonLabel('Remove from cart');
    } else if (buttonLabel === 'Remove from cart') {
      localStorage.removeProduct(id);
      dispatch(decAllData({ price }));
      setButtonLabel('Add to cart');
    }
  };

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
            loading="lazy"
            alt="Goods image"
          />
        </div>
        <div className={classnames(styles.goodsCard__info, styles.info)}>
          <p className={styles.goodsCard__title}>{title}</p>
          {layout === 'list' && (
            <p className={styles.goodsCard__description}>{description}</p>
          )}
          <div className={styles.goodsCard__controls}>
            <div className={styles.info__leftSide}>
              <p className={styles.goodsCard__price}>
                {layout === 'list' ? (
                  <EuroIcon sx={{ fontSize: 22 }} />
                ) : (
                  <EuroIcon sx={{ fontSize: 24 }} />
                )}
                {price}
              </p>
            </div>
            <div className={styles.info__rightSide}>
              <button
                className={
                  buttonLabel === 'Add to cart'
                    ? styles.goodsCard__button
                    : classnames(
                        styles.goodsCard__button,
                        styles.goodsCard__button_added,
                      )
                }
                onClick={() => onClickHandler()}
              >
                {buttonLabel}
              </button>
              <Link
                to={`/product-details/${id}`}
                className={styles.goodsCard__button}
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsCard;
