import React, { FC, useEffect, useState } from 'react';
import { IGoodsCardProps } from '../../../types/goods';
import styles from './GoodsCard.scss';
import StarIcon from '@mui/icons-material/Star';
import EuroIcon from '@mui/icons-material/Euro';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import localStorage from '../../../utils/localStorage';
import {
  addProduct,
  destroyProduct,
  removeProduct,
} from '../../../redux/slices/basketSlice';

const GoodsCard: FC<IGoodsCardProps> = (props) => {
  const { id, title, description, price, rating, thumbnail } = props.data;
  const {
    filterValues: { layout },
  } = useTypedSelector(({ filters }) => filters);

  const [buttonLabel, setButtonLabel] = useState('Add to cart');
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (localStorage.hasProduct(id)) {
      setButtonLabel('Remove from cart');
    }
  }, []);

  const onClickHandler = () => {
    if (buttonLabel === 'Add to cart') {
      localStorage.addProduct(id);
      dispatch(addProduct({ price }));
      setButtonLabel('Remove from cart');
    } else if (buttonLabel === 'Remove from cart') {
      dispatch(
        destroyProduct({ price, count: localStorage.getProductCount(id) }),
      );
      localStorage.destroyProduct(id);
      dispatch(removeProduct({ id }));
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
