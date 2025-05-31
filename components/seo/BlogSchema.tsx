import React from 'react';
import { BlogPostFull } from '../../lib/blog'; // Using relative path

interface BlogPostingSchemaProps {
  post: BlogPostFull;
  siteUrl: string;
}

export const BlogPostingSchema: React.FC<BlogPostingSchemaProps> = ({ post, siteUrl }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ? [
      post.cover_image,
     ] : undefined,
    author: {
      '@type': 'Person',
      name: post.author_name || 'Anonymous',
    },
    publisher: {
      '@type': 'Organization',
      name: "Bonnie's Monorepo",
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`, // Ensure this logo exists
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    keywords: post.tags?.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.href,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
