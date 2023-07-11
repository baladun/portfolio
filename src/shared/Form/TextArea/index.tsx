'use client';

import { TextAreaProps } from './types';
import classnames from 'classnames';
import { formControlCss } from '../utils';
import { FieldValues, useController } from 'react-hook-form';

export function TextArea<V extends FieldValues>({ control, name, rows = 5, className, ...rest }: TextAreaProps<V>) {
  const { field } = useController({ control, name });
  return (
    <textarea
      {...rest}
      {...field}
      value={field.value || ''}
      autoComplete="off"
      rows={rows}
      className={classnames('form-textarea resize-none', formControlCss, className)}
    />
  );
}
