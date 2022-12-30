export interface IFiltersState {
  [key: string]: string | string[] | number[] | boolean;
  brands: string[];
  categories: string[];
  price: number[];
  stock: number[];
  sortType: string;
  searchValue: string;
  isGrid: boolean;
}
