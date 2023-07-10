import { PropsWithChildren } from 'react';
import { PreviewItem } from '../types';

export type DraggableProps = PropsWithChildren<Pick<PreviewItem, 'id'>>;
