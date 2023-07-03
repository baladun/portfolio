'use client';

import { InputTextProps } from './types';
import classnames from 'classnames';
import { formControlCss } from '../utils';
import { FieldValues, useController } from 'react-hook-form';

export function InputText<V extends FieldValues>({ control, name, className, ...rest }: InputTextProps<V>) {
  const { field } = useController({ control, name });
  return (
    <input
      {...rest}
      {...field}
      value={field.value || ''}
      type="text"
      autoComplete="off"
      className={classnames('form-input', formControlCss, className)}
    />
  );
}
