import React from 'react';
import style from './NotFoundPage.scss';
import { useNavigate } from 'react-router-dom';

import iconPaperClip from './../../assets/img/png/icon-paper-clip.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const toHomeHandler = () => {
    navigate('/');
  };

  return (
    <div className={style.page}>
      <div className={style.block}>
        <img
          className={style.img}
          src={iconPaperClip}
          alt={'icon 404'}
        />
        <p className={style.n404}>404</p>
        <p className={style.title}>Page not found</p>
        <button
          className={style.btn}
          onClick={toHomeHandler}
        >
          GO HOME
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
