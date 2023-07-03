import { DialogFrameProps } from './types';
import { useDialogFrame } from './hooks';
import { DialogFrameContext } from './context';
import { Body } from './Body';
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';
import classnames from 'classnames';
import { memo, useEffect } from 'react';

const paddings = '[&:not(:empty)]:px-6 [&:not(:empty)]:py-3';

const DialogFrame = memo(function DialogFrame({ header, footer, className, style, onEsc, children, ...options }: DialogFrameProps) {
  const dialog = useDialogFrame(options);

  useEffect(() => {
    if (onEsc) {
      const handler = (e: KeyboardEvent) => e.key === 'Escape' && onEsc();
      window.addEventListener('keyup', handler);
      return () => window.removeEventListener('keyup', handler);
    }
  }, []);

  return (
    <DialogFrameContext.Provider value={dialog}>
      <Body
        className={classnames(
          'm-auto flex h-fit max-h-[90vh] w-fit min-w-[25rem] flex-col overflow-hidden rounded-xl bg-snow p-0 shadow-md',
          className,
        )}
        style={style}
      >
        {header && <Header className={classnames('bg-snow-800', paddings)}>{header}</Header>}
        <Content className={classnames('grow overflow-auto', paddings)}>{children}</Content>
        {footer && <Footer className={classnames('flex justify-end gap-2 bg-snow-800', paddings)}>{footer}</Footer>}
      </Body>
    </DialogFrameContext.Provider>
  );
});

export type { DialogFrameProps };
export { DialogFrame };
