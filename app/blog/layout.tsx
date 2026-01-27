import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Latest Articles | Sparkle Knowledge',
  description: 'Discover expert insights, tips, and guides on IELTS, PTE, TOEFL, OET, and language learning from Sparkle Knowledge.',
};

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-20 sm:pt-24 md:pt-28">
        {children}
      </main>
      <Footer />
    </>
  );
}
