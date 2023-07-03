'use client';

import { Toast, Toaster, useToaster } from 'react-hot-toast';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export function Toastr() {
  const {
    toasts,
    handlers: { updateHeight },
  } = useToaster();
  const [toastWithoutHeight, setToastWithoutHeight] = useState<Toast>();
  const isShown = Boolean(toasts?.length);

  // hack to update toaster because it is not visible
  useEffect(() => {
    if (toasts.length) {
      const withoutHeight = toasts.find(t => !t.height);
      if (withoutHeight) {
        setToastWithoutHeight(withoutHeight);
      }

      if (toastWithoutHeight) {
        const heightSet = toasts.find(t => t.height && t.id === toastWithoutHeight.id);
        if (heightSet) {
          updateHeight(heightSet.id, heightSet.height as number);
          setToastWithoutHeight(undefined);
        }
      }
    }
  }, [toasts]);

  if (!isShown) {
    return <></>;
  }

  return createPortal(
    <Toaster
      position="top-right"
      toastOptions={{ className: 'font-montserrat font-medium text-sm' }}
    />,
    document.body,
  );
}
