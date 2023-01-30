import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { toggleCheckbox } from '../../../redux/slices/filtersSlice';
import { ICheckboxFiltersProps } from '../../../types/goods';
import { updateCheckboxQueryParams } from '../../../utils/queryParams';
import { parseQueryString } from '../../../utils/queryParser';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
import styles from './CheckboxFilter.scss';

const CheckboxFilter: FC<ICheckboxFiltersProps> = (props) => {
  const { title, data } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useTypedDispatch();
  const key = title.toLowerCase();

  useEffect(() => {
    parseQueryString(key, searchParams, dispatch);
  }, []);

  const values = useTypedSelector(
    ({ filters }) => filters.filterValues[key] as string[],
  );

  const toggleFilter = (value: string, isChecked: boolean) => {
    dispatch(toggleCheckbox({ title, value, isChecked }));

    const modifiedValue = value.toLowerCase();

    updateCheckboxQueryParams(
      key,
      modifiedValue,
      searchParams,
      setSearchParams,
    );
  };

  return (
    <div className={styles.checkboxFilter}>
      <h3 className={styles.checkboxFilter__title}>{title}</h3>
      <ul className={styles.checkboxFilter__list}>
        {data.map((filterData, idx) => {
          const isChecked = values.includes(filterData.name.toLowerCase());
          return (
            <CheckboxItem
              key={idx}
              data={filterData}
              isChecked={isChecked}
              onChangeHandler={toggleFilter}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CheckboxFilter;
