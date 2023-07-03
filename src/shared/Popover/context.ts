import { usePopover } from './hooks';
import { createContext } from 'react';

type ContextType = ReturnType<typeof usePopover> | null;

export const PopoverContext = createContext<ContextType>(null);
