import { HTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import { FieldError } from 'react-hook-form';

export interface ControlProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: FieldError;
  reserveErrorSpace?: boolean;
}
