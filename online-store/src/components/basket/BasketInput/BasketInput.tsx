import React from 'react';
import style from './BasketInput.scss';

const BasketInput = () => {
  return (
    <div className={style.input}>
      <input
        className={style.input__field}
        type="text"
        placeholder="Enter promo code"
      />
    </div>
  );
};

export default BasketInput;
