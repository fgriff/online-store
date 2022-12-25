import React, { FC } from 'react';
import { ICheckboxFiltersData } from '../../types/goods';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
import styles from './CheckboxFilter.module.scss';

const CheckboxFilter: FC<ICheckboxFiltersData> = (props) => {
  const { title, data } = props;

  return (
    <div>
      <h3
        className={styles.filterTitle}
      >{`${title[0].toUpperCase()}${title.slice(1)}`}</h3>
      <ul>
        {data.map((f) => (
          <CheckboxItem {...f} />
        ))}
      </ul>
    </div>
  );
};

export default CheckboxFilter;
