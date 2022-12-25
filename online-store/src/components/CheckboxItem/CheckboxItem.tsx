import React, { FC } from 'react';
import { ICheckboxFilterData } from '../../types/goods';
import styles from './CheckboxItem.module.scss';

const CheckboxItem: FC<ICheckboxFilterData> = (props) => {
  const { name, selectedCount, totalCount } = props;

  return (
    <li className={styles.filterItem}>
      <label className={styles.wrapper}>
        {name.toLowerCase()}
        <input
          type="checkbox"
          className={styles.checkbox}
        />
        <span className={styles.mockCheckbox}></span>
      </label>
      <div className={styles.count}>
        (<span>{selectedCount}</span>/<span>{totalCount}</span>)
      </div>
    </li>
  );
};

export default CheckboxItem;
