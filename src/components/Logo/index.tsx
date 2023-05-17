import { Typography } from '@/shared/Typography';
import { LogoProps } from './types';
import classnames from 'classnames';
import Link from 'next/link';

const { Text } = Typography;

export function Logo({ size, className, ...rest }: LogoProps) {
  const rootClassNames = classnames(
    'max-w-min', //
    'pointer',
    className,
  );
  const textClassNames = classnames(
    'block', //
    size === 'md' ? '!text-xl/6' : '!text-5xl',
  );
  const subtextClassNames = classnames(
    'block', //
    'text-brown',
    size === 'md' ? '!text-[.5rem]/tight tracking-[.2em]' : '!text-lg/tight tracking-[.25em]',
  );

  return (
    <Link
      {...rest}
      href="/"
      className={rootClassNames}
    >
      <Text
        kind="secondary"
        className={textClassNames}
      >
        MaxIM
      </Text>
      <Text
        kind="secondary"
        className={textClassNames}
      >
        fadeev
      </Text>
      <Text
        kind="secondary"
        className={subtextClassNames}
      >
        photogrApher
      </Text>
    </Link>
  );
}
