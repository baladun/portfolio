'use client';

import { Accordion, AccordionItem, AccordionItemProps } from '@szhsin/react-accordion';
import { IconPark } from '@/shared/IconPark';
import classnames from 'classnames';
import { HTMLAttributes } from 'react';

export { Accordion as AccordionWrapped };

export function AccordionItemWrapped({ header, ...rest }: AccordionItemProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <AccordionItem
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          {header}
          <IconPark
            type="Down"
            className={classnames('ml-auto transition-transform duration-200 ease-out', isEnter ? 'rotate-180' : '')}
          />
        </>
      )}
      className="border-b border-snow/20 text-snow/80"
      buttonProps={{
        className: ({ isEnter }) => classnames('flex w-full p-4 text-left hover:bg-slate-100', isEnter ? 'bg-slate-200' : ''),
      }}
      contentProps={{
        className: 'transition-all duration-200 ease-out text-snow/40 text-sm whitespace-pre-line',
      }}
      panelProps={{ className: 'p-4' }}
    />
  );
}
