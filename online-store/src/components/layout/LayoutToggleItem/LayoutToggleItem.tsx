import React, { FC } from 'react';
import { ILayoutItemProps } from '../../../types/layout';
import styles from './LayoutToggleItem.scss';

const LayoutToggleItem: FC<ILayoutItemProps> = (props) => {
  const { value, children, onClickHandler, isChecked } = props;

  return (
    <label className={styles.layout__label}>
      <input
        className={styles.layout__input}
        type="radio"
        name="layout"
        value={value}
        checked={isChecked}
        onChange={(e) => onClickHandler(e.target.value)}
      />
      <span
        className={styles.layout__icon}
        style={{ pointerEvents: 'none' }}
      >
        {children}
      </span>
    </label>
  );
};

export default LayoutToggleItem;
