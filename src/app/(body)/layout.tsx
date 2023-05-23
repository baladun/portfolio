import { LayoutRouteProps } from '@/types';
import { Header } from '@/components/Header';

export default function Layout({ children }: LayoutRouteProps) {
  return (
    <div className="flex h-full flex-col">
      <Header />

      <main className="grow">{children}</main>
    </div>
  );
}
