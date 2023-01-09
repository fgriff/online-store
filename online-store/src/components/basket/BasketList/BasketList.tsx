import React, { useEffect, useState } from 'react';
import style from './BasketList.scss';
import BasketCart from '../BasketCart/BasketCart';
import { IProduct } from '../../../types/basket';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

type IEventHandler = React.ChangeEvent<HTMLInputElement>;

interface IBasketList {
  basket: {
    [key: number]: {
      product: IProduct;
      quantity: number;
    };
  };
  incQuantity: (id: number) => void;
  decQuantity: (id: number) => void;
}

function BasketList(props: IBasketList) {
  const { basket, incQuantity, decQuantity } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const cards = Object.values(basket);
  const currentCards = cards.slice(firstIndex, lastIndex);

  const totalPage = Math.ceil(cards.length / perPage);

  useEffect(() => {
    setCurrentPage((cur) => Math.min(cur, totalPage));
  }, [perPage]);

  const perPageHandler = ({ target }: IEventHandler) => {
    setPerPage(Math.min(cards.length, Number(target.value)));
  };

  const nextBackHandler = () => setCurrentPage((page) => Math.max(page - 1, 1));
  const nextPageHandler = () =>
    setCurrentPage((page) => Math.min(page + 1, totalPage));

  return (
    <div className={style.list}>
      <h2 className={style.list__title}>Products In Cart</h2>

      <div className={style.pag}>
        <div className={style.pag__perP}>
          <p className={style.pag__label}>On the page:</p>
          <input
            className={style.pag__input}
            type={'number'}
            value={perPage}
            onChange={perPageHandler}
          />
        </div>
        <div className={style.pag__nav}>
          <button
            className={style.pag__btn}
            onClick={nextBackHandler}
          >
            <NavigateBeforeIcon sx={{ fontSize: 25 }} />
          </button>
          <p className={style.pag__num}>{currentPage}</p>
          <button
            className={style.pag__btn}
            onClick={nextPageHandler}
          >
            <NavigateNextIcon sx={{ fontSize: 25 }} />
          </button>
        </div>
      </div>

      {currentCards.map((card, index) => (
        <BasketCart
          key={card.product.id}
          card={card}
          item={index + 1 + (currentPage - 1) * perPage}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      ))}
    </div>
  );
}

export default BasketList;
