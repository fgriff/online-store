import React, { FC } from 'react';
import { ICheckboxItemData } from '../../../types/goods';
import styles from './CheckboxItem.scss';

const CheckboxItem: FC<ICheckboxItemData> = (props) => {
  const {
    data: { name, selectedCount, totalCount },
    checked,
    onChangeHandler,
  } = props;

  return (
    <li className={styles.checkboxFilter__item}>
      <label className={styles.item__wrapper}>
        {name.toLowerCase()}
        <input
          type="checkbox"
          className={styles.item__input}
          checked={checked}
          onChange={() => onChangeHandler(name, checked)}
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
