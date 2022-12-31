export interface IFiltersState {
  [key: string]: string | string[] | number[];
  brands: string[];
  categories: string[];
  price: number[];
  stock: number[];
  sort: string;
  search: string;
  layout: string;
}
