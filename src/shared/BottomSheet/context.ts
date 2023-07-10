import { useBottomSheet } from './hooks';
import { createContext, SetStateAction } from 'react';

type ContextType =
  | (ReturnType<typeof useBottomSheet> & {
      setLabelId: React.Dispatch<SetStateAction<string | undefined>>;
    })
  | null;

export const BottomSheetContext = createContext<ContextType>(null);
