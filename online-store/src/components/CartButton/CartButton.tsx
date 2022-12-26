import React from 'react';
import styles from './CartButton.module.scss';
import logoIcon from '../../assets/img/png/cart.png';

const CartButton = () => {
  return (
    <div className={styles.cartButton}>
      <img
        className={styles.cartImage}
        src={logoIcon}
        alt="Cart logo"
      />
      <div className={styles.cartCount}>5</div>
    </div>
  );
};

export default CartButton;
