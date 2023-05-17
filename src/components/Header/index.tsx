'use client';

import { HeaderProps } from './types';
import { NoSsr } from '@/shared/NoSsr';
import { useMatchMedia } from '@/hooks/useMatchMedia';

export function Header({ desktop, mobile }: HeaderProps) {
  const isDesktop = useMatchMedia('(min-width: 1024px)');

  return <NoSsr>{isDesktop ? <>{desktop}</> : <>{mobile}</>}</NoSsr>;
}
