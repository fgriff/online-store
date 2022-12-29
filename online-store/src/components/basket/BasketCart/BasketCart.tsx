import React, { FC } from 'react';
import style from './BasketCart.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { ICard } from '../../../types/basket';

interface IBasketCart {
  card: ICard;
  item: number;
  incQuantity: (id: number) => void;
  decQuantity: (id: number) => void;
}

const BasketCart: FC<IBasketCart> = (props) => {
  const { card, item, incQuantity, decQuantity } = props;
  const { product, quantity } = card;
  const sum = product.price * quantity;

  const toFormat = (num: number): string => `${num.toLocaleString('en-US')}`;

  return (
    <div className={style.card}>
      <div className={style.card__item}> {item} </div>
      <div className={style.card__info}>
        <img
          className={style.card__img}
          src={product.images[0]}
          alt={product.title}
        />
        <div className={style.card__detail}>
          <h3 className={style.card__title}> {product.title} </h3>
          <div className={style.card__description}> {product.description} </div>
          <div className={style.card__addInfo}>
            <span>Rating: {product.rating}</span>
            <span>Discount: {product.discountPercentage}%</span>
            <span>{`Stock: ${product.stock}`}</span>
          </div>
        </div>
      </div>
      <div className={style.card__control}>
        <span>Price: € {toFormat(product.price)}</span>
        <div className={style.card__amount}>
          <button
            className={style.card__button}
            onClick={() => decQuantity(product.id)}
          >
            <RemoveCircleIcon sx={{ fontSize: 25 }} />
          </button>
          <div className={style.card__quantity}> {quantity} </div>
          <button
            className={style.card__button}
            onClick={() => incQuantity(product.id)}
          >
            <AddCircleIcon sx={{ fontSize: 25 }} />
          </button>
        </div>
        <span className={style.card__sum}> € {toFormat(sum)} </span>
      </div>
    </div>
  );
};

export default BasketCart;
