import { Inter, Lusitana } from 'next/font/google';

// Font files can be colocated inside of `app`
/* export const lusitana = localFont({
  src: [
    {
      path: '/fonts/Lusitana-Regular.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '/fonts/Lusitana-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
}); */

// export inter font
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
