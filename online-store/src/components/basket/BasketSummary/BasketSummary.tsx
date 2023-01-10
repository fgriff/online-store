import React, { FC, useState } from 'react';
import style from './BasketSummary.scss';
import BasketInput from '../BasketInput/BasketInput';

interface IBasketSummary {
  totalProducts?: number;
  totalSum: number;
  onClick: (active: boolean) => void;
}

type IEventHandler = React.ChangeEvent<HTMLInputElement>;

const BasketSummary: FC<IBasketSummary> = (props) => {
  const { totalProducts, totalSum = 0, onClick } = props;

  const [isPromo, setIsPromo] = useState<boolean>(false);

  const promos = ['rs', 'epm'];

  const inputHandler = ({ target }: IEventHandler) => {
    const promo = target.value.toLowerCase();
    setIsPromo(promos.includes(promo));
  };

  return (
    <div className={style.summary}>
      <h2 className={style.summary__title}>Summary</h2>
      <div className={style.summary__block}>
        <div>
          Products:{' '}
          <span className={style.summary__colorText}>{totalProducts}</span>
        </div>
        <div className={isPromo ? style.summary__promo : ''}>
          Total sum: €{' '}
          <span
            className={style.summary__colorText}
          >{`${totalSum.toLocaleString('en-US')}`}</span>
        </div>
        {isPromo ? (
          <div>
            New sum: €{' '}
            <span className={style.summary__colorText}>{`${(
              totalSum * 0.9
            ).toLocaleString('en-US')}`}</span>
            <p className={style.summary__discount}>Discount 10%</p>
          </div>
        ) : null}
        <BasketInput onChange={inputHandler} />
        <p className={style.summary__test}>Promo for test: 'RS', 'EPM'</p>
        <button
          disabled={totalProducts === 0}
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
