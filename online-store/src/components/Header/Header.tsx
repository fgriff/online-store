import React from 'react';
import CartButton from '../CartButton/CartButton';
import Logo from '../Logo/Logo';
import Result from '../Result/Result';
import styles from './Header.module.scss';
import EuroIcon from '@mui/icons-material/Euro';

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Result
        title={'Cart total: '}
        total={1234}
      >
        <EuroIcon />
      </Result>
      <CartButton />
    </header>
  );
};

export default Header;
