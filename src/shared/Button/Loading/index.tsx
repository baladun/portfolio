import styles from './styles.module.scss';
import { LoadingProps } from './types';
import { useMemo } from 'react';
import classnames from 'classnames';

export function Loading({ kind, className, ...rest }: LoadingProps) {
  const arr = useMemo(() => new Array(3).fill(null), []);

  return (
    <ul
      {...rest}
      className={classnames('flex items-center justify-center gap-1', className)}
    >
      {arr.map((_, idx) => (
        <li
          key={idx}
          className={classnames('h-2 w-2 shrink-0 rounded-full', kind === 'filled' ? 'bg-snow' : 'bg-orange', styles.item)}
        />
      ))}
    </ul>
  );
}
