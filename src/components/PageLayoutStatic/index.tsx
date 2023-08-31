'use client';

import { PageLayoutStaticProps } from './types';
import { useRouter } from 'next/navigation';
import { cloneElement } from 'react';
import classnames from 'classnames';
import { Button } from '@/shared/Button';
import { IconSvg } from '@/shared/IconSvg';

export function PageLayoutStatic({ heading, backHref, children, className }: PageLayoutStaticProps) {
  const router = useRouter();
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
        </div>

        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
