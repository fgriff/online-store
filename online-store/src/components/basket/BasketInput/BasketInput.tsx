import React from 'react';
import style from './BasketInput.scss';

type IEventHandler = React.ChangeEvent<HTMLInputElement>;

interface IBasketInput {
  value: string;
  onChange: (e: IEventHandler) => void;
}

const BasketInput = ({ value, onChange }: IBasketInput) => {
  return (
    <div className={style.input}>
      <input
        value={value}
        onChange={(e) => onChange(e)}
        className={style.input__field}
        type="text"
        placeholder="Enter promo code"
      />
    </div>
  );
};

export default BasketInput;
