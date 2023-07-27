import { FrameProps } from './types';
import classnames from 'classnames';
import Link from 'next/link';

export function Frame({ as = 'a', href, className, children, ...rest }: FrameProps) {
  const classNames = classnames(
    'relative block aspect-square w-full overflow-hidden rounded-xl md:h-[25rem] md:w-[25rem]', //
    className,
  );

  return (
    <>
      {as === 'a' ? (
        <Link
          {...rest}
          className={classNames}
          href={href ?? '/about'}
        >
          {children}
        </Link>
      ) : (
        <button
          {...rest}
          className={classNames}
        >
          {children}
        </button>
      )}
    </>
  );
}
