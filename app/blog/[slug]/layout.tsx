import { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/blogData';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Sparkle Knowledge',
    };
  }

  return {
    title: `${post.title} | Sparkle Knowledge Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
