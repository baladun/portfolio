import './globals.css';
import classnames from 'classnames';
import { madreRoseFont, montserratFont } from '@/app/fonts';

export const metadata = {
  title: 'Maxim Fadeev Photographer',
  description: 'Description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const classNames = classnames(montserratFont.variable, madreRoseFont.variable);

  return (
    <html lang="en">
      <body className={classNames}>{children}</body>
    </html>
  );
}
