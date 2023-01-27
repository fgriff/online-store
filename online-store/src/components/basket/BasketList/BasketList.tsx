import React, { useEffect, useState } from 'react';
import style from './BasketList.scss';
import BasketCart from '../BasketCart/BasketCart';
import { IProduct } from '../../../types/basket';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useSearchParams } from 'react-router-dom';

type IEventHandler = React.ChangeEvent<HTMLInputElement>;

interface IBasketList {
  basket: {
    [key: number]: {
      product: IProduct;
      quantity: number;
    };
  };
}

function BasketList(props: IBasketList) {
  const { basket } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const cards = Object.values(basket);

  const totalPage = Math.ceil(cards.length / perPage);
  const currentCards = cards.slice(firstIndex, lastIndex);

  useEffect(() => {
    setCurrentPage((cur) => Math.min(cur, totalPage));
  }, [totalPage, perPage]);

  const perPageHandler = ({ target }: IEventHandler) => {
    const limitNum = Math.max(1, Math.min(cards.length, Number(target.value)));
    setPerPage(limitNum);
    searchParams.set('limit', limitNum.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.has('page')) {
      const pageNum = Number(searchParams.get('page'));
      setCurrentPage(pageNum);
    }
    if (searchParams.has('limit')) {
      const limitNum = Number(searchParams.get('limit'));
      setPerPage(limitNum);
    }
  }, []);

  const backPageHandler = () => {
    const pageNum = Math.max(currentPage - 1, 1);
    setCurrentPage(pageNum);

    if (searchParams.has('page')) {
      searchParams.set('page', pageNum.toString());
    }
    setSearchParams(searchParams);
  };

  const nextPageHandler = () => {
    const pageNum = Math.min(currentPage + 1, totalPage);
    setCurrentPage(pageNum);
    if (searchParams.has('page')) {
      searchParams.set('page', pageNum.toString());
    } else {
      searchParams.set('page', '2');
    }
    setSearchParams(searchParams);
  };

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
            onClick={backPageHandler}
          >
            <NavigateBeforeIcon sx={{ fontSize: 25 }} />
          </button>
          <p className={style.pag__num}>
            {currentPage}
            <span className={style.pag__total}>{` / ${totalPage}`}</span>
          </p>
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
        />
      ))}
    </div>
  );
}

export default BasketList;
