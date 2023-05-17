'use client';

import { NoSsrProps } from './types';
import { useEffect, useState } from 'react';

export function NoSsr({ fallback, children }: NoSsrProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback ? <>{fallback}</> : <></>;
  }

  return <>{children}</>;
}
