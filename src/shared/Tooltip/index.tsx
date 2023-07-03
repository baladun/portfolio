'use client';

import { TooltipProps } from './types';
import { TooltipContext } from './context';
import { useTooltip } from './hooks';
import { Content } from './Content';
import { Trigger } from './Trigger';
import { memo } from 'react';

export const Tooltip = memo(function Tooltip({ content, children, ...options }: TooltipProps) {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      <Trigger>{children}</Trigger>
      <Content>{content}</Content>
    </TooltipContext.Provider>
  );
});
