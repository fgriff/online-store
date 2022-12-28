import { IBasketData } from '../../types/basket';

const basket: IBasketData = [
  {
    quantity: 1, // количество товара выбранное покупателем
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/1/1.jpg',
      'https://i.dummyjson.com/data/products/1/2.jpg',
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
  },
  {
    quantity: 2,
    id: 7,
    title: 'Samsung Galaxy Book',
    description:
      'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched',
    price: 1499,
    discountPercentage: 4.15,
    rating: 4.25,
    stock: 50,
    brand: 'Samsung',
    category: 'laptops',
    thumbnail: 'https://i.dummyjson.com/data/products/7/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/7/1.jpg',
      'https://i.dummyjson.com/data/products/7/2.jpg',
      'https://i.dummyjson.com/data/products/7/3.jpg',
      'https://i.dummyjson.com/data/products/7/thumbnail.jpg',
    ],
  },
  {
    quantity: 3,
    id: 5,
    title: 'Huawei P30',
    description:
      'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
    price: 499,
    discountPercentage: 10.58,
    rating: 4.09,
    stock: 32,
    brand: 'Huawei',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/5/1.jpg',
      'https://i.dummyjson.com/data/products/5/2.jpg',
      'https://i.dummyjson.com/data/products/5/3.jpg',
    ],
  },
  {
    quantity: 4,
    id: 8,
    title: 'Microsoft Surface Laptop 4',
    description:
      'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
    price: 1499,
    discountPercentage: 10.23,
    rating: 4.43,
    stock: 68,
    brand: 'Microsoft Surface',
    category: 'laptops',
    thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/8/1.jpg',
      'https://i.dummyjson.com/data/products/8/2.jpg',
      'https://i.dummyjson.com/data/products/8/3.jpg',
      'https://i.dummyjson.com/data/products/8/4.jpg',
      'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
    ],
  },
];

export default basket;
