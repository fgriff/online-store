import React, { FC } from 'react';
import style from './BasketCart.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import BasketButton from '../BasketButton/BasketButton';
import { IBasketCard } from '../../types/basket';

interface IBasketCart {
  basket: IBasketCard;
  item: number;
  incQuantity: (id: number) => void;
  decQuantity: (id: number) => void;
}

const BasketCart: FC<IBasketCart> = (props) => {
  const { basket, item, incQuantity, decQuantity } = props;
  const sum = basket.price * basket.quantity;

  const toFormat = (num: number): string => num.toLocaleString('en-US');

  return (
    <div className={style.card}>
      <div className={style.card__item}> {item} </div>
      <div className={style.card__info}>
        <img
          className={style.card__img}
          src={basket.images[0]}
          alt={basket.title}
        />
        <div className={style.card__detail}>
          <h3 className={style.card__title}> {basket.title} </h3>
          <div className={style.card__description}> {basket.description} </div>
          <div className={style.card__addInfo}>
            <span>Rating: {basket.rating}</span>
            <span>Discount: {basket.discountPercentage}%</span>
            <span>{`Stock: ${basket.stock}`}</span>
          </div>
        </div>
      </div>
      <div className={style.card__control}>
        <span>Price: € {toFormat(basket.price)}</span>
        <div className={style.card__amount}>
          <BasketButton
            noClick={decQuantity}
            id={basket.id}
          >
            <RemoveCircleIcon sx={{ fontSize: 25 }} />
          </BasketButton>
          <div className={style.card__quantity}> {basket.quantity} </div>
          <BasketButton
            noClick={incQuantity}
            id={basket.id}
          >
            <AddCircleIcon sx={{ fontSize: 25 }} />
          </BasketButton>
        </div>
        <span className={style.card__sum}> € {toFormat(sum)} </span>
      </div>
    </div>
  );
};

export default BasketCart;
