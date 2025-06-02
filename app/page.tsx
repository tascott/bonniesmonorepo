import { Metadata } from 'next';
import { generateMetadata as generatePageSeoMetadata } from '@/lib/seo/metadata';
import HomeClientPage from './home-client-page';
import Script from 'next/script'; // The UI component, formerly page.tsx

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    console.warn("[SEO - app/page.tsx] NEXT_PUBLIC_SITE_URL is not set. This is crucial for canonical URLs and Open Graph tags. Please ensure it's set in your environment variables for production. Using fallback for local dev.");
  }

  // For the homepage, we use the defaults set in lib/seo/metadata.tsx
  // by not passing title, description, or keywords here.
  // The generateMetadata function will use the updated DEFAULT_TITLE, DEFAULT_DESCRIPTION, etc.
  return generatePageSeoMetadata({
    ogType: 'website',
    siteUrl: siteUrl || 'http://localhost:3000', // Fallback for siteUrl for metadataBase construction
    // The canonical URL for the homepage will be the siteUrl itself,
    // which generateMetadata handles if `canonical` prop is not provided.
  });
}

export default function Page() {
  return (
    <div>
      <HomeClientPage />
      <Script
        id="localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Bonnie's Dog Day Care & Training",
            "description": "Bonnie's offers exceptional dog day care, private field free-roam, and 1-on-1 training in Shenley, Radlett, Mill Hill, Barnet, Stanmore, London Colney, St Albans, Potters Bar, Elstree & Borehamwood. Safe socialization for happy dogs!",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.bonniesdogcare.example.com", // Fallback if env var is not set
            "telephone": "+440123456789", // Placeholder - UPDATE THIS
            "email": "hello@bonniesdogcare.example.com", // Placeholder - UPDATE THIS
            // If there's a specific physical address, add it here:
            // "address": {
            //   "@type": "PostalAddress",
            //   "streetAddress": "123 Playful Paw Path",
            //   "addressLocality": "Shenley",
            //   "addressRegion": "Hertfordshire",
            //   "postalCode": "WD7 9XX",
            //   "addressCountry": "GB"
            // },
            "image": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bonniesdogcare.example.com'}/default-og-image.png`, // Ensure you have this image
            "areaServed": [
              { "@type": "Place", "name": "Shenley" },
              { "@type": "Place", "name": "Radlett" },
              { "@type": "Place", "name": "Mill Hill" },
              { "@type": "Place", "name": "Barnet" },
              { "@type": "Place", "name": "Stanmore" },
              { "@type": "Place", "name": "London Colney" },
              { "@type": "Place", "name": "St Albans" },
              { "@type": "Place", "name": "Potters Bar" },
              { "@type": "Place", "name": "Elstree" },
              { "@type": "Place", "name": "Borehamwood" },
              { "@type": "AdministrativeArea", "name": "Hertfordshire" },
              { "@type": "AdministrativeArea", "name": "North London" }
            ],
            "serviceType": [
              "Dog Day Care Center",
              "Pet Boarding Service (Private Field Hire)", // Schema.org doesn't have 'Private Dog Field Hire' directly
              "Pet Grooming Service (1-on-1 Training)" // Using a broader category if 'Dog Trainer' isn't sufficient or for variety
            ],
            "makesOffer": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dog Day Care & Socialization Mornings" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Private Dog Field Hire" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "1-on-1 Dog Training & Behavior" } }
            ],
            // If you have specific opening hours:
            // "openingHoursSpecification": [
            //   {
            //     "@type": "OpeningHoursSpecification",
            //     "dayOfWeek": [
            //       "Monday",
            //       "Tuesday",
            //       "Wednesday",
            //       "Thursday",
            //       "Friday"
            //     ],
            //     "opens": "09:00",
            //     "closes": "17:00"
            //   }
            // ],
            "priceRange": "££" // Optional: General price range, e.g., $, ££, £££
          }),
        }}
      />
    </div>
  );
}