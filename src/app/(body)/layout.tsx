import { LayoutRouteProps } from '@/types';
import { Header } from '@/components/Header';
import { Desktop } from '@/components/Header/Desktop';
import { Mobile } from '@/components/Header/Mobile';
import { Menu } from '@/components/Header/Menu';
import { Socials } from '@/components/Header/Socials';

export default function Layout({ children }: LayoutRouteProps) {
  return (
    <>
      <Header
        desktop={<Desktop />}
        mobile={
          <Mobile
            menu={<Menu dir="vertical" />}
            socials={<Socials />}
          />
        }
      />

      <main>{children}</main>
    </>
  );
}
