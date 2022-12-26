import React from 'react';
import styles from './Logo.module.scss';
import logoIcon from '../../assets/img/png/logo.png';
// import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    // TODO: после настройки роутинга заменить div на <NavLink to="/"></NavLink>
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
