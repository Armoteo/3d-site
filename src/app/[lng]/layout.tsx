import { dir } from 'i18next';
import { Wix_Madefor_Display } from 'next/font/google';

import { languages } from '../../i18n/settings';
import Providers from '../../store/provider';

import type { Metadata } from 'next';
import type { ILayout } from './interfaces/IPage';

import './sass/globals.scss';

const wixMadeforDisplay = Wix_Madefor_Display({ subsets: ['latin'] });

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  params: {
    lng,
  },
}: ILayout) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <Providers>
        <body className={wixMadeforDisplay.className}>{children}</body>
      </Providers>
    </html>
  );
}
