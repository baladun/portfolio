import './globals.scss';
import classnames from 'classnames';
import { madreRoseFont, montserratFont } from './fonts';
import { LayoutRouteProps } from '@/types';
import { Providers } from './Providers';
import { Toastr } from '@/shared/Toastr';

export const metadata = {
  title: 'Maxim Fadeev Photographer',
  description: 'Description',
};

export default function RootLayout({ children }: LayoutRouteProps) {
  const classNames = classnames(montserratFont.variable, madreRoseFont.variable, 'bg-snow', 'antialiased');

  return (
    <html lang="en">
      <body className={classNames}>
        <Providers>{children}</Providers>
        <Toastr />
      </body>
    </html>
  );
}
