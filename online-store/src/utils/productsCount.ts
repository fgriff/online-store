import { IProductsData, IProductsTotalCount } from '../types/products';

export const getProductsTotalCount = (data: IProductsData) => {
  const result: IProductsTotalCount = {
    brand: {},
    category: {},
    price: [],
    stock: [],
  };

  let priceMin: number;
  let priceMax: number;
  let stockMin: number;
  let stockMax: number;

  if (data.length) {
    priceMin = data[0].price;
    priceMax = data[0].price;
    stockMin = data[0].stock;
    stockMax = data[0].stock;

    data.forEach((product) => {
      result.brand[product.brand.toLowerCase()] =
        result.brand[product.brand.toLowerCase()] + 1 || 1;

      result.category[product.category.toLowerCase()] =
        result.category[product.category.toLowerCase()] + 1 || 1;

      if (product.price < priceMin) {
        priceMin = product.price;
      } else if (product.price > priceMax) {
        priceMax = product.price;
      }

      if (product.stock < stockMin) {
        stockMin = product.stock;
      } else if (product.stock > stockMax) {
        stockMax = product.stock;
      }
    });

    result.price = [priceMin, priceMax];
    result.stock = [stockMin, stockMax];
  }

  return result;
};
