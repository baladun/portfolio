import { FormControlBaseProps } from '../types';
import { FieldValues } from 'react-hook-form';

export interface SelectOption<T = any> {
  label: string;
  value: T;
}

export interface SelectProps<V extends FieldValues> extends FormControlBaseProps<V> {
  options: SelectOption[];
}
