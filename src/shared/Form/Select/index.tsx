'use client';

import { SelectProps } from './types';
import classnames from 'classnames';
import { formControlCss } from '../utils';
import { FieldValues, useController } from 'react-hook-form';

export function Select<V extends FieldValues>({ control, name, options, className, ...rest }: SelectProps<V>) {
  const { field } = useController({ control, name });
  return (
    <select
      {...rest}
      {...field}
      value={field.value || ''}
      className={classnames('form-select', formControlCss, className)}
    >
      <option
        disabled
        value=""
      ></option>
      {options.map((opt, idx) => (
        <option
          key={idx}
          value={opt.value}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export type { SelectOption } from './types';
