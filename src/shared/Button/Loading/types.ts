import { HTMLAttributes } from 'react';
import { ButtonProps } from '../types';

export type LoadingProps = HTMLAttributes<HTMLUListElement> & Required<Pick<ButtonProps, 'kind'>>;
