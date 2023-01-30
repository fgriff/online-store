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

export interface ICartButtonProps {
  totalProducts: number;
}

export interface IBasketState {
  totalPrice: number;
  totalCount: number;
  isModal: boolean;
  productsState: IProductsState;
}
