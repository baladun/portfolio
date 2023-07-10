import { useContext, useMemo, useState } from 'react';
import { useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import { BottomSheetOptions } from './types';
import { BottomSheetContext } from './context';

export function useBottomSheet({ initialOpen = false, open: controlledOpen, onOpenChange: setControlledOpen }: BottomSheetOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      setLabelId,
    }),
    [open, setOpen, interactions, data, labelId],
  );
}

export const useDialogFrameContext = () => {
  const context = useContext(BottomSheetContext);

  if (context == null) {
    throw new Error('BottomSheet components must be wrapped in <BottomSheet />');
  }

  return context;
};
