'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { PawPrint, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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

// Configure the fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9); // Show 9 posts per page (3x3 grid)
  
  // Use SWR for data fetching with built-in caching
  const { data, error, isLoading, isValidating } = useSWR(
    `/api/blog?status=published&page=${page}&limit=${limit}`,
    fetcher,
    {
      revalidateOnFocus: false, // Don't refetch when tab gets focus
      revalidateIfStale: false, // Only revalidate on explicit request
      dedupingInterval: 60000, // Dedupe requests for 1 minute
    }
  );
  
  // Format blog posts with defaults
  const posts: BlogPost[] = (data?.posts || []).map((post: any) => ({
    ...post,
    date: post.created_at,
    author_name: post.author_name || 'Anonymous',
  }));
  
  // Get pagination info
  const totalPages = data?.totalPages || 1;
  
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };
  
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    try {
      return format(new Date(dateString), 'EEEE do MMM');
    } catch {
      return 'Invalid date';
    }
  };

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
          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-pulse text-xl text-slate-400">Loading posts...</div>
            </div>
          )}
          
          {/* Error state */}
          {error && (
            <div className="flex justify-center items-center min-h-[300px] flex-col">
              <div className="text-xl text-rose-600 mb-4">Error loading blog posts</div>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          )}
          
          {/* Success state - show posts */}
          {!isLoading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="block">
                    <Card className="overflow-hidden border-0 shadow-md rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col">
                      <div className="relative h-48 w-full">
                        {post.cover_image ? (
                          <Image
                            src={post.cover_image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={page === 1 && posts.indexOf(post) < 3} // Prioritize first 3 images on first page
                            className="object-cover"
                          />
                        ) : (
                          <div className="bg-slate-200 w-full h-full flex items-center justify-center">
                            <PawPrint className="h-10 w-10 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 flex-grow">
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
              
              {/* Show loading indicator during revalidation */}
              {isValidating && !isLoading && (
                <div className="flex justify-center mt-4">
                  <div className="animate-pulse text-sm text-slate-400">Updating...</div>
                </div>
              )}
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handlePreviousPage} 
                    disabled={page === 1}
                    size="sm"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="mx-4 text-slate-600">
                    Page {page} of {totalPages}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleNextPage} 
                    disabled={page === totalPages}
                    size="sm"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
