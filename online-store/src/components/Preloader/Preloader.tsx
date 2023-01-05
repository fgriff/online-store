import React from 'react';
import styles from './Preloader.module.scss';
import preloader from '../../assets/img/svg/preloader.svg';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img
        src={preloader}
        alt="Preloader"
      />
    </div>
  );
};

export default Preloader;
