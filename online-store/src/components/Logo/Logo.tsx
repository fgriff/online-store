import React from 'react';
import styles from './Logo.module.scss';
import logoIcon from '../../assets/img/png/logo.png';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img
        className={styles.logoImage}
        src={logoIcon}
        alt="Logo"
      />
      <h1 className={styles.logoTitle}>
        Online<span className={styles.logoSelect}>store</span>
      </h1>
    </div>
  );
};

export default Logo;
