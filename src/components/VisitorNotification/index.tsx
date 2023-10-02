'use client';

import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { Dialog } from '@/shared/Dialog';

export function VisitorNotification() {
  const [visitorNotificationIsShown, setVisitorNotificationIsShown] = useLocalStorage('visitorNotificationIsShown', false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!visitorNotificationIsShown) {
      setDialogOpen(true);
    }

    return () => {
      setDialogOpen(false);
    };
  }, []);

  const onClose = () => {
    setVisitorNotificationIsShown(true);
    setDialogOpen(false);
  };

  return (
    <Dialog
      headingText="Information"
      className="max-w-xl"
      open={dialogOpen}
      showOk={false}
      cancelText="Got it"
      onCancel={onClose}
    >
      The author of the website does not present the photos as his own, but only uses them as a demonstration.
    </Dialog>
  );
}
