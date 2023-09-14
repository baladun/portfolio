import { LayoutRouteProps } from '@/types';

export default function Layout({ children }: LayoutRouteProps) {
  return <div className="flex h-full flex-col bg-snow">{children}</div>;
}
