import { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react';
import { clsx } from 'clsx';
import s from './status-card.module.scss';

export type StatusCardVariant = 'red' | 'orange' | 'green' | 'grey' ;
export type StatusCardProps<T extends ElementType = 'div'> = {
  as?: T;
  variant?: StatusCardVariant;
  title: string;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export const StatusCard = <T extends ElementType = 'div'>(props: StatusCardProps<T>): ReactElement<T> => {
  const {
    as: Component = 'div',
    variant = 'grey', //default
    title,
    className,
    ...rest
  } = props;

  const styleStatusCard = clsx(s.statusCard, s[variant], className);

  return (
    <Component {...rest} className={styleStatusCard}>
      <span className={s.title}>{title}</span>
    </Component>
  );
};