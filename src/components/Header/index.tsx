import { Mobile } from './Mobile';
import { Menu } from './Menu';
import { Socials } from './Socials';
import { Desktop } from './Desktop';

export function Header() {
  return (
    <header>
      <Mobile
        menu={<Menu dir="vertical" />}
        socials={<Socials />}
      />

      <Desktop />
    </header>
  );
}
