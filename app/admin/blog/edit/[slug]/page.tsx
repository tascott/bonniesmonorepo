'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PawPrint, Save, X, Upload, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

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

import * as React from 'react';

export default function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: routeSlug } = React.use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [originalSlug, setOriginalSlug] = useState('');
  
  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('draft');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [authorName, setAuthorName] = useState('');

  // Fetch the blog post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blog/${routeSlug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setNotFound(true);
          }
          throw new Error('Failed to fetch blog post');
        }
        
        const post = await response.json();
        
        // Set form state with the fetched data
        setTitle(post.title || '');
        setSlug(post.slug === routeSlug ? '' : post.slug);
        setOriginalSlug(post.slug || '');
        setExcerpt(post.excerpt || '');
        setContent(post.content || '');
        setStatus(post.status || 'draft');
        setTags(post.tags || []);
        setCoverImagePreview(post.cover_image || '');
        setAuthorName(post.author_name || '');
        
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast({
          title: "Error",
          description: "Failed to load the blog post. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [routeSlug, toast]);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Only auto-generate slug if it hasn't been manually edited or if it's empty
    if (slug === originalSlug || slug === '') {
      // Generate slug
      const newSlug = newTitle
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      setSlug(newSlug);
    }
  };

  // Handle adding a tag
  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Handle tag input key press (add tag on Enter)
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle cover image selection
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!title || !slug || !content) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Prepare the blog post data
      const blogPost = {
        title,
        slug,
        excerpt,
        content,
        author_name: authorName,
        status,
        tags,
        cover_image: coverImagePreview,
      };
      
      // Send the data to our API
      const response = await fetch(`/api/blog/${originalSlug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPost),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update blog post');
      }
      
      // Show success message
      toast({
        title: "Success!",
        description: `Blog post "${title}" has been updated.`,
      });
      
      // Redirect to the admin page
      router.push('/admin/blog');
      
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'There was an error updating your blog post.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 flex items-center justify-center">
        <div className="animate-pulse text-xl text-slate-400">Loading post...</div>
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
          <p className="text-slate-600 mb-8">The blog post you're trying to edit doesn't exist or may have been removed.</p>
          <Button asChild variant="outline">
            <Link href="/admin/blog" className="flex items-center">
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
        <Button asChild variant="outline" className="mb-8">
          <Link href="/admin/blog" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Posts
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="primary-bg text-white p-2 rounded-full mr-3">
            <PawPrint className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">
            Edit Blog Post
          </h1>
        </div>

        {/* Blog Post Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter post title"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                    required
                  />
                  <p className="text-xs text-slate-500">
                    This will be used in the URL: /blog/{slug}
                  </p>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea 
                    id="excerpt" 
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief summary of the post"
                    className="h-20"
                  />
                  <p className="text-xs text-slate-500">
                    A short summary that appears in blog listings
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here..."
                    className="h-80 font-mono text-sm"
                    required
                  />
                  <p className="text-xs text-slate-500">
                    Supports HTML formatting for rich content
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={status} 
                    onValueChange={(value: string) => setStatus(value as 'published' | 'draft')}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="tags" 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      placeholder="Add a tag"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={handleAddTag}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map(tag => (
                        <Badge key={tag} variant="outline" className="flex items-center gap-1">
                          {tag}
                          <button 
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center">
                    {coverImagePreview ? (
                      <div className="space-y-3">
                        <div className="relative h-40 w-full rounded overflow-hidden">
                          <img 
                            src={coverImagePreview} 
                            alt="Cover preview" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setCoverImagePreview('');
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 mb-2">
                          Drag and drop an image or click to browse
                        </p>
                        <Button type="button" variant="outline" size="sm" asChild>
                          <label>
                            <input 
                              type="file"
                              id="coverImage"
                              accept="image/*"
                              onChange={handleCoverImageChange}
                              className="sr-only"
                            />
                            Select Image
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Recommended size: 1200×630 pixels (16:9 ratio)
                  </p>
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Enter author name"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/admin/blog')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="primary-bg hover:bg-orange-600"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Update Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
