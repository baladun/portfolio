import { LayoutRouteProps } from '@/types';
import { VisitorNotification } from '@/components/VisitorNotification';

export default function Layout({ children }: LayoutRouteProps) {
  return (
    <>
      <div className="flex h-full flex-col bg-snow">{children}</div>

      <VisitorNotification />
    </>
  );
}
