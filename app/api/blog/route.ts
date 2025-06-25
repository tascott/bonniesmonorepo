import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const createClient = (request: NextRequest) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // request.cookies is read-only, so we can't set cookies here.
        },
        remove(name: string, options: CookieOptions) {
          // request.cookies is read-only.
        },
      },
    }
  );
};

async function isAuthenticated(request: NextRequest) {
  try {
    const supabaseAuth = createClient(request);
    const { data: { session } } = await supabaseAuth.auth.getSession();
    console.log('API auth check - Session found:', !!session);
    return true; // TEMPORARY
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const supabase = createClient(request);
  
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || undefined;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  try {
    let query = supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, created_at, updated_at, author_name, cover_image, tags, status', { count: 'exact' });
    
    if (search) {
      query = query.or(`title.ilike.%${search}%, excerpt.ilike.%${search}%`);
    }
    
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    
    const response = NextResponse.json({
      posts: data,
      count,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    });
    
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    return response;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(request);
    const body = await request.json();
    
    if (!body.title || !body.content || !body.slug) {
      return NextResponse.json({ error: 'Title, content, and slug are required' }, { status: 400 });
    }

    const { data: existingPosts, error: existingPostError } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('slug', body.slug);
    
    if (existingPostError) throw existingPostError;
    
    if (existingPosts && existingPosts.length > 0) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
    }

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
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API: Error creating blog post', error);
    return NextResponse.json({ error: 'Failed to create blog post', details: error.message }, { status: 500 });
  }
}
