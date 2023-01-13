import { filterBySearchField } from '../src/utils/filterData';
import database from '../src/assets/mocks/storage-mock';
import { IProductsData } from '../src/types/products';

const result: IProductsData = [
  {
    id: 2,
    title: 'iPhone X',
    description:
      'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/2/1.jpg',
      'https://i.dummyjson.com/data/products/2/2.jpg',
      'https://i.dummyjson.com/data/products/2/3.jpg',
      'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    ],
  },
];

describe('filterBySearchField', () => {
  it('filterBySearchField is correct', () => {
    expect(filterBySearchField('899', database)).toStrictEqual(result);
  });
});
