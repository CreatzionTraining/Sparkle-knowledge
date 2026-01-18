import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Latest Articles | Sparkle Knowledge',
  description: 'Discover expert insights, tips, and guides on IELTS, PTE, TOEFL, OET, and language learning from Sparkle Knowledge.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
