'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PawPrint, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

// Empty array to start - we'll fetch from the API

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts from our API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog?status=published');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        // Map API posts to add 'date' and fallback for author_name
const mappedPosts = (data.posts || []).map((post: any) => ({
  ...post,
  date: post.created_at,
  author_name: post.author_name || 'Anonymous',
}));
setPosts(mappedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Unknown date';
  try {
    return format(new Date(dateString), 'EEEE do MMM');
  } catch {
    return 'Invalid date';
  }
};

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="primary-bg text-white p-2 rounded-full">
              <PawPrint className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-display">
            Bonnies Blog
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Expert tips, dog care advice, and stories from our team to help you give your furry friend the best care possible.
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-pulse text-xl text-slate-400">Loading posts...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="block">
  <Card className="overflow-hidden border-0 shadow-md rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer">
    <div className="relative h-48 w-full">
      {post.cover_image ? (
        <Image
          src={post.cover_image}
          alt={post.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className="bg-slate-200 w-full h-full flex items-center justify-center">
          <PawPrint className="h-10 w-10 text-slate-400" />
        </div>
      )}
    </div>
    <CardContent className="p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags && post.tags.map(tag => (
          <Badge key={tag} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
            {tag}
          </Badge>
        ))}
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
        {post.title}
      </h2>
      <p className="text-slate-600 line-clamp-3 mb-4">
        {post.excerpt}
      </p>
    </CardContent>
    <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-slate-100">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden mr-2">
          <User className="h-4 w-4 text-slate-500" />
        </div>
        <span className="text-sm text-slate-600">{post.author_name}</span>
      </div>
      <div className="flex items-center text-slate-500 text-sm">
        <Calendar className="h-4 w-4 mr-1" />
        {formatDate(post.date)}
      </div>
    </CardFooter>
  </Card>
</Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
