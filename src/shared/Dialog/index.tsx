import { memo } from 'react';
import { DialogFrame } from '@/shared/DialogFrame';
import { DialogProps } from './types';
import { Typography } from '@/shared/Typography';
import { Button } from '@/shared/Button';

const { Heading } = Typography;

export const Dialog = memo(function Dialog({
  open,
  headingText,
  showOk = true,
  okText = 'Ok',
  showCancel = true,
  cancelText = 'Cancel',
  loading,
  onOk,
  onCancel,
  children,
  ...rest
}: DialogProps) {
  return (
    <DialogFrame
      {...rest}
      open={open}
      header={headingText ? <Heading level={5}>{headingText}</Heading> : undefined}
      onEsc={onCancel}
      footer={
        <>
          {showCancel && (
            <Button
              kind="text"
              size="sm"
              value="cancel"
              disabled={loading}
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          )}
          {showOk && (
            <Button
              kind="filled"
              size="sm"
              loading={loading}
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
  );
});

export type { DialogProps };
