import { BottomSheetProps } from './types';
import { useBottomSheet } from './hooks';
import { BottomSheetContext } from './context';
import { Body } from './Body';
import { Header } from './Header';
import classnames from 'classnames';
import { memo, useEffect } from 'react';
import { Button } from '@/shared/Button';
import { Typography } from '@/shared/Typography';

const { Heading } = Typography;

const paddings = '[&:not(:empty)]:px-6 [&:not(:empty)]:py-3';

export const BottomSheet = memo(function BottomSheet({
  headerText,
  fullWidth,
  className,
  style,
  loading,
  showOk = true,
  showCancel = true,
  okText = 'Ok',
  cancelText = 'Cancel',
  onOk,
  onCancel,
  children,
  ...options
}: BottomSheetProps) {
  const bottomSheet = useBottomSheet(options);

  useEffect(() => {
    if (onCancel) {
      const handler = (e: KeyboardEvent) => e.key === 'Escape' && onCancel();
      window.addEventListener('keyup', handler);
      return () => window.removeEventListener('keyup', handler);
    }
  }, []);

  return (
    <BottomSheetContext.Provider value={bottomSheet}>
      <Body
        className={classnames(
          'flex h-fit max-h-[90vh] min-w-[25rem] flex-col overflow-hidden rounded-xl bg-snow p-0 shadow-md',
          fullWidth ? 'w-full' : 'w-fit',
          className,
        )}
        style={style}
      >
        {headerText && (
          <Header className={classnames('bg-snow-800', paddings)}>
            <Heading level={5}>{headerText}</Heading>
          </Header>
        )}

        <div className={classnames('grow overflow-auto', paddings)}>{children}</div>

        {(showOk || showCancel) && (
          <footer className={classnames('flex justify-end gap-2 bg-snow-800', paddings)}>
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
          </footer>
        )}
      </Body>
    </BottomSheetContext.Provider>
  );
});
