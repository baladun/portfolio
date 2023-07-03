import { FormHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface FormProps extends PropsWithChildren, FormHTMLAttributes<HTMLFormElement> {}

export interface FormControlBaseProps<TFieldValues extends FieldValues = FieldValues> extends HTMLAttributes<HTMLElement> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
}
