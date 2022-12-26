import React from 'react';
import styles from './Logo.module.scss';
import logoIcon from '../../assets/img/png/logo.png';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img
        className={styles.logo__image}
        src={logoIcon}
        alt="Logo"
      />
      <h1 className={styles.logo__title}>
        Online<span className={styles.logo__title_selected}>store</span>
      </h1>
    </div>
  );
};

export default Logo;
