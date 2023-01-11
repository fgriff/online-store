export interface ILocalStorageProduct {
  id: number;
  count: number;
}

export interface ILocalStorage {
  products: ILocalStorageProduct[];
  isNotEmpty(): boolean;
  hasProduct(id: number): boolean;
  getProducts(key: string): ILocalStorageProduct[];
  addProduct(id: number): void;
  removeProduct(id: number): void;
  destroyProduct(id: number): void;
  getProductCount(id: number): number;
  clearProducts(): void;
}
