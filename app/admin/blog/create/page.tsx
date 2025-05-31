'use client';

import { useState } from 'react';
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

export default function CreateBlogPostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [authorName, setAuthorName] = useState('Your Name');

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Generate slug
    const newSlug = newTitle
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setSlug(newSlug);
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
      setCoverImage(file);
      
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
      let cover_image_url = '';
      
      // TODO: In a production implementation, we would upload the cover image to Supabase Storage
      // For now, we'll use the preview URL if available
      if (coverImagePreview) {
        cover_image_url = coverImagePreview;
      }
      
      // Create the blog post object
      const blogPost = {
        title,
        slug,
        excerpt,
        content,
        author_name: authorName,
        status,
        tags,
        cover_image: cover_image_url,
      };
      
      // Send the data to our API
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPost),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create blog post');
      }
      
      // Show success message with persistent duration
      toast({
        title: "Success!",
        description: `Blog post "${title}" has been created.`,
        duration: 5000, // Show for 5 seconds
      });
      
      // Only redirect to the admin page after successful creation
      setTimeout(() => {
        router.push('/admin/blog');
      }, 1000); // Small delay to ensure toast is seen
      
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast({
        title: "Error Creating Post",
        description: error instanceof Error ? error.message : 'There was an error creating your blog post. This might be due to permissions or configuration issues.',
        variant: "destructive",
        duration: 7000, // Show longer for errors
      });
      
      // Form is NOT cleared on error - user can fix and retry
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Create New Blog Post
          </h1>
        </div>

        {/* Blog Post Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Content (2/3 width) */}
              <div className="md:col-span-2 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    placeholder="post-url-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    required
                  />
                  <p className="text-sm text-slate-500">
                    The URL will be: yourdomain.com/blog/{slug}
                  </p>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary of the post (appears in listings)"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    required
                    className="resize-none"
                    rows={3}
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <div className="border rounded-md">
                    {/* This would be replaced with a rich text editor in a production app */}
                    <Textarea
                      id="content"
                      placeholder="Write your blog post content here... (supports HTML formatting)"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      className="min-h-[400px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <p className="text-sm text-slate-500">
                    You can use HTML tags for formatting. In a real implementation, this would be a rich text editor.
                  </p>
                </div>
              </div>

              {/* Sidebar (1/3 width) */}
              <div className="space-y-6">
                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex">
                    <Input
                      id="tags"
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyPress}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddTag}
                      variant="outline"
                      className="rounded-l-none border-l-0"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add Tag</span>
                    </Button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 flex items-center">
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-rose-800"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {tag}</span>
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
                            setCoverImage(null);
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
                className="primary-bg hover:bg-orange-600 text-white"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
