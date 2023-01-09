import React from 'react';
import CartButton from '../CartButton/CartButton';
import Logo from '../Logo/Logo';
import ShowInfo from '../ShowInfo/ShowInfo';
import styles from './Header.scss';
import EuroIcon from '@mui/icons-material/Euro';
import { useTypedSelector } from '../../redux/hooks';

const Header = () => {
  const basket = useTypedSelector(({ basket }) => basket);

  return (
    <header className={styles.header}>
      <Logo />
      <ShowInfo
        title={'Cart total: '}
        total={basket.totalPrice}
      >
        <EuroIcon />
      </ShowInfo>
      <CartButton totalProducts={basket.totalCount} />
    </header>
  );
};

export default Header;
