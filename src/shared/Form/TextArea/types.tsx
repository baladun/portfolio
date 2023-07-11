import { FormControlBaseProps } from '../types';
import { FieldValues } from 'react-hook-form';

export interface TextAreaProps<V extends FieldValues> extends FormControlBaseProps<V> {
  rows?: number;
}
