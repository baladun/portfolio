'use client';

import Icon from '@icon-park/react/es/all';
import { IconParkProps } from './types';
import { NoSsr } from '@/shared/NoSsr';
import { forwardRef, memo } from 'react';
import classnames from 'classnames';

export const IconPark = memo(
  forwardRef<HTMLSpanElement, IconParkProps>(function IconPark({ className, ...rest }, ref) {
    return (
      <NoSsr fallback={<span className="inline-block w-[1em]"></span>}>
        <span
          ref={ref}
          className={classnames('inline-block leading-[0]', className)}
        >
          <Icon {...rest} />
        </span>
      </NoSsr>
    );
  }),
);
