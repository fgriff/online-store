import {
  IProductsData,
  IProductsItem,
  IProductsItemTemplate,
} from '../types/products';

const getImageWeight = (url: string): string | null => {
  const req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send();

  return req.getResponseHeader('content-length');
};

const sortUniqueImages = (thumbnail: string, imagesArray: string[]) => {
  const weight: string[] = [];
  const urls: string[] = [];

  const thumbnailWeight = getImageWeight(thumbnail);

  if (thumbnailWeight) {
    weight.push(thumbnailWeight);
  }

  imagesArray.forEach((imageUrl) => {
    const imageWeight = getImageWeight(imageUrl);

    if (
      imageWeight &&
      !weight.includes(imageWeight) &&
      imageUrl.indexOf('thumbnail') === -1
    ) {
      weight.push(imageWeight);
      urls.push(imageUrl);
    }
  });

  return urls;
};

export const getProductDataById = (
  id: number,
  dataBase: IProductsData,
): IProductsItem | undefined => {
  const product = dataBase.find((product) => product.id === id);
  const modifiedProduct: IProductsItemTemplate = {};

  for (const key in product) {
    if (typeof product[key] === 'string') {
      modifiedProduct[key] = (product[key] as string).toLowerCase();
    } else {
      modifiedProduct[key] = product[key];
    }
  }

  const thumbnail = modifiedProduct.thumbnail as string;
  const images = modifiedProduct.images as string[];

  modifiedProduct.images = sortUniqueImages(thumbnail, images);

  return modifiedProduct as IProductsItem;
};
