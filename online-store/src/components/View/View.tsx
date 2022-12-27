import React from 'react';
import styles from './View.scss';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const View = () => {
  return (
    <div className={styles.view}>
      <label className={styles.view__label}>
        <input
          className={styles.view__input}
          type="radio"
          name="view"
        />
        <span className={styles.view__icon}>
          <ViewListIcon sx={{ fontSize: 30 }} />
        </span>
      </label>
      <label className={styles.view__label}>
        <input
          className={styles.view__input}
          type="radio"
          name="view"
          checked
        />
        <span className={styles.view__icon}>
          <ViewModuleIcon sx={{ fontSize: 30 }} />
        </span>
      </label>
    </div>
  );
};

export default View;
