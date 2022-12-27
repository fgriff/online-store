import React from 'react';
import CartButton from '../CartButton/CartButton';
import Logo from '../Logo/Logo';
import ShowInfo from '../ShowInfo/ShowInfo';
import styles from './Header.scss';
import EuroIcon from '@mui/icons-material/Euro';

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <ShowInfo
        title={'Cart total: '}
        total={1234}
      >
        <EuroIcon />
      </ShowInfo>
      <CartButton />
    </header>
  );
};

export default Header;
