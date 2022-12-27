import React from 'react';
import s from './BasketInput.scss';

const BasketInput = () => {
  return (
    <div className={s.input}>
      <input
        className={s.input__field}
        type="text"
        placeholder="Enter promo code"
      />
    </div>
  );
};

export default BasketInput;
