'use client';

import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { SignOutProps } from './types';
import { Dialog } from '@/shared/Dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { firebaseClientApp } from '@/firebase-client';

const auth = getAuth(firebaseClientApp);

export function SignOut({ className }: SignOutProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOk = async () => {
    setLoading(true);

    try {
      await auth.signOut();
      router.refresh();
      setOpen(false);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        kind="text"
        icon={<IconPark type="Logout" />}
        className={className}
        onClick={() => setOpen(true)}
      />

      <Dialog
        headingText="Sign Out"
        open={open}
        loading={loading}
        okText="Confirm"
        onOk={onOk}
        onCancel={() => setOpen(false)}
      >
        Are you sure to Sign Out?
      </Dialog>
    </>
  );
}
