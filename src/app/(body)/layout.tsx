import { LayoutRouteProps } from '@/types';
import { Header } from '@/components/Header';

export default function Layout({ children, modal }: LayoutRouteProps & { modal: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <Header />

      <main className="grow">{children}</main>

      {modal}
    </div>
  );
}
