'use client';

import { usePopover } from './hooks';
import { PopoverProps } from './types';
import { PopoverContext } from './context';
import { Trigger } from './Trigger';
import { Body } from './Body';
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';
import { memo } from 'react';

export const Popover = memo(function Popover({ children, modal = true, content, header, footer, ...restOptions }: PopoverProps) {
  const popover = usePopover({ modal, ...restOptions });

  return (
    <PopoverContext.Provider value={popover}>
      <Trigger>{children}</Trigger>
      <Body className="max-w-xs rounded-[0.5em] border border-orange-100 bg-snow font-montserrat text-xs font-medium text-black shadow-md shadow-orange/10">
        {header && <Header className="rounded-t-[0.5em] px-3 pt-2">{header}</Header>}
        <Content className="px-3 py-2">{content}</Content>
        {footer && <Footer className="rounded-t-[0.5em] px-3 pb-2">{footer}</Footer>}
      </Body>
    </PopoverContext.Provider>
  );
});
