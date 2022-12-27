import React, { FC } from 'react';
import { ICheckboxFilterData } from '../../types/goods';
import styles from './CheckboxItem.scss';

const CheckboxItem: FC<ICheckboxFilterData> = (props) => {
  const { name, selectedCount, totalCount } = props;

  return (
    <li className={styles.checkboxFilter__item}>
      <label className={styles.item__wrapper}>
        {name.toLowerCase()}
        <input
          type="checkbox"
          className={styles.item__input}
        />
        <span className={styles.checkbox}></span>
      </label>
      <div className={styles.checkboxFilter__count}>
        (<span>{selectedCount}</span>/<span>{totalCount}</span>)
      </div>
    </li>
  );
};

export default CheckboxItem;
