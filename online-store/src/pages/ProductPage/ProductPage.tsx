import React, { MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../redux/hooks';
import { IProductsItem } from '../../types/products';
import { URL } from '../../utils/constants';
import { getProductDataById } from '../../utils/getProductDataById';
import styles from './ProductPage.module.scss';
import EuroIcon from '@mui/icons-material/Euro';
import Rating from '@mui/material/Rating';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Preloader from '../../components/Preloader/Preloader';

const ProductPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<IProductsItem | undefined>(
    undefined,
  );

  const [mainImage, setMainImage] = useState<string>();
  const [download, setDownload] = useState<boolean>(true);

  useTypedSelector(({ filters }) => {
    if (id && filters.filteredProducts.length && !productData) {
      setProductData(getProductDataById(Number(id), filters.filteredProducts));
      setDownload(false);
    }
  });

  useEffect(() => {
    (async () => {
      if (!productData) {
        const response = await fetch(URL);
        const dataBase = await response.json();
        setProductData(getProductDataById(Number(id), dataBase.products));
        setDownload(false);
      }
    })();
  }, []);

  const onImageClickHandler = (e: MouseEvent<HTMLElement>) => {
    setMainImage((e.target as HTMLImageElement).currentSrc);
  };

  const theme = createTheme({
    components: {
      MuiRating: {
        styleOverrides: {
          iconEmpty: {
            color: '#ff0',
          },
          decimal: {
            color: '#ff0',
          },
        },
      },
    },
  });

  return (
    <div className={styles.product}>
      <div className={styles.product__breadСrumbs}>
        {productData &&
          `store > ${productData.category} > ${productData.brand} > ${productData.title}`}
      </div>
      <div className={styles.product__info}>
        <div className={styles.photo}>
          <div className={styles.photo__mainPhoto}>
            {download && <Preloader />}
            {!download && (
              <img
                src={mainImage || productData?.thumbnail}
                loading="lazy"
                alt="Product photo"
              />
            )}
          </div>
          <div className={styles.photo__miniPhotos}>
            {download && <Preloader />}
            {productData &&
              productData.images.map((image, idx) => (
                <div
                  key={idx}
                  style={{ width: `${300 / productData.images.length - 10}px` }}
                  className={styles.photo__miniPhoto}
                >
                  <img
                    src={image}
                    loading="lazy"
                    onClick={onImageClickHandler}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={styles.product__categories}>
          <div className={styles.product__name}>
            <p className={styles.product__title}>
              {productData && productData.title}
            </p>
            <p className={styles.product__brand}>
              {productData && productData.brand}
            </p>
          </div>
          <div className={styles.product__rating}>
            <ThemeProvider theme={theme}>
              <Rating
                name="half-rating-read"
                defaultValue={productData?.rating || 4.2}
                precision={0.1}
                readOnly
                sx={{ fontSize: '24px' }}
              />
            </ThemeProvider>
            <span>{productData && productData.rating}</span>
          </div>
          <div className={styles.product__price}>
            <EuroIcon sx={{ fontSize: '26px' }} />
            {productData && productData.price}
          </div>
          <p className={styles.product__category}>
            <span>Category:</span> {productData && productData.category}
          </p>
          <p className={styles.product__description}>
            <span>Description:</span> {productData && productData.description}
          </p>
          <p className={styles.product__discount}>
            <span>Discount:</span>{' '}
            {productData && productData.discountPercentage}%
          </p>
          <p className={styles.product__stock}>
            <span>Stock:</span> {productData && productData.stock}
          </p>
          <div className={styles.product__buttons}>
            <button className={styles.product__button}>Add to cart</button>
            <button className={styles.product__button}>Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
