import React from 'react';
import styles from './CartButton.scss';
import logoIcon from '../../assets/img/png/cart.png';
import { Link } from 'react-router-dom';

const CartButton = () => {
  return (
    <div className={styles.cartButton}>
      <Link to={'/cart'}>
        <img
          className={styles.cartButton__image}
          src={logoIcon}
          alt="Cart logo"
        />
      </Link>

      <div className={styles.cartButton__count}>5</div>
    </div>
  );
};

export default CartButton;
