import {
  ILocalStorage,
  ILocalStorageProduct,
  ProductItem,
} from '../types/header';
import { LOCAL_STORAGE_NAME } from './constants';

class LocalStorageState implements ILocalStorage {
  productCards: ILocalStorageProduct[] = [];

  constructor() {
    this.productCards = this.getProducts(LOCAL_STORAGE_NAME);
  }

  isNotEmpty() {
    return this.productCards.length > 0;
  }

  getProducts(key: string) {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    return [];
  }

  addProduct(newProduct: ProductItem) {
    const idx = this.productCards.findIndex(
      (product) => product.productData.id === newProduct.id,
    );

    if (idx === -1) {
      this.productCards.push({
        count: 1,
        productData: newProduct,
      });
    } else {
      this.productCards[idx].count += 1;
    }

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.productCards));
  }

  removeProduct(id: number) {
    const idx = this.productCards.findIndex(
      (product) => product.productData.id === id,
    );

    if (idx !== -1) {
      this.productCards.splice(idx, 1);
    }

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.productCards));
  }

  hasProduct(id: number) {
    return (
      this.productCards.findIndex(
        (product) => product.productData.id === id,
      ) !== -1
    );
  }

  incProductCount(id: number) {
    this.productCards = this.productCards.map((product) => {
      if (product.productData.id === id) {
        product.count += 1;
        return product;
      }

      return product;
    });

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.productCards));
  }

  decProductCount(id: number) {
    this.productCards = this.productCards.map((product) => {
      if (product.productData.id === id) {
        product.count -= 1;
        return product;
      }

      return product;
    });

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.productCards));
  }

  getProductsCount() {
    return this.productCards.reduce(
      (count, product) => count + (product.count as number),
      0,
    );
  }

  getTotalPrice() {
    return this.productCards.reduce(
      (sum, product) => sum + (product.productData.price as number),
      0,
    );
  }

  clearProducts() {
    this.productCards.length = 0;
    localStorage.clear();
  }
}

export default new LocalStorageState();
