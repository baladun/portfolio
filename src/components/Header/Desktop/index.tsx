import { Logo } from '@/components/Logo';
import { Socials } from '../Socials';
import { Menu } from '../Menu';

export function Desktop() {
  return (
    <header className="flex items-center justify-between px-[5.375rem] py-[4.625rem]">
      <Logo size="md" />

      <Menu />

      <Socials color="black" />
    </header>
  );
}
