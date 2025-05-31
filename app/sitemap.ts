import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog'; // Assuming you have this function

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  // Define static pages
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
    // Add other static pages here
  ];

  const staticPageEntries: MetadataRoute.Sitemap = staticPages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date().toISOString(), // Or a specific date for each page
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Fetch dynamic blog posts
  let blogPostEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllBlogPosts('published'); // Fetch only published posts
    blogPostEntries = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at || post.created_at || new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Optionally, you could return a sitemap without blog posts or throw an error
  }

  return [...staticPageEntries, ...blogPostEntries];
}
