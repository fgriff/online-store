import React, { FC } from 'react';
import s from './BasketSummary.scss';
import BasketInput from '../BasketInput/BasketInput';

interface BasketSummary {
  products: number;
  total: number;
}

const BasketSummary: FC<BasketSummary> = ({ products, total }) => {
  const toFormat = (num: number): string => num.toLocaleString('en-US');

  return (
    <div className={s.summary}>
      <h2 className={s.summary__title}>Summary</h2>
      <div className={s.summary__block}>
        <div>
          Products: <span className={s.summary__colorText}>{products}</span>
        </div>
        <div>
          Total sum: €{' '}
          <span className={s.summary__colorText}>{toFormat(total)}</span>
        </div>
        <BasketInput />
        <button className={s.summary__button}>Buy now</button>
      </div>
    </div>
  );
};

export default BasketSummary;
