'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PawPrint, Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
}

// No need to initialize Supabase client here as we're using the API routes

import { format } from 'date-fns';
import * as React from 'react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setNotFound(true);
          } else {
            throw new Error('Failed to fetch post');
          }
        } else {
          const data = await response.json();
          // Map created_at to date and provide fallback for author_name
          setPost({
            ...data,
            date: data.created_at,
            author_name: data.author_name || 'Anonymous',
          });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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
        <div className="animate-pulse text-xl text-slate-400">Loading post...</div>
      </div>
    );
  }

  if (notFound || !post) {
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

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
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
