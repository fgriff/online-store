import React from 'react';
import styles from './Logo.scss';
import logoIcon from '../../assets/img/png/logo.png';
import { Link } from 'react-router-dom';
import { useTypedDispatch } from '../../redux/hooks';
import { resetFilters } from '../../redux/slices/filtersSlice';

const Logo = () => {
  const dispatch = useTypedDispatch();

  return (
    <Link
      to={'/'}
      className={styles.logo}
      onClick={() => dispatch(resetFilters())}
    >
      <img
        className={styles.logo__image}
        src={logoIcon}
        alt="Logo"
      />
      <span className={styles.logo__title}>
        Online<span className={styles.logo__title_selected}>store</span>
      </span>
    </Link>
  );
};

export default Logo;
