import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { IProductsItem } from '../../types/products';
import { getProductDataById } from '../../utils/getProductDataById';
import styles from './ProductPage.scss';
import EuroIcon from '@mui/icons-material/Euro';
import Rating from '@mui/material/Rating';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Preloader from '../../components/Preloader/Preloader';
import localStorage from '../../utils/localStorage';
import classnames from 'classnames';
import {
  addProduct,
  destroyProduct,
  openModal,
} from '../../redux/slices/basketSlice';
import database from '../../assets/mocks/storage-mock';

const ProductPage = () => {
  const { id } = useParams();

  if (id && Number(id) > 100) {
    return <div className={styles.product__notFound}>No product found!</div>;
  }

  const [productData, setProductData] = useState<IProductsItem | undefined>(
    undefined,
  );
  const dispatch = useTypedDispatch();

  const [mainImage, setMainImage] = useState<string>();
  const [download, setDownload] = useState<boolean>(true);
  const [buttonLabel, setButtonLabel] = useState<string>('Add to cart');

  useTypedSelector(({ filters }) => {
    if (id && filters.filteredProducts.length && !productData) {
      setProductData(getProductDataById(Number(id), filters.filteredProducts));
      setDownload(false);
    }
  });

  useEffect(() => {
    if (!productData) {
      setProductData(getProductDataById(Number(id), database));
      setDownload(false);
    }

    if (localStorage.hasProduct(Number(id))) {
      setButtonLabel('Remove from cart');
    }
  }, []);

  const onImageClickHandler = (e: MouseEvent<HTMLElement>) => {
    setMainImage((e.target as HTMLImageElement).currentSrc);
  };

  const onClickHandler = () => {
    if (productData && id) {
      if (buttonLabel === 'Add to cart') {
        localStorage.addProduct(Number(id));
        dispatch(addProduct({ price: productData.price }));
        setButtonLabel('Remove from cart');
      } else if (buttonLabel === 'Remove from cart') {
        dispatch(
          destroyProduct({
            price: productData.price,
            count: localStorage.getProductCount(Number(id)),
          }),
        );
        localStorage.destroyProduct(Number(id));
        setButtonLabel('Add to cart');
      }
    }
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

  const navigate = useNavigate();

  const onBuyClickHandler = () => {
    if (id) {
      const products = localStorage.products;
      const index = products.findIndex((prod) => prod.id === Number(id));
      if (index === -1) {
        localStorage.addProduct(Number(id));
        dispatch(addProduct({ price: productData?.price }));
      }
      dispatch(openModal({ open: true }));
      navigate('/cart');
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.product__breadCrumbs}>
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
                    alt="Image"
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
            <button
              className={
                buttonLabel === 'Add to cart'
                  ? styles.product__button
                  : classnames(
                      styles.product__button,
                      styles.product__button_added,
                    )
              }
              onClick={() => onClickHandler()}
            >
              {buttonLabel}
            </button>
            <button
              className={styles.product__button}
              onClick={onBuyClickHandler}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
