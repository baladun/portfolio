'use client';

import { useContext, useEffect, useState } from 'react';
import { ScrollDirectionContext } from '@/context/ScrollDirectionContext';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { ScrollDirectionSwitchProps } from './types';
import { NoSsr } from '@/shared/NoSsr';
import { useMatchMedia } from '@/hooks/useMatchMedia';
import { tailwindConfig } from '@/configs';

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
        <Button
          {...rest}
          kind="text"
          size="sm"
          color="brown"
          icon={<IconPark type={scrollDirection === 'horizontal' ? 'HorizontalTidyUp' : 'VerticalTidyUp'} />}
          title={`Switch to ${scrollDirection === 'horizontal' ? 'vertical' : 'horizontal'} scroll`}
          onClick={change}
        />
      )}
    </NoSsr>
  );
}
