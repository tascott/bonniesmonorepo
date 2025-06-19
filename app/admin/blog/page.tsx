'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  PawPrint, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Search,
  ChevronLeft, 
  ChevronRight,
  Eye,
  Pencil
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

// Example blog post type
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  coverImage?: string;
  tags: string[];
  status: 'published' | 'draft';
}

// This would come from your data source in a real implementation
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'top-10-dog-exercise-tips',
    title: 'Top 10 Exercise Tips for a Happy, Healthy Dog',
    excerpt: "Regular exercise is crucial for your dog's physical and mental health. Here are our top tips to keep your furry friend active and happy.",
    content: 'Full content would go here...',
    author: {
      name: 'Sarah Johnson',
    },
    date: '2025-05-25',
    coverImage: '/images/blog/dog-exercise.jpg',
    tags: ['Exercise', 'Health', 'Training'],
    status: 'published'
  },
  {
    id: '2',
    slug: 'socializing-your-dog',
    title: 'The Importance of Socializing Your Dog',
    excerpt: 'Proper socialisation helps dogs become well-adjusted companions. Learn why it matters and how to do it right.',
    content: 'Full content would go here...',
    author: {
      name: 'Mike Thompson',
    },
    date: '2025-05-18',
    coverImage: '/images/blog/dog-socializing.jpg',
    tags: ['Behavior', 'Training', 'Socialisation'],
    status: 'published'
  },
  {
    id: '3',
    slug: 'choosing-the-right-dog-food',
    title: 'How to Choose the Right Food for Your Dog',
    excerpt: "With so many options available, selecting the right dog food can be overwhelming. Here's our guide to making the best choice.",
    content: 'Full content would go here...',
    author: {
      name: 'Emma Wilson',
    },
    date: '2025-05-10',
    coverImage: '/images/blog/dog-food.jpg',
    tags: ['Nutrition', 'Health', 'Diet'],
    status: 'published'
  },
  {
    id: '4',
    slug: 'summer-safety-for-dogs',
    title: 'Summer Safety Tips for Dog Owners',
    excerpt: 'Keep your dog safe and comfortable during the hot summer months with these essential tips.',
    content: 'Full content would go here...',
    author: {
      name: 'Sarah Johnson',
    },
    date: '2025-05-05',
    coverImage: '/images/blog/summer-dog.jpg',
    tags: ['Safety', 'Seasonal', 'Health'],
    status: 'draft'
  }
];

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog?status=all');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        // Ensure we set an array to posts state
        if (Array.isArray(data)) {
  setPosts(data);
} else if (data.posts && Array.isArray(data.posts)) {
  // Map API posts to table shape
  const mappedPosts = data.posts.map((post: any) => ({
    ...post,
    date: post.created_at,
    author: { name: post.author_name || '' },
    tags: Array.isArray(post.tags) ? post.tags : [],
  }));
  setPosts(mappedPosts);
} else {
  console.warn('API response did not contain a valid posts array');
  setPosts([]);
}
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
    (post.author.name && post.author.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDelete = (post: BlogPost) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete?.slug) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blog/${postToDelete.slug}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      
      setPosts(posts.filter(p => p.id !== postToDelete?.id));
      toast({
        title: "Post deleted",
        description: `"${postToDelete?.title}" has been removed.`,
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="primary-bg text-white p-2 rounded-full mr-3">
              <PawPrint className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 font-display">
              Blog Management
            </h1>
          </div>
          <Button asChild className="primary-bg hover:bg-orange-600">
            <Link href="/admin/blog/create" className="flex items-center text-white">
              <Plus className="h-4 w-4 mr-2" /> New Post
            </Link>
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search posts by title, tag, or author..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse text-xl text-slate-400">Loading posts...</div>
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-slate-400 mb-4">
                <PawPrint className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-medium text-slate-700 mb-2">No posts found</h3>
              <p className="text-slate-500 mb-6">
                {searchTerm 
                  ? "No posts match your search criteria." 
                  : "You haven't created any blog posts yet."}
              </p>
              {searchTerm ? (
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              ) : (
                <Button asChild className="primary-bg hover:bg-orange-600 text-white">
                  <Link href="/admin/blog/create">Create Your First Post</Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium text-slate-900 mb-1">{post.title}</div>
                        <div className="flex flex-wrap gap-1 items-center">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={post.status === 'published' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-amber-100 text-amber-800 border-amber-200'}>
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.author.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-2 text-slate-400" />
                        {format(new Date(post.date), 'EEEE do MMM')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        >
                          <span className="sr-only">View</span>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => router.push(`/admin/blog/edit/${post.slug}`)}
                        >
                          <span className="sr-only">Edit</span>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(post)}
                        >
                          <span className="sr-only">Delete</span>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {!isLoading && filteredPosts.length > postsPerPage && (
            <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200">
              <div className="text-sm text-slate-500">
                Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} posts
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous Page</span>
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next Page</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the post <span className="font-medium">"{postToDelete?.title}"</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="primary-bg hover:bg-orange-600 text-white">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
