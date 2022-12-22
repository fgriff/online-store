import React, { FC } from 'react';
import { ICheckboxFiltersData } from '../../types/goods';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
import styles from './CheckboxFilter.module.scss';

const CheckboxFilter: FC<ICheckboxFiltersData> = (props) => {
  const { title, data } = props;

  const filterItems = data.map((f) => (
    <CheckboxItem
      key={f.id}
      {...f}
    />
  ));

  return (
    <div>
      <h3
        className={styles.filterTitle}
      >{`${title[0].toUpperCase()}${title.slice(1)}`}</h3>
      <ul>{filterItems}</ul>
    </div>
  );
};

export default CheckboxFilter;
