import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

export const montserratFont = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
  variable: '--font-montserrat',
});

export const madreRoseFont = localFont({
  src: '../../public/fonts/MadreroseRegular.otf',
  display: 'swap',
  weight: '400',
  style: 'normal',
  fallback: ['serif'],
  variable: '--font-madre-rose',
});
