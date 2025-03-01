import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef, ReactElement } from 'react';
import { clsx } from 'clsx';
import s from './button.module.scss';

type InferType<T> = T extends ElementType<infer U> ? U : never;

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: ForwardedRef<InferType<T>>): ReactElement<T> => {
    const {
      loading = false,
      fullWidth,
      className,
      as: Component = 'button',
      children,
      ...rest
    } = props;

    const styleButton = clsx(s.button, fullWidth && s.fullWidth, loading && s.loading);

    return (
      <Component className={clsx(styleButton, className)} ref={ref} disabled={loading} {...rest}>
        {children}
        {loading && <span className={s.loader} />}
      </Component>
    );
  },
);

Button.displayName = 'Button';