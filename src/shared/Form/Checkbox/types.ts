import { FieldValues } from 'react-hook-form';
import { FormControlBaseProps } from '@/shared/Form/types';

export interface CheckboxProps<V extends FieldValues> extends FormControlBaseProps<V> {
  label?: string;
}
