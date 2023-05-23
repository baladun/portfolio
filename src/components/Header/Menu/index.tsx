import 'server-only';
import { MenuProps } from './types';
import { menuConfig } from './utils';
import { Typography } from '@/shared/Typography';
import classnames from 'classnames';

const { NavLink } = Typography;

export function Menu({ color, dir = 'horizontal', className, ...rest }: MenuProps) {
  // active links
  const classNames = classnames(
    'flex', //
    dir === 'horizontal' ? 'items-center justify-between gap-10' : 'flex-col gap-12',
    className,
  );

  return (
    <nav
      {...rest}
      className={classNames}
    >
      {menuConfig.map((conf, idx) => (
        <NavLink
          key={idx}
          href={conf.path}
          kind="secondary"
          color={color}
          hoverUnderline
          className="w-max"
        >
          {conf.text}
        </NavLink>
      ))}
    </nav>
  );
}
