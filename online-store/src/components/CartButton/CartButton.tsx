import React from 'react';
import styles from './CartButton.scss';
import logoIcon from '../../assets/img/png/cart.png';

const CartButton = () => {
  return (
    <div className={styles.cartButton}>
      <img
        className={styles.cartButton__image}
        src={logoIcon}
        alt="Cart logo"
      />
      <div className={styles.cartButton__count}>5</div>
    </div>
  );
};

export default CartButton;
