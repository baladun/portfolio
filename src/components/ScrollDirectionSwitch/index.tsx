'use client';

import { useContext } from 'react';
import { ScrollDirectionContext } from '@/context/ScrollDirectionContext';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { ScrollDirectionSwitchProps } from './types';
import { NoSsr } from '@/shared/NoSsr';

export function ScrollDirectionSwitch({ ...rest }: ScrollDirectionSwitchProps) {
  const { scrollDirection, setScrollDirection } = useContext(ScrollDirectionContext);

  return (
    <NoSsr>
      <Button
        {...rest}
        kind="text"
        size="sm"
        color="brown"
        icon={<IconPark type={scrollDirection === 'horizontal' ? 'HorizontalTidyUp' : 'VerticalTidyUp'} />}
        title={`Switch to ${scrollDirection === 'horizontal' ? 'vertical' : 'horizontal'} scroll`}
        onClick={() => setScrollDirection(scrollDirection === 'horizontal' ? 'vertical' : 'horizontal')}
      />
    </NoSsr>
  );
}
