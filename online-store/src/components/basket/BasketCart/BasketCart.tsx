import React, { FC } from 'react';
import style from './BasketCart.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { ICard } from '../../../types/basket';
import { useTypedDispatch } from '../../../redux/hooks';
import localStorage from '../../../utils/localStorage';
import { decQuantity, incQuantity } from '../../../redux/slices/basketSlice';

interface IBasketCart {
  card: ICard;
  item: number;
}

const BasketCart: FC<IBasketCart> = (props) => {
  const { card, item } = props;
  const { product, quantity } = card;
  const sum = product.price * quantity;

  const dispatch = useTypedDispatch();

  const decQuantityHandler = (id: number, price: number) => {
    localStorage.removeProduct(id);
    dispatch(decQuantity({ id, price }));
  };

  const incQuantityHandler = (id: number, price: number, stock: number) => {
    localStorage.addProduct(id);
    dispatch(incQuantity({ id, price, stock }));
  };

  const toFormat = (num: number): string => num.toLocaleString('en-US');

  return (
    <div className={style.card}>
      <div className={style.card__item}> {item} </div>
      <div className={style.card__info}>
        <img
          className={style.card__img}
          src={product.thumbnail}
          alt={product.title}
        />
        <div className={style.card__detail}>
          <h3 className={style.card__title}> {product.title} </h3>
          <div className={style.card__description}> {product.description} </div>
          <div className={style.card__addInfo}>
            <span>{`Rating: ${product.rating}`}</span>
            <span>{`Discount: ${product.discountPercentage}%`}</span>
            <span>{`Stock: ${product.stock}`}</span>
          </div>
        </div>
      </div>
      <div className={style.card__control}>
        <span>{`Price: € ${toFormat(product.price)}`}</span>
        <div className={style.card__amount}>
          <button
            className={style.card__button}
            onClick={() => decQuantityHandler(product.id, product.price)}
          >
            <RemoveCircleIcon sx={{ fontSize: 25 }} />
          </button>
          <div
            data-testid="quantity"
            className={style.card__quantity}
          >
            {quantity}
          </div>
          <button
            className={style.card__button}
            onClick={() =>
              incQuantityHandler(product.id, product.price, product.stock)
            }
          >
            <AddCircleIcon sx={{ fontSize: 25 }} />
          </button>
        </div>
        <span className={style.card__sum}>{`€ ${toFormat(sum)}`}</span>
      </div>
    </div>
  );
};

export default BasketCart;
