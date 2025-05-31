// Content for /Users/tomscott/DEV/bonniesmonorepo/app/blog/[slug]/blog-post-client-page.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PawPrint, Calendar, User, ArrowLeft, Tag, AlertCircle, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useSWR from 'swr'; // Corrected: SWR is a named export
import { BlogPostFull } from '../../../lib/blog'; // Assuming BlogPostFull is correctly typed and exported
import { BlogPostingSchema, BreadcrumbSchema } from '../../../components/seo/BlogSchema';
import { format } from 'date-fns';
import * as React from 'react'; // Keep React import for JSX and hooks like useEffect/useState if needed later

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Post not found'); // Specific error for 404
    }
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch post and parse error' }));
    throw new Error(errorData.message || 'Failed to fetch post');
  }
  return response.json();
};

interface BlogPostClientPageProps {
  slug: string;
}

export default function BlogPostClientPage({ slug }: BlogPostClientPageProps) {
  const { data, error, isLoading } = useSWR<BlogPostFull>(
    slug ? `/api/blog/${slug}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.message === 'Post not found' || retryCount >= 3) return;
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  const post = data; // SWR data is already BlogPostFull or undefined
  const notFound = error && error.message === 'Post not found';
  const clientSiteUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');


  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    try {
      return format(new Date(dateString), 'EEEE do MMM');
    } catch {
      return 'Invalid date';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <PawPrint className="mx-auto h-12 w-12 text-rose-500 animate-bounce" />
          <p className="mt-4 text-lg font-semibold text-slate-700">Loading post...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto h-16 w-16 text-amber-500" />
          <h1 className="mt-6 text-3xl font-bold text-slate-800">Post Not Found</h1>
          <p className="mt-4 text-slate-600">
            Sorry, we couldn&apos;t find the blog post you were looking for. It might have been moved or deleted.
          </p>
          <Button asChild className="mt-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="mt-6 text-3xl font-bold text-slate-800">Error Loading Post</h1>
          <p className="mt-4 text-slate-600">
            {error?.message || 'An unexpected error occurred while trying to load the post.'}
          </p>
          <Button asChild className="mt-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // If post is loaded successfully
  return (
    <>
      <BlogPostingSchema
        post={post}
        siteUrl={clientSiteUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Blog', href: `${clientSiteUrl}/blog` },
          { name: post.title, href: `${clientSiteUrl}/blog/${post.slug}` },
        ]}
      />
      <div className="min-h-screen bg-slate-50 pb-20">
        <div className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="flex items-center text-slate-600 hover:text-slate-900"
            >
              <Link href="/">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Main Website
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-16">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="outline" className="mb-8">
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>

            {post.cover_image && (
              <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags && post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                    <Tag className="h-3 w-3 mr-1" /> {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-display">
                {post.title}
              </h1>
              <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden mr-3">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <span className="font-medium text-slate-700">{post.author_name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center text-slate-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(post.created_at)} 
                </div>
              </div>
            </div>

            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            <div className="mt-12 pt-6 border-t border-slate-200">
              <Button asChild variant="outline">
                <Link href="/blog" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}