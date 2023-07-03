import { PropsWithChildren } from 'react';
import { Attachment } from '../../types';

export type DraggableProps = PropsWithChildren<Pick<Attachment, 'id'>>;
