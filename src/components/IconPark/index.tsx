'use client';

import Icon from '@icon-park/react/es/all';
import { IconParkProps } from './types';
import { NoSsr } from '@/helpers/NoSsr';

export function IconPark({ ...rest }: IconParkProps) {
  return (
    <NoSsr fallback={<span className="inline-block w-[1em]"></span>}>
      <Icon {...rest} />
    </NoSsr>
  );
}
