import { IProductsItem } from './products';

export interface IShowInfo {
  title: string;
  total: number;
  children?: JSX.Element;
}

export interface IHeaderState {
  cartTotalPrice: number;
  cartGoodsCount: number;
}

export interface ICartButtonProps {
  totalProducts: number;
}

export type ProductItem = Omit<IProductsItem, 'images'>;

export interface ILocalStorageProduct {
  count: number;
  productData: ProductItem;
}

export interface ILocalStorage {
  productCards: ILocalStorageProduct[];
  isNotEmpty(): boolean;
  getProducts(key: string): ILocalStorageProduct[];
  addProduct(product: ProductItem): void;
  removeProduct(id: number): void;
  hasProduct(id: number): boolean;
  incProductCount(id: number): void;
  decProductCount(id: number): void;
  getProductsCount(): number;
  getTotalPrice(): number;
  clearProducts(): void;
}
