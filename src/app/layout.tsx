import './globals.css';
import classnames from 'classnames';
import { madreRoseFont, montserratFont } from '@/app/fonts';
import { LayoutRouteProps } from '@/types';

export const metadata = {
  title: 'Maxim Fadeev Photographer',
  description: 'Description',
};

export default function RootLayout({ children }: LayoutRouteProps) {
  const classNames = classnames(montserratFont.variable, madreRoseFont.variable);

  return (
    <html lang="en">
      <body className={classNames}>{children}</body>
    </html>
  );
}
