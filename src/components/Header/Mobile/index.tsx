'use client';

import styles from './styles.module.scss';
import { Logo } from '@/components/Logo';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { useRef, useState } from 'react';
import classnames from 'classnames';
import { MobileProps } from './types';
import { CSSTransition } from 'react-transition-group';

export function Mobile({ menu, socials }: MobileProps) {
  const [isOpened, setIsOpened] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef(null);

  const iconClassNames = classnames(
    isOpened ? 'rotate-[45deg]' : 'rotate-0', //
    'transition-transform',
    'duration-300',
  );

  return (
    <>
      <div
        className={`positioner relative z-[2] flex items-center justify-between px-6 py-[0.875rem] lg:hidden ${isOpened ? 'invert' : ''}`}
        ref={headerRef}
      >
        <Logo size="md" />

        <Button
          kind="text"
          color="black"
          icon={
            <IconPark
              type="Plus"
              className={iconClassNames}
            />
          }
          onClick={() => setIsOpened(!isOpened)}
        />
      </div>

      <CSSTransition
        nodeRef={dialogRef}
        in={isOpened}
        timeout={150}
        unmountOnExit
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}
      >
        <div
          ref={dialogRef}
          style={{ paddingTop: `${headerRef.current?.clientHeight || 0}px` }}
          className={`absolute left-0 top-0 z-[1] h-screen w-screen bg-black px-6`}
        >
          <div className="flex h-full w-max flex-col justify-between py-12 invert">
            <div onClick={() => setIsOpened(false)}>{menu}</div>
            <div onClick={() => setIsOpened(false)}>{socials}</div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
