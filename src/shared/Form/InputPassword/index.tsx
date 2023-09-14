'use client';

import { InputPasswordProps, InputPasswordType } from './types';
import classnames from 'classnames';
import { formControlCss } from '../utils';
import { FieldValues, useController } from 'react-hook-form';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { useState } from 'react';

export function InputPassword<V extends FieldValues>({ control, name, className, ...rest }: InputPasswordProps<V>) {
  const { field } = useController({ control, name });
  const [type, setType] = useState<InputPasswordType>('password');

  return (
    <div className="relative">
      <input
        {...rest}
        {...field}
        value={field.value || ''}
        type={type}
        autoComplete="off"
        className={classnames('form-input', formControlCss, className)}
      />

      <Button
        kind="text"
        icon={<IconPark type={type === 'password' ? 'PreviewCloseOne' : 'PreviewOpen'} />}
        className="absolute right-0 top-0"
        onClick={() => setType(type === 'password' ? 'text' : 'password')}
      />
    </div>
  );
}
