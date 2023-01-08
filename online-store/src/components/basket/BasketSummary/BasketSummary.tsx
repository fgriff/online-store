import React, { FC } from 'react';
import style from './BasketSummary.scss';
import BasketInput from '../BasketInput/BasketInput';

interface IBasketSummary {
  totalProducts?: number;
  totalSum: number;
  onClick: (active: boolean) => void;
}

const BasketSummary: FC<IBasketSummary> = (props) => {
  const { totalProducts, totalSum = 0, onClick } = props;
  return (
    <div className={style.summary}>
      <h2 className={style.summary__title}>Summary</h2>
      <div className={style.summary__block}>
        <div>
          Products:{' '}
          <span className={style.summary__colorText}>{totalProducts}</span>
        </div>
        <div>
          Total sum: €{' '}
          <span
            className={style.summary__colorText}
          >{`${totalSum.toLocaleString('en-US')}`}</span>
        </div>
        <BasketInput />
        <button
          className={style.summary__button}
          onClick={() => onClick(true)}
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default BasketSummary;
