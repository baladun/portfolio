import { Logo } from '@/components/Logo';
import { Socials } from '../Socials';
import { Menu } from '../Menu';

export function Desktop() {
  return (
    <div className="positioner hidden items-center justify-between py-10 lg:flex xl:py-[4.625rem]">
      <Logo size="md" />

      <Menu />

      <Socials color="black" />
    </div>
  );
}
