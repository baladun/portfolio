import { useDialogFrame } from './hooks';
import { createContext, SetStateAction } from 'react';

type ContextType =
  | (ReturnType<typeof useDialogFrame> & {
      setLabelId: React.Dispatch<SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<SetStateAction<string | undefined>>;
    })
  | null;

export const DialogFrameContext = createContext<ContextType>(null);
