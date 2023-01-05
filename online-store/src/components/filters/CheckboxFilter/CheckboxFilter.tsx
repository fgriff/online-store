import React, { FC } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { toggleCheckbox } from '../../../redux/slices/filtersSlice';
import { ICheckboxFiltersData } from '../../../types/goods';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
import styles from './CheckboxFilter.scss';

const CheckboxFilter: FC<ICheckboxFiltersData> = (props) => {
  const { title, data } = props;

  const values = useTypedSelector(
    (state) => state.filters[title.toLowerCase()] as string[],
  );
  const dispatch = useTypedDispatch();

  const toggleFilter = (value: string, isChecked: boolean) =>
    dispatch(toggleCheckbox({ title, value, isChecked }));

  return (
    <div className={styles.checkboxFilter}>
      <h3 className={styles.checkboxFilter__title}>{title}</h3>
      <ul>
        {data.map((filterData) => {
          const isChecked = values.includes(filterData.name.toLowerCase());
          return (
            <CheckboxItem
              data={filterData}
              checked={isChecked}
              onChangeHandler={toggleFilter}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CheckboxFilter;
