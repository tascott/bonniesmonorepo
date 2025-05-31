import { Metadata } from 'next';
import { getBlogPostBySlug, BlogPostFull } from '../../../lib/blog';
import { generateMetadata as generatePageSeoMetadata } from '../../../lib/seo/metadata';
import BlogPostClientPage from './blog-post-client-page';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await paramsPromise;
  
  try {
    const post: BlogPostFull | null = await getBlogPostBySlug(slug);

    if (!post) {
      return generatePageSeoMetadata({
        title: 'Post Not Found',
        description: 'The blog post you are looking for could not be found.',
        siteUrl: SITE_URL,
        canonical: `${SITE_URL}/blog/${slug}`,
        noIndex: true,
      });
    }

    return generatePageSeoMetadata({
      title: post.title,
      description: post.excerpt,
      imageUrl: post.cover_image,
      ogType: 'article',
      canonical: `${SITE_URL}/blog/${post.slug}`,
      siteUrl: SITE_URL,
      articleDetails: {
        publishedTime: post.created_at,
        modifiedTime: post.updated_at || post.created_at,
        authorName: post.author_name || 'Anonymous',
        tags: post.tags || [],
      }
    });
  } catch (error) {
    console.error(`Error generating metadata for /blog/${slug}:`, error);
    return generatePageSeoMetadata({
      title: 'Error Loading Post',
      description: 'An error occurred while trying to load metadata for this post.',
      siteUrl: SITE_URL,
      canonical: `${SITE_URL}/blog/${slug}`,
      noIndex: true,
    });
  }
}

interface PageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function Page({ params: paramsInput }: PageProps) {
  const params = await paramsInput;
  const { slug } = params;
  return <BlogPostClientPage slug={slug} />;
}
