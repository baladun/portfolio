'use client';

import { PropsWithChildren } from 'react';
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@icon-park/react';
import { IIconConfig } from '@icon-park/react/es/runtime';
import { ScrollDirectionContextProvider } from '@/context/ScrollDirectionContext';
import { AuthContextProvider } from '@/context/AuthContext';

const iconConfig: IIconConfig = { ...DEFAULT_ICON_CONFIGS, strokeWidth: 3 };

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthContextProvider>
      <ScrollDirectionContextProvider>
        <IconProvider value={iconConfig}>{children}</IconProvider>
      </ScrollDirectionContextProvider>
    </AuthContextProvider>
  );
}
