import { IProductsData, IProductsTotalCount } from './products';

interface IFilterValues {
  [key: string]: string | string[] | number[];
  brand: string[];
  category: string[];
  price: number[];
  stock: number[];
  sort: string;
  search: string;
  layout: string;
}

export interface IProductsState {
  filterValues: IFilterValues;
  initialProductsCount: IProductsTotalCount;
  initialProducts: IProductsData;
}
