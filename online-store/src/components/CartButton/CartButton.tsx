import React, { FC } from 'react';
import styles from './CartButton.scss';
import logoIcon from '../../assets/img/png/cart.png';
import { Link } from 'react-router-dom';
import { ICartButtonProps } from '../../types/basket';

const CartButton: FC<ICartButtonProps> = (props) => {
  const { totalProducts } = props;

  return (
    <div className={styles.cartButton}>
      <Link to={'/cart'}>
        <img
          className={styles.cartButton__image}
          src={logoIcon}
          alt="Cart logo"
        />
      </Link>

      <div className={styles.cartButton__count}>{totalProducts}</div>
    </div>
  );
};

export default CartButton;
