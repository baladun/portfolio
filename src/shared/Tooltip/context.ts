import { useTooltip } from './hooks';
import { createContext } from 'react';

type ContextType = ReturnType<typeof useTooltip> | null;

export const TooltipContext = createContext<ContextType>(null);
