import React, { useEffect } from 'react';
import CartButton from '../CartButton/CartButton';
import Logo from '../Logo/Logo';
import ShowInfo from '../ShowInfo/ShowInfo';
import styles from './Header.scss';
import EuroIcon from '@mui/icons-material/Euro';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { setInitialData } from '../../redux/slices/headerSlice';
import localStorage from '../../utils/localStorage';

const Header = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(
      setInitialData({
        price: localStorage.getTotalPrice(),
        count: localStorage.getProductsCount(),
      }),
    );
  }, []);

  const header = useTypedSelector(({ header }) => header);

  return (
    <header className={styles.header}>
      <Logo />
      <ShowInfo
        title={'Cart total: '}
        total={header.cartTotalPrice}
      >
        <EuroIcon />
      </ShowInfo>
      <CartButton totalProducts={header.cartGoodsCount} />
    </header>
  );
};

export default Header;
