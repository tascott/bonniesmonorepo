import { Metadata } from 'next';

const DEFAULT_TITLE = 'Bonnie\'s Monorepo - Next.js & Supabase Starter';
const DEFAULT_DESCRIPTION = 'A feature-rich Next.js 14 monorepo starter with Supabase integration, blog, admin dashboard, and more.';
const DEFAULT_KEYWORDS = ['Next.js', 'Supabase', 'React', 'TypeScript', 'Monorepo', 'Starter Kit', 'Blog', 'Admin'];

export interface ArticleDetails {
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  tags?: string[];
}

export interface CustomMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  canonical?: string; // Full canonical URL
  imageUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  authorTwitterHandle?: string; // e.g., @username
  siteUrl: string; // Base site URL, e.g., https://yourdomain.com
  articleDetails?: ArticleDetails;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords,
  canonical, // Changed from canonicalUrlPath
  imageUrl,
  ogType = 'website',
  authorTwitterHandle,
  siteUrl,
  articleDetails,
  noIndex = false,
}: CustomMetadataProps): Metadata {
  const pageTitle = title ? `${title} | ${DEFAULT_TITLE.split(' | ')[1]}` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords || DEFAULT_KEYWORDS.join(', ');
  const canonicalUrl = canonical || siteUrl; // Use the provided full canonical URL or default to siteUrl
  const effectiveImageUrl = imageUrl || `${siteUrl}/default-og-image.png`; // Ensure you have a default OG image

  let metadataBaseObject: URL | undefined = undefined;
try {
  if (siteUrl && (siteUrl.startsWith('http://') || siteUrl.startsWith('https://'))) {
    metadataBaseObject = new URL(siteUrl);
  } else {
    console.warn(`[SEO] Invalid siteUrl for metadataBase: '${siteUrl}'. It must be an absolute URL. Falling back to no metadataBase.`);
  }
} catch (e) {
  console.warn(`[SEO] Error creating URL object from siteUrl: '${siteUrl}'. Error: ${(e as Error).message}. Falling back to no metadataBase.`);
}

const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: articleDetails?.authorName ? [{ name: articleDetails.authorName }] : [{ name: 'Bonnie\'s Monorepo Team' }],
    creator: articleDetails?.authorName || 'Bonnie\'s Monorepo Team',
    publisher: 'Bonnie\'s Monorepo',
    ...(metadataBaseObject && { metadataBase: metadataBaseObject }), // Conditionally add metadataBase
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: DEFAULT_TITLE.split(' | ')[1],
      images: [
        {
          url: effectiveImageUrl,
          width: 1200, // Standard OG image width
          height: 630, // Standard OG image height
          alt: pageTitle,
        },
      ],
      locale: 'en_US',
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [effectiveImageUrl],
      creator: authorTwitterHandle || '@yourtwitterhandle', // Replace with actual handle
      site: authorTwitterHandle || '@yourtwitterhandle', // Replace with actual handle
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
  };

  if (ogType === 'article' && articleDetails) {
    if (metadata.openGraph) {
      // The 'type' is already set to 'article' if ogType was 'article' during openGraph object creation.
      // We just need to add the article-specific properties.
      const articleData = {
        publishedTime: articleDetails.publishedTime,
        modifiedTime: articleDetails.modifiedTime || articleDetails.publishedTime,
        authors: articleDetails.authorName ? [articleDetails.authorName] : undefined,
        tags: articleDetails.tags,
      };
      // Merge articleData into openGraph. The 'as any' is used because OpenGraph type from 'next' 
      // might not directly list 'article' as a property, though it's supported for 'article' type.
      Object.assign(metadata.openGraph, { article: articleData });
    }
  }
  
  if (noIndex && metadata.openGraph) {
    // For noIndex pages, we might not want them shared widely
    // However, some platforms might still use OG tags for previews if linked directly.
    // Consider if you want to remove OG tags for noIndex pages or adjust them.
  }

  return metadata;
}
