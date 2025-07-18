import { Metadata } from 'next';

const DEFAULT_TITLE = "Bonnie's Private Dog Fields - Radlett, Shenley & Surrounding";
const DEFAULT_DESCRIPTION = "Bonnie's offers exceptional dog walks, private field free-roam, and 1-on-1 training in Barnet, Mill Hill, Edgware, Radlett, Shenley, St Albans, London Colney, Borehamwood & Elstree. Safe socialisation for happy dogs!";
const DEFAULT_KEYWORDS = [
  'dog walks Barnet', 'doggy care Mill Hill', 'private dog fields St Albans',
  'dog socialisation Whetstone', '1-on-1 dog training Edgware', 'dog walker Stanmore',
  'secure dog play area Bushey', 'puppy care Aldenham', 'dog care Radlett',
  'Shenley dog services', 'Napsbury Park dog walking', 'London Colney pet care',
  'Borehamwood dog training', 'Elstree dog walks', 'Bonnie\'s dog care',
  'dog pick up drop off service', 'dog training Hertfordshire', 'dog walks North London',
  'safe dog socialisation', 'lonely dog solutions'
];

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
