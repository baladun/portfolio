'use client';

import Icon from '@icon-park/react/es/all';
import { IconParkProps } from './types';
import { useEffect, useState } from 'react';

export function IconPark({ ...rest }: IconParkProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <span className="inline-block w-[1em]"></span>;
  }

  return <Icon {...rest} />;
}
