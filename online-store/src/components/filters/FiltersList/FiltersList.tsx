import React from 'react';
import styles from './FiltersList.module.scss';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import DualFilter from '../DualFilter/DualFilter';
import EuroIcon from '@mui/icons-material/Euro';
import mockBrands from '../../../assets/mocks/brands';
import mockCategories from '../../../assets/mocks/categories';

const FiltersList = () => {
  return (
    <div className={styles.filters}>
      <CheckboxFilter
        title={'Brands'}
        data={mockBrands}
      />
      <CheckboxFilter
        title={'Categories'}
        data={mockCategories}
      />
      <DualFilter
        title="Price"
        min={10}
        max={2000}
      >
        <EuroIcon />
      </DualFilter>
      <DualFilter
        title="Stock"
        min={2}
        max={200}
      />
    </div>
  );
};

export default FiltersList;
