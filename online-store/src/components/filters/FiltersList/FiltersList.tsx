import React from 'react';
import styles from './FiltersList.module.scss';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import DualFilter from '../DualFilter/DualFilter';
import mockBrands from '../../../assets/mocks/brands';
import mockCategories from '../../../assets/mocks/categories';

const FiltersList = () => {
  return (
    <div className={styles.filters}>
      <CheckboxFilter
        title={'Brand'}
        data={mockBrands}
      />
      <CheckboxFilter
        title={'Category'}
        data={mockCategories}
      />
      <DualFilter
        title="Price"
        min={10}
        max={2000}
      />
      <DualFilter
        title="Stock"
        min={2}
        max={200}
        sign={true}
      />
    </div>
  );
};

export default FiltersList;
