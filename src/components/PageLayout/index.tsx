'use client';

import styles from './styles.module.scss';
import { PageLayoutProps } from './types';
import { Button } from '@/shared/Button';
import { IconSvg } from '@/shared/IconSvg';
import { cloneElement, useContext } from 'react';
import { ScrollDirectionSwitch } from '@/components/ScrollDirectionSwitch';
import { ScrollDirectionContext } from '@/context/ScrollDirectionContext';
import classnames from 'classnames';
import { useRouter } from 'next/navigation';

export function PageLayout({ heading, backHref, children, className }: PageLayoutProps) {
  const router = useRouter();
  const { scrollDirection } = useContext(ScrollDirectionContext);

  const overriddenHeading = heading
    ? cloneElement(heading, {
        ...heading.props,
        className: classnames('text-right leading-9 whitespace-nowrap', heading.props.className),
      })
    : null;

  return (
    <div className={classnames('h-full bg-black py-[0.875rem] sm:py-10 xl:py-20', className)}>
      <div className="positioner flex h-full flex-col">
        <div className="relative mb-[0.875rem] flex sm:mb-6 xl:mb-10">
          {backHref && (
            <Button
              kind="text"
              color="snow"
              size="sm"
              icon={<IconSvg type="ArrowLeft" />}
              className="relative left-[-0.5em] top-[-0.125em] self-start"
              onClick={() => router.push(backHref)}
            />
          )}

          {overriddenHeading}

          <ScrollDirectionSwitch className="absolute right-[-0.5em] top-[-0.125em] self-start" />
        </div>

        {/*use NoSsr if needed to keep last selected scrollDirection in localStorage*/}
        {/*<NoSsr>*/}
        <div className={classnames('grow', scrollDirection === 'vertical' ? '' : styles.itemsContainer)}>
          <div
            className={classnames(
              scrollDirection === 'vertical' ? '' : 'relative -left-[calc((100vw-100%)/2)] w-screen',
              scrollDirection === 'vertical' ? '' : styles.itemsWrapper,
              scrollDirection === 'vertical'
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 [&_a]:h-auto [&_a]:w-auto [&_button]:h-auto [&_button]:w-auto'
                : `flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [&>*]:shrink-0`,
            )}
          >
            {children}
          </div>
        </div>
        {/*</NoSsr>*/}
      </div>
    </div>
  );
}
