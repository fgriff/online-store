import React, { FC } from 'react';
import { IShowInfo } from '../../types/header';
import styles from './ShowInfo.module.scss';

const ShowInfo: FC<IShowInfo> = (props) => {
  const { children, title, total } = props;

  return (
    <div className={styles.info}>
      <span className={styles.info__name}>{title}</span>
      <span className={styles.info__count}>
        {children}
        <span>{total}</span>
      </span>
    </div>
  );
};

export default ShowInfo;
