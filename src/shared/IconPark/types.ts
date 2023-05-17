import { IconType, IIconAllProps } from '@icon-park/react/es/all';

export interface IconParkProps extends Omit<IIconAllProps, 'type'> {
  type: IconType;
}
