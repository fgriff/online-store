export interface IFiltersState {
  [key: string]: string | string[] | number[] | boolean;
  brands: string[];
  categories: string[];
  price: number[];
  stock: number[];
  sort: string;
  searchValue: string;
  isGrid: boolean;
}
