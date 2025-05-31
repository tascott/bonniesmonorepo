import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET endpoint to fetch a single blog post by slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', params.slug)
      .single();
    
    if (error) {
      throw error;
    }
    
    if (!data) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT endpoint to update a blog post by slug
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
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
  { params }: { params: { slug: string } }
) {
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
