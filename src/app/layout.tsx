import './globals.css';
import classnames from 'classnames';
import { madreRoseFont, montserratFont } from '@/app/fonts';
import { LayoutRouteProps } from '@/types';
import { Providers } from './Providers';

export const metadata = {
  title: 'Maxim Fadeev Photographer',
  description: 'Description',
};

export default function RootLayout({ children }: LayoutRouteProps) {
  const classNames = classnames(montserratFont.variable, madreRoseFont.variable);

  return (
    <html lang="en">
      <body className={classNames}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
