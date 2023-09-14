'use client';

import { useAuthContext } from '@/context/AuthContext';
import { EditableProps } from './types';
import { useMatchMedia } from '@/hooks';
import { tailwindConfig } from '@/configs';

export function Editable({ children }: EditableProps) {
  const user = useAuthContext();
  const viewportGreaterThanLg = useMatchMedia(`(min-width: ${tailwindConfig.screens.lg}px)`);

  return <>{user && viewportGreaterThanLg ? children : null}</>;
}
