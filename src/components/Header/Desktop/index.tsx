import { Logo } from '@/components/Logo';
import { Socials } from '../Socials';
import { Menu } from '../Menu';
import { Editable } from '@/components/Editable';
import { SignOut } from '@/components/SignOut';

export function Desktop() {
  return (
    <div className="positioner hidden items-center justify-between py-10 lg:flex xl:py-[4.625rem]">
      <Logo size="md" />

      <Menu />

      <div className="flex gap-4">
        <Socials color="black" />

        <Editable>
          <SignOut className="-mr-3" />
        </Editable>
      </div>
    </div>
  );
}
