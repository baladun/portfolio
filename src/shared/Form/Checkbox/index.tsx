'use client';

import { FieldValues, useController } from 'react-hook-form';
import { CheckboxProps } from './types';
import classnames from 'classnames';
import { formControlCss } from '../utils';

export function Checkbox<V extends FieldValues>({ control, name, label, className, ...rest }: CheckboxProps<V>) {
  const { field } = useController({ control, name });

  return (
    <label>
      <input
        {...rest}
        {...field}
        type="checkbox"
        value={field.value || ''}
        className={classnames(formControlCss, 'form-checkbox h-5 !w-5 !rounded-[0.25em] text-orange', className)}
      />
      {label}
    </label>
  );
}
