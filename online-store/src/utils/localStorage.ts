import { ILocalStorage, ILocalStorageProduct } from '../types/localStorage';
import { IProductsItem } from '../types/products';
import { LOCAL_STORAGE_NAME } from './constants';

class LocalStorageState implements ILocalStorage {
  products: ILocalStorageProduct[] = [];

  constructor() {
    this.products = this.getProducts(LOCAL_STORAGE_NAME);
  }

  isNotEmpty() {
    return this.products.length > 0;
  }

  hasProduct(id: number) {
    return this.products.findIndex((product) => product.id === id) !== -1;
  }

  getProducts(key: string) {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    return [];
  }

  addProduct(newProductId: number) {
    const idx = this.products.findIndex(
      (product) => product.id === newProductId,
    );

    if (idx === -1) {
      this.products.push({
        id: newProductId,
        count: 1,
      });
    } else {
      this.products[idx].count += 1;
    }

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.products));
  }

  removeProduct(productId: number) {
    const idx = this.products.findIndex((product) => product.id === productId);

    if (idx !== -1) {
      if (this.products[idx].count > 1) {
        this.products[idx].count -= 1;
      } else {
        this.products.splice(idx, 1);
      }
    }

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.products));
  }

  destroyProduct(productId: number) {
    const idx = this.products.findIndex((product) => product.id === productId);

    if (idx !== -1) {
      this.products.splice(idx, 1);
    }

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.products));
  }

  getProductCount(productId: number) {
    const idx = this.products.findIndex((product) => product.id === productId);

    if (idx !== -1) {
      return this.products[idx].count;
    }

    return 0;
  }

  clearProducts() {
    this.products.length = 0;
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.products));
  }
}

export const filterData = (
  database: IProductsItem[],
  localStorageData: ILocalStorageProduct[],
) => {
  return database.filter((product) => {
    return (
      localStorageData.find(
        (savedProduct) => product.id === savedProduct.id,
      ) !== undefined
    );
  });
};

export const modifiedData = (
  filteredDatabase: IProductsItem[],
  localStorageData: ILocalStorageProduct[],
) => {
  return filteredDatabase.map((product) => {
    const idx = localStorageData.findIndex(
      (savedProduct) => product.id === savedProduct.id,
    );

    if (idx !== -1) {
      return {
        count: localStorageData[idx].count,
        price: product.price,
      };
    }
  });
};

export default new LocalStorageState();
