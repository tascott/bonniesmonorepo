import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

// Helper to check if user is authenticated
async function isAuthenticated(req: Request) {
  try {
    // Create a Supabase client with the request cookies
    const cookieStore = cookies();
    const supabaseAuth = createServerComponentClient({ cookies: () => cookieStore });
    
    // Check if user is authenticated
    const { data: { session } } = await supabaseAuth.auth.getSession();
    
    // Log the session for debugging
    console.log('API auth check - Session found:', !!session);
    
    // TEMPORARY: Return true to bypass auth check during development
    // TODO: Remove this and use proper session check in production
    return true;
    
    // Normal operation would be:
    // return !!session;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}

// GET endpoint to fetch all blog posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Create the server-side Supabase client
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  // Parse query parameters
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || undefined;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  try {
    console.log('[API] Fetching blog posts with params:', { page, limit, search, status, from, to });
let query = supabase
  .from('blog_posts')
  .select('*', { count: 'exact' });
    
    // Add filters if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%, excerpt.ilike.%${search}%`);
    }
    
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    // Add pagination
    const { data, count, error } = await query
  .order('created_at', { ascending: false })
  .range(from, to);
console.log('[API] Supabase returned:', { data, count, error });
    
    if (error) {
      throw error;
    }
    
    console.log('[API] Returning posts to client:', { posts: data });
return NextResponse.json({
  posts: data,
  count,
  page,
  totalPages: Math.ceil((count || 0) / limit)
});
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new blog post
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.content || !body.slug) {
      console.error('API: Missing required fields', body);
      return NextResponse.json(
        { error: 'Title, content, and slug are required', details: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existingPosts, error: existingPostError } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('slug', body.slug);
    
    if (existingPostError) {
      console.error('API: Error checking for existing post', existingPostError);
      return NextResponse.json(
        { error: 'Failed to check for existing post', details: existingPostError instanceof Error ? existingPostError.message : String(existingPostError) },
        { status: 500 }
      );
    }
    
    if (existingPosts && existingPosts.length > 0) {
      return NextResponse.json(
        { error: 'A post with this slug already exists', details: 'Please choose a unique slug' },
        { status: 400 }
      );
    }

    // Get the authenticated user (if any)
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    const postData = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || '',
      content: body.content,
      author: user?.id || '',
      author_name: user?.email || '',
      cover_image: body.cover_image || '',
      tags: body.tags || [],
      status: body.status || 'draft',
    };
    
    // User is authenticated as admin, so we can use the standard client
    // RLS policies should allow admins to insert
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single();
    
    if (error) {
      console.error('API: Error creating blog post', error);
      return NextResponse.json(
        { error: 'Failed to create blog post', details: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
    
    console.log('API: Blog post created successfully', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API: Error creating blog post', error);
    return NextResponse.json(
      { error: 'Failed to create blog post', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
