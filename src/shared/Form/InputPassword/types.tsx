import { FormControlBaseProps } from '../types';
import { FieldValues } from 'react-hook-form';

export interface InputPasswordProps<V extends FieldValues> extends FormControlBaseProps<V> {}
export type InputPasswordType = 'text' | 'password';
