'use client';

import { PageLayoutProps } from './types';
import { Button } from '@/shared/Button';
import { IconSvg } from '@/shared/IconSvg';
import { cloneElement, CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import { ScrollDirectionSwitch } from '@/components/ScrollDirectionSwitch';
import { ScrollDirectionContext } from '@/context/ScrollDirectionContext';
import { NoSsr } from '@/shared/NoSsr';

export function PageLayout({ heading, children }: PageLayoutProps) {
  const { scrollDirection } = useContext(ScrollDirectionContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const overriddenHeading = cloneElement(heading, {
    ...heading.props,
    className: `${heading.props.className} text-right leading-9 whitespace-nowrap`,
  });

  useEffect(() => {
    const handleResize = () => setContainerWidth(containerRef?.current?.clientWidth || 0);
    window.addEventListener('resize', handleResize);
    window.dispatchEvent(new Event('resize'));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-full bg-black py-[0.875rem] sm:py-10 xl:py-20">
      <div className="positioner flex h-full flex-col">
        <div className="relative mb-[0.875rem] flex sm:mb-6 xl:mb-10">
          <Button
            kind="text"
            color="snow"
            size="sm"
            icon={<IconSvg type="ArrowLeft" />}
            className="relative left-[-0.5em] top-[-0.125em] self-start"
          ></Button>

          {overriddenHeading}

          <ScrollDirectionSwitch className="absolute right-[-0.5em] top-[-0.125em] self-start" />
        </div>

        <div
          className="grow"
          ref={containerRef}
          style={{ '--space': `calc((100vw - ${containerWidth}px) / 2)` } as CSSProperties}
        >
          <NoSsr>
            <div className={scrollDirection === 'vertical' ? '' : 'relative -left-[calc((100vw-100%)/2)] w-screen'}>
              <div
                className={
                  scrollDirection === 'vertical'
                    ? 'flex-wrap gap-4 md:flex'
                    : `flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [&>*:first-child]:ml-[--space] [&>*:last-child]:mr-[--space] [&>*]:shrink-0`
                }
              >
                {children}
              </div>
            </div>
          </NoSsr>
        </div>
      </div>
    </div>
  );
}