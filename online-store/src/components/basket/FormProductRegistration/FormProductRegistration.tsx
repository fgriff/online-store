import React, { useEffect, useState } from 'react';
import style from './FormProductRegistration.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';

import logoCard from '../../../assets/img/png/icon-card.png';
import logoAExpress from '../../../assets/img/png/icon-AExpress.png';
import logoMir from '../../../assets/img/png/icon-mir.png';
import logoMastercard from '../../../assets/img/png/logo-mastercard.png';
import logoUnionPay from '../../../assets/img/png/logo-unionPay.png';
import logoVisa from '../../../assets/img/png/logo-visa.png';

type IEventHandler = React.ChangeEvent<HTMLInputElement>;

interface IFormInputs {
  name: string;
  phone: string;
  address: string;
  email: string;
  cardNumber: string;
  valid: string;
  cvv: string;
}

function FormProductRegistration() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IFormInputs>({
    mode: 'onChange',
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
    const firstLetter = cardNum[0];
    let urlIcon;
    switch (firstLetter) {
      case '2':
        urlIcon = logoMir;
        break;
      case '3':
        urlIcon = logoAExpress;
        break;
      case '4':
        urlIcon = logoVisa;
        break;
      case '5':
        urlIcon = logoMastercard;
        break;
      case '6':
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
  const regexpCardNum = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;
  const regexpValid = /(0[1-9]|1[0-2])\/[0-9]{2}/;

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
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

  const enum ErrorMsg {
    nameReq = 'Enter your name',
    nameCor = 'Enter the name in the format: first-name last-name',
    phoneReq = 'Enter your phone number',
    phoneCor = 'Enter the correct phone number',
    addressReq = 'Enter your delivery address',
    addressCor = 'Enter your 3-word address',
    emailReq = 'Enter your email',
    emailCor = 'Enter the correct email address',
    cardNumber = 'Enter the correct card number',
    cardNumberReq = 'Enter card number',
    cardValidThru = 'Enter the correct Valid Thru',
    cardValidThruReq = 'Enter Valid Thru',
    cardCVV = 'Enter the correct CVV',
    cardCVVReq = 'Enter cvv',
  }

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
              required: ErrorMsg.nameReq,
              pattern: {
                value: regexpName,
                message: ErrorMsg.nameCor,
              },
            })}
            placeholder={'Your name'}
          />
          {errors.name && <p className={style.error}>{errors.name.message}</p>}
        </div>

        <div className={style.form__item}>
          <input
            className={style.input}
            {...register('phone', {
              required: ErrorMsg.phoneReq,
              validate: {
                cor: (value) => isValidPhoneNumber(value) || ErrorMsg.phoneCor,
              },
            })}
            placeholder={'Phone number'}
          />
          {errors.phone && (
            <p className={style.error}>{errors.phone.message}</p>
          )}
        </div>

        <div className={style.form__item}>
          <input
            className={style.input}
            {...register('address', {
              required: ErrorMsg.addressReq,
              pattern: {
                value: regexpAddress,
                message: ErrorMsg.addressCor,
              },
            })}
            placeholder={'Delivery address'}
          />
          {errors.address && (
            <p className={style.error}>{errors.address.message}</p>
          )}
        </div>

        <div className={style.form__item}>
          <input
            type={'email'}
            className={style.input}
            {...register('email', {
              required: ErrorMsg.emailReq,
              pattern: {
                value: regexpEmail,
                message: ErrorMsg.emailCor,
              },
            })}
            placeholder={'E-mail'}
          />
          {errors.email && (
            <p className={style.error}>{errors.email.message}</p>
          )}
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
                required: ErrorMsg.cardNumberReq,
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
                required: ErrorMsg.cardValidThruReq,
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
                required: ErrorMsg.cardCVVReq,
                minLength: 3,
              })}
              placeholder={'CVV'}
              value={cardCVV}
              onChange={cardCVVHandler}
            />
          </div>

          <div className={style.card__errors}>
            {errors.cardNumber && (
              <p className={style.error}>{ErrorMsg.cardNumber}</p>
            )}
            {errors.valid && (
              <p className={style.error}>{ErrorMsg.cardValidThru}</p>
            )}
            {errors.cvv && <p className={style.error}>{ErrorMsg.cardCVV}</p>}
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
