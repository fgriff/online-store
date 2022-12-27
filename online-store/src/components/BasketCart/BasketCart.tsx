import React, { FC } from 'react';
import s from './BasketCart.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import BasketButton from '../BasketButton/BasketButton';
import { IBasketCard } from '../../types/basket';

interface IBasketCart {
  basket: IBasketCard;
  item: number;
  addQuantity: (id: number) => void;
  minusQuantity: (id: number) => void;
}

const BasketCart: FC<IBasketCart> = (props) => {
  const { basket, item, addQuantity, minusQuantity } = props;
  const sum = basket.price * basket.quantity;

  const toFormat = (num: number): string => num.toLocaleString('en-US');

  return (
    <div className={s.card}>
      <div className={s.card__item}> {item} </div>
      <div className={s.card__info}>
        <img
          className={s.card__img}
          src={basket.images[0]}
          alt={basket.title}
        />
        <div className={s.card__detail}>
          <h3 className={s.card__title}> {basket.title} </h3>
          <div className={s.card__description}> {basket.description} </div>
          <div className={s.card__addInfo}>
            <span>Rating: {basket.rating}</span>
            <span>Discount: {basket.discountPercentage}%</span>
            <span>{`Stock: ${basket.stock}`}</span>
          </div>
        </div>
      </div>
      <div className={s.card__control}>
        <span>Price: € {toFormat(basket.price)}</span>
        <div className={s.card__amount}>
          <BasketButton
            noClick={minusQuantity}
            id={basket.id}
          >
            <RemoveCircleIcon sx={{ fontSize: 25 }} />
          </BasketButton>
          <div className={s.card__quantity}> {basket.quantity} </div>
          <BasketButton
            noClick={addQuantity}
            id={basket.id}
          >
            <AddCircleIcon sx={{ fontSize: 25 }} />
          </BasketButton>
        </div>
        <span className={s.card__sum}> € {toFormat(sum)} </span>
      </div>
    </div>
  );
};

export default BasketCart;
