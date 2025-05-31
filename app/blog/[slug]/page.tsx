'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PawPrint, Calendar, User, ArrowLeft, Tag, AlertCircle, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';

// Blog post type from Supabase
interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  author_name?: string;
  created_at?: string;
  updated_at?: string;
  cover_image?: string;
  tags?: string[];
  status?: 'published' | 'draft';
  date?: string;
}

// No need to initialize Supabase client here as we're using the API routes

import { format } from 'date-fns';
import * as React from 'react';

// Configure the fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Post not found');
    }
    throw new Error('Failed to fetch post');
  }
  return response.json();
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  
  // Use SWR for data fetching with caching
  const { data, error, isLoading } = useSWR(
    `/api/blog/${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Only retry up to 3 times and don't retry for 404s
        if (error.message === 'Post not found' || retryCount >= 3) return;
        // Retry after 5 seconds
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
  
  // Format post data
  const post: BlogPost | null = data ? {
    ...data,
    date: data.created_at,
    author_name: data.author_name || 'Anonymous',
  } : null;
  
  // Check if post is not found
  const notFound = error && error.message === 'Post not found';
  
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
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <PawPrint className="h-12 w-12 text-slate-300 mb-4 animate-bounce" />
          <div className="text-xl text-slate-400">Loading post...</div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <PawPrint className="h-16 w-16 text-slate-300 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Post Not Found</h1>
          <p className="text-slate-600 mb-8">The blog post you're looking for doesn't exist or may have been removed.</p>
          <Button asChild variant="outline">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  if (error && !notFound) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <AlertCircle className="h-16 w-16 text-rose-500 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Error Loading Post</h1>
          <p className="text-slate-600 mb-8">There was a problem loading this blog post. Please try again later.</p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 flex justify-center items-center">
        <div className="animate-pulse text-xl text-slate-400">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Back to main website button - positioned at the very top */}
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

          {/* Featured Image */}
          {post.cover_image && (
            <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                priority={true} // This is the main content image, so prioritize loading
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
              />
            </div>
          )}

          {/* Header */}
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
                {formatDate(post.date)}
              </div>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
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
  );
}
