import React, { FC, useEffect, useState } from 'react';
import style from './BasketSummary.scss';
import BasketInput from '../BasketInput/BasketInput';
import { useTypedSelector } from '../../../redux/hooks';

interface IBasketSummary {
  // totalProducts?: number;
  // totalSum: number;
  onClick: (active: boolean) => void;
}

type IEventHandler = React.ChangeEvent<HTMLInputElement>;

interface IPromo {
  name: string;
  value: number;
  isAdded: boolean;
  isApplied: boolean;
}

const promos = [
  { name: 'rs', value: 10, isAdded: false, isApplied: false },
  { name: 'epm', value: 15, isAdded: false, isApplied: false },
  { name: 'sale5', value: 5, isAdded: false, isApplied: false },
];

const BasketSummary: FC<IBasketSummary> = (props) => {
  const { onClick } = props;

  const { totalPrice, totalCount } = useTypedSelector((state) => state.basket);

  const [isPromo, setIsPromo] = useState<boolean>(false);
  const [currentPromo, setCurrentPromo] = useState<string>('');

  const [foundPromoCodes, setFoundPromoCodes] = useState<IPromo | null>();
  const [promoCodes, setPromoCodes] = useState<IPromo[]>(promos);

  const [newPrice, setNewPrice] = useState(totalPrice);

  useEffect(() => {
    const discount =
      totalPrice *
      (promoCodes.reduce((sum, promo) => {
        if (promo.isApplied) {
          return sum + promo.value;
        } else {
          return sum;
        }
      }, 0) /
        100);
    const updatedPrice = totalPrice - discount;
    setNewPrice(updatedPrice);
  }, [totalPrice]);

  const inputHandler = ({ target }: IEventHandler) => {
    const currentPromo = target.value.toLowerCase();
    setCurrentPromo(currentPromo);

    const promoIndex = promoCodes.findIndex(
      (promo) => promo.name === currentPromo,
    );

    if (promoIndex !== -1) {
      setFoundPromoCodes(promoCodes[promoIndex]);
    } else {
      setFoundPromoCodes(null);
    }
  };

  const promoHandler = (promoItem: IPromo) => {
    const idx = promoCodes.findIndex((promo) => promo.name === promoItem.name);
    if (!promoItem.isApplied) {
      setIsPromo(true);
      if (idx !== -1) {
        const newPromoCodesState = [
          ...promoCodes.slice(0, idx),
          { ...promoCodes[idx], isApplied: true },
          ...promoCodes.slice(idx + 1),
        ];
        const discount =
          totalPrice *
          (newPromoCodesState.reduce((sum, promo) => {
            if (promo.isApplied) {
              return sum + promo.value;
            } else {
              return sum;
            }
          }, 0) /
            100);
        const updatedPrice = totalPrice - discount;
        setNewPrice(updatedPrice);
        setPromoCodes(newPromoCodesState);
      }
    } else if (promoItem.isApplied) {
      if (idx !== -1) {
        const newPromoCodesState = [
          ...promoCodes.slice(0, idx),
          { ...promoCodes[idx], isAdded: false, isApplied: false },
          ...promoCodes.slice(idx + 1),
        ];

        const discount = (totalPrice * promoItem.value) / 100;
        const updatedPrice = newPrice + discount;
        setNewPrice(updatedPrice);
        setPromoCodes(newPromoCodesState);
        const promo = promoCodes.find((promo) => promo.name === currentPromo);
        promo &&
          setFoundPromoCodes({
            ...promo,
            isAdded: false,
            isApplied: false,
          });
        const countPromos = newPromoCodesState.reduce((sum, promo) => {
          if (!promo.isApplied) {
            return sum + 1;
          }

          return sum;
        }, 0);
        countPromos === promoCodes.length && setIsPromo(false);
      }
    }
  };

  const foundPromoCodesHandler = () => {
    if (foundPromoCodes) {
      const promoIndex = promoCodes.findIndex(
        (promo) => promo.name === foundPromoCodes.name,
      );
      if (promoIndex !== -1) {
        setPromoCodes((state) => [
          ...state.slice(0, promoIndex),
          { ...state[promoIndex], isAdded: true },
          ...state.slice(promoIndex + 1),
        ]);
        setFoundPromoCodes({ ...foundPromoCodes, isAdded: true });
      }
    }
  };

  return (
    <div className={style.summary}>
      <h2 className={style.summary__title}>Summary</h2>
      <div className={style.summary__block}>
        <div>
          Products:{' '}
          <span className={style.summary__colorText}>{totalCount}</span>
        </div>
        <div className={isPromo ? style.summary__promo : ''}>
          Total sum: €{' '}
          <span
            className={style.summary__colorText}
          >{`${totalPrice.toLocaleString('en-US')}`}</span>
        </div>
        {
          <div>
            {isPromo && (
              <>
                New sum: €{' '}
                <span
                  className={style.summary__colorText}
                >{`${newPrice.toLocaleString('en-US')}`}</span>
                <p className={style.summary__discount}>
                  Discount{' '}
                  {promoCodes.reduce((sum, promo) => {
                    if (promo.isApplied) {
                      return sum + promo.value;
                    }

                    return sum;
                  }, 0)}
                  %
                </p>
              </>
            )}
          </div>
        }
        {promoCodes.map((promo) => {
          if (promo.isAdded) {
            return (
              <div
                className={style.summary__promos}
                key={promo.name}
              >
                <p>{`${promo.name} - ${promo.value}% `}</p>
                <button
                  className={style.summary__btn}
                  onClick={() => promoHandler(promo)}
                >
                  {promo.isApplied ? 'Drop' : 'Add'}
                </button>
              </div>
            );
          }
          return null;
        })}
        <BasketInput
          value={currentPromo}
          onChange={inputHandler}
        />
        {foundPromoCodes && (
          <div className={style.summary__promos}>
            <p>{`${foundPromoCodes.name} - ${foundPromoCodes.value}% `}</p>
            {!foundPromoCodes.isAdded && (
              <button
                className={style.summary__btn}
                onClick={foundPromoCodesHandler}
              >
                {'Add'}
              </button>
            )}
          </div>
        )}
        <p className={style.summary__test}>{`Promo for test: ${promoCodes
          .map((p) => p.name)
          .join(', ')}`}</p>
        <button
          disabled={totalCount === 0}
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
