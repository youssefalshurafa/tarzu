import { ClerkProvider } from '@clerk/nextjs';
import Navbar from './components/Navbar';
import Footer from '@/components/shared/Footer';
import '../globals.css';
import Sidebar from './components/Sidebar';
import { Inter } from 'next/font/google';
import { ProductProvider } from '@/lib/context/productContext';

export const metadata = {
  title: 'Arzu-admin',
  description: 'Generated by Next.js',
};
const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="flex flex-row font-sans">
            <Sidebar />

            <section className=" flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
