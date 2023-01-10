import React, { useState } from 'react';
import style from './FormProductRegistration.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import logoCardDefault from '../../../assets/img/png/icon-card.png';
import logoCardAExpress from '../../../assets/img/png/icon-AExpress.png';
import logoCardMir from '../../../assets/img/png/icon-mir.png';
import logoCardMastercard from '../../../assets/img/png/logo-mastercard.png';
import logoCardUnionPay from '../../../assets/img/png/logo-unionPay.png';
import logoCardVisa from '../../../assets/img/png/logo-visa.png';
import { useTypedDispatch } from '../../../redux/hooks';
import { clearCart, closeModal } from '../../../redux/slices/basketSlice';
import localStorage from '../../../utils/localStorage';

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

enum ErrorMsg {
  nameReq = 'Enter your name',
  nameCor = 'Enter the name in the format: first-name last-name',
  phoneReq = 'Enter your phone number',
  phoneCor = 'Phone in the format +1 123 456 78 90',
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

const regexpName = /[a-z|а-я]{3,}\s[a-z|а-я]{3,}/i;
const regexpPhone =
  /^(\+)((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){9,12}\d$/;
const regexpAddress = /[a-z|а-я]{5,}\s[a-z|а-я]{5,}\s[a-z|а-я]{5,}/i;
const regexpEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexpCardNum = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;
const regexpCardValid = /(0[1-9]|1[0-2])\/[0-9]{2}/;

function FormProductRegistration() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IFormInputs>({});

  const [sendOrder, setSendOrder] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useTypedDispatch();
  const onSubmit: SubmitHandler<IFormInputs> = () => {
    setSendOrder(true);

    dispatch(closeModal({ open: false }));

    setTimeout(() => {
      localStorage.clearProducts();
      dispatch(clearCart());
      setSendOrder(false);
      navigate('/');
    }, 4000);
  };

  const [cardIcon, setCardIcon] = useState(logoCardDefault);

  const cardNumberHandler = ({ target }: IEventHandler) => {
    const newValue = target.value
      .replace(/[^\d]/g, '')
      .replace(/\d{4}(?=.)/g, '$& ')
      .slice(0, 19);

    setValue('cardNumber', newValue);

    const firstLetter = target.value[0];
    switch (firstLetter) {
      case '2':
        setCardIcon(logoCardMir);
        break;
      case '3':
        setCardIcon(logoCardAExpress);
        break;
      case '4':
        setCardIcon(logoCardVisa);
        break;
      case '5':
        setCardIcon(logoCardMastercard);
        break;
      case '6':
        setCardIcon(logoCardUnionPay);
        break;
      default:
        setCardIcon(logoCardDefault);
    }
  };

  const cardValidHandler = ({ target }: IEventHandler) => {
    let newValue = target.value
      .replace(/[^\d]/g, '')
      .replace(/\d{2}(?=.)/g, '$&/')
      .slice(0, 5);

    if (newValue.includes('/', 2)) {
      const arrValue = newValue.split('/');
      const monthValue: string = Number(arrValue[0]) > 12 ? '12' : arrValue[0];
      newValue = `${monthValue}/${arrValue[1]}`;
    } else {
      if (Number(newValue) > 12) newValue = '12';
    }
    setValue('valid', newValue);
  };

  const cardCVVHandler = ({ target }: IEventHandler) => {
    const newValue = target.value.replace(/[^\d]/g, '').slice(0, 3);
    setValue('cvv', newValue);
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
              pattern: {
                value: regexpPhone,
                message: ErrorMsg.phoneCor,
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
                minLength: 19,
                maxLength: 19,
                pattern: {
                  value: regexpCardNum,
                  message: ErrorMsg.cardNumber,
                },
                onChange: (e) => cardNumberHandler(e),
              })}
              placeholder={'Card number'}
            />

            <div>VALID</div>
            <input
              className={style.input}
              {...register('valid', {
                required: ErrorMsg.cardValidThruReq,
                minLength: 5,
                maxLength: 5,
                pattern: {
                  value: regexpCardValid,
                  message: ErrorMsg.cardValidThru,
                },
                onChange: (e) => cardValidHandler(e),
              })}
              placeholder={'Valid Thru'}
            />
            <div>CVV</div>
            <input
              className={style.input}
              {...register('cvv', {
                required: ErrorMsg.cardCVVReq,
                minLength: {
                  value: 3,
                  message: 'minLength 3',
                },
                maxLength: {
                  value: 3,
                  message: 'maxLength 3',
                },
                onChange: (e) => cardCVVHandler(e),
              })}
              placeholder={'CVV'}
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

        <button
          className={style.submit}
          type="submit"
        >
          CONFIRM
        </button>
        {sendOrder && (
          <p className={style.form__msg}>Your order has been sent!</p>
        )}
      </form>
    </div>
  );
}

export default FormProductRegistration;
