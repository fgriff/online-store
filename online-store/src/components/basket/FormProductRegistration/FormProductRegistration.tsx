import React, { useEffect, useState } from 'react';
import style from './FormProductRegistration.scss';
import { useForm } from 'react-hook-form';

import logoCard from '../../../assets/img/png/icon-card.png';
import logoAExpress from '../../../assets/img/png/icon-AExpress.png';
import logoMir from '../../../assets/img/png/icon-mir.png';
import logoMastercard from '../../../assets/img/png/logo-mastercard.png';
import logoUnionPay from '../../../assets/img/png/logo-unionPay.png';
import logoVisa from '../../../assets/img/png/logo-visa.png';
import { useNavigate } from 'react-router-dom';

type IEventHandler = React.ChangeEvent<HTMLInputElement>;

interface IFormInputs {
  name: string;
  phone: string;
  address: string;
  email: string;
  cardNumber: string;
  valid: string;
  cvv: string;
  isDeveloper: boolean;
}

function FormProductRegistration() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IFormInputs>({
    mode: 'onBlur',
  });

  const [cardNum, setCardNum] = useState<string>('');
  const cardNumberHandler = ({ target }: IEventHandler) => {
    if (target) {
      const numStr = target.value
        .replace(/[^\d]/g, '')
        .replace(/\d{4}(?=.)/g, '$& ')
        .slice(0, 19);
      setCardNum(numStr);
    }
  };

  const [cardValid, setCardValid] = useState<string>('');
  const cardValidHandler = ({ target }: IEventHandler) => {
    if (target) {
      const numStr = target.value
        .replace(/[^\d]/g, '')
        .replace(/\d{2}(?=.)/g, '$&/')
        .slice(0, 5);
      setCardValid(numStr);
    }
  };

  const [cardCVV, setCardCVV] = useState<string>('');
  const cardCVVHandler = ({ target }: IEventHandler) => {
    if (target) {
      const numStr = target.value.replace(/[^\d]/g, '').slice(0, 3);
      setCardCVV(numStr);
    }
  };

  const [cardIcon, setCardIcon] = useState(logoCard);
  useEffect(() => {
    const firstLetter = Number(cardNum.at(0));
    let urlIcon;
    switch (firstLetter) {
      case 2:
        urlIcon = logoMir;
        break;
      case 3:
        urlIcon = logoAExpress;
        break;
      case 4:
        urlIcon = logoVisa;
        break;
      case 5:
        urlIcon = logoMastercard;
        break;
      case 6:
        urlIcon = logoUnionPay;
        break;
      default:
        urlIcon = logoCard;
    }
    setCardIcon(urlIcon);
  }, [cardNum]);

  const [sendOrder, setSendOrder] = useState<boolean>(false);

  const navigate = useNavigate();

  const regexpEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexpName = /[a-z|а-я]{3,}\s[a-z|а-я]{3,}/i;
  const regexpAddress = /[a-z|а-я]{5,}\s[a-z|а-я]{5,}\s[a-z|а-я]{5,}/i;
  const regexpPhone =
    /^(\+)((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){9,12}\d$/;
  const regexpCardNum = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;
  const regexpValid = /(0[1-9]|1[0-2])\/[0-9]{2}/;

  const onSubmit = (data: IFormInputs) => {
    setCardNum('');
    setCardCVV('');
    setCardValid('');
    reset();
    setSendOrder(true);

    setTimeout(() => {
      setSendOrder(false);
      navigate('/');
    }, 3000);
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Personal details</h2>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.form__item}>
          <input
            className={style.input}
            {...register('name', {
              required: 'Enter your name',
              pattern: {
                value: regexpName,
                message: 'Enter the name in the format: first-name last-name',
              },
            })}
            placeholder={'Your name'}
          />
          <div className={style.error}>
            {errors?.name && <p>{errors?.name?.message}</p>}
          </div>
        </div>

        <div className={style.form__item}>
          <input
            className={style.input}
            {...register('phone', {
              required: 'Enter your phone number',
              pattern: {
                value: regexpPhone,
                message: 'Phone in the format +1 123 456 78 90',
              },
            })}
            placeholder={'Phone number'}
          />
          <div className={style.error}>
            {errors?.phone && <p>{errors?.phone?.message}</p>}
          </div>
        </div>

        <div className={style.form__item}>
          <input
            className={style.input}
            {...register('address', {
              required: 'Enter your delivery address',
              pattern: {
                value: regexpAddress,
                message: 'Enter your 3-word address',
              },
            })}
            placeholder={'Delivery address'}
          />
          <div className={style.error}>
            {errors?.address && <p>{errors?.address?.message}</p>}
          </div>
        </div>

        <div className={style.form__item}>
          <input
            className={style.input}
            {...register('email', {
              required: 'Enter your email',
              pattern: {
                value: regexpEmail,
                message: 'Enter the correct email address',
              },
            })}
            placeholder={'E-mail'}
          />
          <div className={style.error}>
            {errors?.email && <p>{errors?.email?.message || 'Error email'}</p>}
          </div>
        </div>

        <div className={style.card}>
          <div className={style.card__grid}>
            <img
              className={style.card__img}
              src={cardIcon}
              alt={'card icon'}
            />
            <input
              className={style.input}
              {...register('cardNumber', {
                required: 'Enter card number',
                pattern: regexpCardNum,
                maxLength: 19,
              })}
              placeholder={'Card number'}
              value={cardNum}
              onChange={cardNumberHandler}
            />

            <div>VALID</div>
            <input
              className={style.input}
              {...register('valid', {
                required: 'Enter Valid Thru',
                pattern: regexpValid,
                minLength: 5,
              })}
              placeholder={'Valid Thru'}
              value={cardValid}
              onChange={cardValidHandler}
            />
            <div>CVV</div>
            <input
              className={style.input}
              {...register('cvv', {
                required: 'Enter cvv',
                minLength: 3,
              })}
              placeholder={'CVV'}
              value={cardCVV}
              onChange={cardCVVHandler}
            />
          </div>

          <div className={style.card__errors}>
            <div className={style.error}>
              {errors?.cardNumber && <p>{'Enter the correct card number'}</p>}
            </div>
            <div className={style.error}>
              {errors?.valid && <p>{'Enter the correct Valid Thru'}</p>}
            </div>
            <div className={style.error}>
              {errors?.cvv && <p>{'Enter the correct CVV'}</p>}
            </div>
          </div>
        </div>

        <input
          className={style.submit}
          type="submit"
          disabled={!isValid}
        />
        {sendOrder && (
          <p className={style.form__msg}>Your order has been sent!</p>
        )}
      </form>
    </div>
  );
}

export default FormProductRegistration;
