import React, { FC } from 'react';
import { ICheckboxFiltersData } from '../../../types/goods';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
import styles from './CheckboxFilter.scss';

const CheckboxFilter: FC<ICheckboxFiltersData> = (props) => {
  const { title, data } = props;

  return (
    <div className={styles.checkboxFilter}>
      <h3 className={styles.checkboxFilter__title}>{title}</h3>
      <ul>
        {data.map((filterData) => (
          <CheckboxItem {...filterData} />
        ))}
      </ul>
    </div>
  );
};

export default CheckboxFilter;
