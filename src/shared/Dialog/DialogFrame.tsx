'use client';

import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { forwardRef, memo, useImperativeHandle, useMemo, useRef } from 'react';
import { DialogFrameProps, DialogFrameRef } from './types';

export const DialogFrame = memo(
  forwardRef<DialogFrameRef, DialogFrameProps>(({ header, footer, children, ...rest }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    const open = () => dialogRef?.current?.showModal();
    const close = () => dialogRef?.current?.close();

    const paddings = useMemo(() => '[&:not(:empty)]:px-6 [&:not(:empty)]:py-3', []);

    return createPortal(
      <dialog
        {...rest}
        ref={dialogRef}
        className={`flex max-h-[90vh] min-w-[25rem] flex-col overflow-hidden rounded-xl bg-snow p-0 shadow-md ${styles.dialog}`}
      >
        <header className={`bg-snow-800 ${paddings}`}>{header}</header>

        <article className={`grow overflow-auto ${paddings}`}>{children}</article>

        <footer className={`flex justify-end gap-2 bg-snow-700 bg-snow-800 ${paddings}`}>{footer}</footer>
      </dialog>,
      document.body,
    );
  }),
);
