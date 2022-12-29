export interface IProduct {
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

export interface IBasketCard {
  quantity: number;
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

export type IBasketData = Array<IBasketCard>;

export interface IProductsState {
  [key: number]: {
    product: IProduct;
    quantity: number;
  };
}

export interface ICard {
  product: IProduct;
  quantity: number;
}

export interface ITotal {
  totalSum: number;
  totalProducts: number;
}
