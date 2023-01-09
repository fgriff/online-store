import { IFiltersState, IProductsData } from '../types/products';

const unsearchableData = ['id', 'thumbnail', 'images'];

const filterBySort = (sortType: string, resultArray: IProductsData) => {
  switch (sortType) {
    case 'price-asc':
      resultArray.sort((prev, next) => prev.price - next.price);
      break;
    case 'price-desc':
      resultArray.sort((prev, next) => next.price - prev.price);
      break;
    case 'brand-asc':
      resultArray.sort((prev, next) => prev.brand.localeCompare(next.brand));
      break;
    case 'brand-desc':
      resultArray.sort((prev, next) => next.brand.localeCompare(prev.brand));
      break;
    case 'discount-asc':
      resultArray.sort(
        (prev, next) => prev.discountPercentage - next.discountPercentage,
      );
      break;
    case 'discount-desc':
      resultArray.sort(
        (prev, next) => next.discountPercentage - prev.discountPercentage,
      );
      break;
  }
};

export const filterBySearchField = (
  searchValue: string,
  data: IProductsData,
): IProductsData => {
  if (searchValue) {
    return data.filter((product) => {
      const productValues = Object.values(product);
      let result = false;

      for (let i = 0; i < productValues.length; i += 1) {
        const modifiedProductValue = String(productValues[i]).toLowerCase();
        const modifiedSearchValue = String(searchValue).toLowerCase();

        if (!unsearchableData.includes(modifiedProductValue)) {
          if (modifiedProductValue.indexOf(modifiedSearchValue) !== -1) {
            result = true;
            break;
          }
        }
      }

      return result;
    });
  }

  return data;
};

export const filterData = (
  array: IProductsData,
  sortingFields: IFiltersState,
) => {
  let result: IProductsData = structuredClone(array);

  for (const key in sortingFields) {
    if (Array.isArray(sortingFields[key])) {
      const params = sortingFields[key];
      if (params) {
        if (typeof params[0] === 'string') {
          let tmp: IProductsData = [];

          (params as string[]).forEach((param) => {
            const iteration = result.filter(
              (productObject) =>
                (productObject[key] as string).toLowerCase() ===
                param.toLowerCase(),
            );

            tmp = [...structuredClone(tmp), ...structuredClone(iteration)];
          });
          result = tmp;
        } else if (typeof params[0] === 'number') {
          result = result.filter(
            (productObject) =>
              (productObject[key] as number) >= params[0] &&
              (productObject[key] as number) <= params[1],
          );
        }
      }
    } else if (key === 'sort' && sortingFields[key]) {
      filterBySort(sortingFields[key] as string, result);
    } else if (key === 'search') {
      result = filterBySearchField(sortingFields[key] as string, result);
    }
  }

  return result;
};
