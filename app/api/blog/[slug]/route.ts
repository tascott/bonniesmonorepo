import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET endpoint to fetch a single blog post by slug
export async function GET(
  request: Request,
  { params: paramsInput }: { params: { slug: string } | Promise<{ slug: string }> }
) {
  const params = await paramsInput;
  try {
    // Use AbortController to set a timeout for the query
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*') // We need all fields for the individual post view
        .eq('slug', params.slug)
        .abortSignal(controller.signal)
        .single();
      
      // Clear the timeout since the query completed
      clearTimeout(timeoutId);
      
      if (error) {
        throw error;
      }
      
      if (!data) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      
      // Create the response with the data
      const response = NextResponse.json(data);
      
      // Add cache headers for better performance - cache for 1 hour
      // Posts don't change frequently once published
      response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=600');
      
      return response;
    } catch (innerError) {
      // Clear the timeout to prevent memory leaks
      clearTimeout(timeoutId);
      throw innerError;
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    
    // Check for abort errors (timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 408 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT endpoint to update a blog post by slug
export async function PUT(
  request: Request,
  { params: paramsInput }: { params: { slug: string } | Promise<{ slug: string }> }
) {
  const params = await paramsInput;
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // If slug is being changed, check if the new slug already exists
    if (body.slug && body.slug !== params.slug) {
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('slug', body.slug)
        .single();
      
      if (existingPost) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const postData = {
      title: body.title,
      slug: body.slug || params.slug,
      excerpt: body.excerpt || '',
      content: body.content,
      author: body.author || '',
      author_name: body.author_name || '',
      cover_image: body.cover_image || '',
      tags: body.tags || [],
      status: body.status || 'draft',
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('slug', params.slug)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to delete a blog post by slug
export async function DELETE(
  request: Request,
  { params: paramsInput }: { params: { slug: string } | Promise<{ slug: string }> }
) {
  const params = await paramsInput;
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', params.slug);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
