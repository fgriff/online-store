export interface IProductsItem {
  [key: string]: number | string | string[];
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProductsItemTemplate {
  [key: string]: number | string | string[];
}

export type IProductsData = Array<IProductsItem>;

interface IProductTotalCount {
  [key: string]: number;
}

export interface IProductsTotalCount {
  [key: string]: IProductTotalCount | number[];
  brand: IProductTotalCount;
  category: IProductTotalCount;
  price: number[];
  stock: number[];
}

export interface IFiltersState {
  [key: string]: string | string[] | number[] | undefined;
  brands?: string[];
  categories?: string[];
  price?: number[];
  stock?: number[];
  sort?: string;
  search?: string;
  layout?: string;
}
