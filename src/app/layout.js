import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'FixMyStay - Professional Booking Platform',
  description: 'Hotels, PG, Rooms and Real Estate all in one place.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}