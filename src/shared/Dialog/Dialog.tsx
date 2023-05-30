'use client';

import { memo, SyntheticEvent, useEffect, useRef } from 'react';
import { DialogFrame } from './DialogFrame';
import { DialogFrameRef, DialogProps } from './types';
import { Typography } from '@/shared/Typography';
import { Button } from '@/shared/Button';

const { Heading } = Typography;

export const Dialog = memo(function Dialog({
  isShown,
  headingText,
  showOk = true,
  okText = 'Ok',
  showCancel = true,
  cancelText = 'Cancel',
  onOk,
  onCancel,
  children,
  ...rest
}: DialogProps) {
  const dialogFrameRef = useRef<DialogFrameRef>(null);

  useEffect(() => {
    const { current: el } = dialogFrameRef;
    isShown ? el?.open() : el?.close();
  }, [isShown]);

  const handleEsc = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    if (onCancel) {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <>
      {isShown ? (
        <DialogFrame
          {...rest}
          ref={dialogFrameRef}
          header={headingText ? <Heading level={5}>{headingText}</Heading> : undefined}
          onCancel={handleEsc}
          footer={
            <>
              {showCancel && (
                <Button
                  kind="text"
                  size="sm"
                  value="cancel"
                  onClick={onCancel}
                >
                  {cancelText}
                </Button>
              )}
              {showOk && (
                <Button
                  kind="filled"
                  size="sm"
                  onClick={onOk}
                >
                  {okText}
                </Button>
              )}
            </>
          }
        >
          {children}
        </DialogFrame>
      ) : null}
    </>
  );
});
