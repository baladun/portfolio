'use client';

import { useContext, useEffect, useState } from 'react';
import { ScrollDirectionContext } from '@/context';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { ScrollDirectionSwitchProps } from './types';
import { NoSsr } from '@/shared/NoSsr';
import { useMatchMedia } from '@/hooks';
import { tailwindConfig } from '@/configs';
import { Tooltip } from '@/shared/Tooltip';

export function ScrollDirectionSwitch({ ...rest }: ScrollDirectionSwitchProps) {
  const viewportLessThanMd = useMatchMedia(`(max-width: ${tailwindConfig.screens.md - 1}px)`);
  const { scrollDirection, setScrollDirection } = useContext(ScrollDirectionContext);
  const [manuallySelectedScrollDirection, setManuallySelectedScrollDirection] = useState(scrollDirection);

  useEffect(() => {
    setScrollDirection(viewportLessThanMd ? 'vertical' : manuallySelectedScrollDirection);
  }, [viewportLessThanMd]);

  useEffect(() => () => setScrollDirection(manuallySelectedScrollDirection), []);

  const change = () => {
    const dir = scrollDirection === 'horizontal' ? 'vertical' : 'horizontal';
    setManuallySelectedScrollDirection(dir);
    setScrollDirection(dir);
  };

  return (
    <NoSsr>
      {!viewportLessThanMd && (
        <Tooltip content={`Switch to ${scrollDirection === 'horizontal' ? 'vertical' : 'horizontal'} scroll`}>
          <Button
            {...rest}
            kind="text"
            size="sm"
            color="brown"
            icon={<IconPark type={scrollDirection === 'horizontal' ? 'HorizontalTidyUp' : 'VerticalTidyUp'} />}
            onClick={change}
          />
        </Tooltip>
      )}
    </NoSsr>
  );
}
