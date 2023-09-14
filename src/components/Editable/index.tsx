'use client';

import { useAuthContext } from '@/context/AuthContext';
import { EditableProps } from './types';

export function Editable({ children }: EditableProps) {
  const user = useAuthContext();

  return <>{user ? children : null}</>;
}
