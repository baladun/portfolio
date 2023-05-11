'use client';

import { PropsWithChildren } from 'react';
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@icon-park/react';
import { IIconConfig } from '@icon-park/react/es/runtime';

const iconConfig: IIconConfig = { ...DEFAULT_ICON_CONFIGS, strokeWidth: 3 };

export function Providers({ children }: PropsWithChildren) {
  return <IconProvider value={iconConfig}>{children}</IconProvider>;
}
