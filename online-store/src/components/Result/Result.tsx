import React, { FC } from 'react';
import { IResult } from '../../types/header';
import styles from './Result.module.scss';

const Result: FC<IResult> = (props) => {
  const { children, title, total } = props;

  return (
    <div className={styles.result}>
      <span className={styles.resultName}>{title}</span>
      <span className={styles.resultCount}>
        {children}
        <span>{total}</span>
      </span>
    </div>
  );
};

export default Result;
