import React, { FC } from 'react';
import { ICheckboxFilterItemProps } from '../../../types/goods';
import styles from './CheckboxItem.scss';

const CheckboxItem: FC<ICheckboxFilterItemProps> = (props) => {
  const {
    data: { name, selectedCount, totalCount },
    isChecked,
    onChangeHandler,
  } = props;

  return (
    <li className={styles.checkboxFilter__item}>
      <label className={styles.item__wrapper}>
        <span className={selectedCount && styles.checkboxFilter__name}>
          {name.toLowerCase()}
        </span>
        <input
          type="checkbox"
          className={styles.item__input}
          checked={isChecked}
          onChange={() => onChangeHandler(name, isChecked)}
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
