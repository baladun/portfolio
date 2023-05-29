'use client';

import Icon from '@icon-park/react/es/all';
import { IconParkProps } from './types';
import { NoSsr } from '@/shared/NoSsr';
import { memo } from 'react';

export const IconPark = memo(function IconPark({ ...rest }: IconParkProps) {
  return (
    <NoSsr fallback={<span className="inline-block w-[1em]"></span>}>
      <Icon {...rest} />
    </NoSsr>
  );
});
