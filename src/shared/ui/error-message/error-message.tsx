import {FC} from 'react';
import s from './error-message.module.scss';
import AlertTriangle from '../../assets/icons/alert-triangle.svg';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={s.errorMessage}>
      <img src={AlertTriangle} alt="Error" className={s.icon} />
      <span className={s.text}>{message}</span>
    </div>
  );
};
