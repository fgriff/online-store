import React from 'react';
import styles from './FiltersList.scss';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import DualFilter from '../DualFilter/DualFilter';
import EuroIcon from '@mui/icons-material/Euro';
import { useTypedSelector } from '../../../redux/hooks';
import FilterButtons from '../../FilterButtons/FilterButtons';

const FiltersList = () => {
  const { brands, categories, price, stock } = useTypedSelector(
    ({ filters }) => {
      const brands = Object.entries(filters.initialProductsCount.brand).map(
        ([name, totalCount]) => ({
          name,
          selectedCount: filters.filteredProductsCount.brand[name] || 0,
          totalCount,
        }),
      );

      const categories = Object.entries(
        filters.initialProductsCount.category,
      ).map(([name, totalCount]) => ({
        name,
        selectedCount: filters.filteredProductsCount.category[name] || 0,
        totalCount,
      }));

      return {
        brands,
        categories,
        price: filters.initialProductsCount.price,
        stock: filters.initialProductsCount.stock,
      };
    },
  );

  return (
    <div className={styles.filters}>
      <CheckboxFilter
        title={'Brand'}
        data={brands}
      />
      <CheckboxFilter
        title={'Category'}
        data={categories}
      />
      <DualFilter
        title="Price"
        min={price[0]}
        max={price[1]}
      >
        <EuroIcon />
      </DualFilter>
      <DualFilter
        title="Stock"
        min={stock[0]}
        max={stock[1]}
      />
      <FilterButtons />
    </div>
  );
};

export default FiltersList;
