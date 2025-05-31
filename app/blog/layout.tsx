import type { Metadata } from 'next';
import { generateMetadata as generateBaseMetadata } from '@/lib/seo/metadata'; // Assuming your utility is here

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pageUrl = `${siteUrl}/blog`;

  return generateBaseMetadata({
    siteUrl: siteUrl, // siteUrl is a required prop for generateBaseMetadata
    title: 'Bonnies Blog - Dog Care Tips & Adventures',
    description: 'Explore expert tips, insightful articles, and heartwarming stories about dog care, training, and the adventures of our furry clients at Bonnies.',
    keywords: ['dog blog', 'dog care tips', 'dog training', 'pet adventures', 'Bonnies blog'],
    canonical: pageUrl,
    ogType: 'website', // generateBaseMetadata defaults to 'website' but can be explicit
    imageUrl: `${siteUrl}/images/og-image-blog.jpg`, // Pass the image URL directly
    // authorTwitterHandle: '@YourTwitterHandle' // Optional: if you have a specific handle for the blog section
  });
}

export default function BlogLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
