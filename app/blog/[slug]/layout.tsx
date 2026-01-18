import { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/blogData';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  
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
