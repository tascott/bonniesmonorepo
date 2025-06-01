// Placeholder for blog data fetching functions
// Replace this with your actual Supabase client and queries

export interface BlogPostCore {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image?: string;
  created_at: string; // ISO date string
  updated_at?: string; // ISO date string
  author_name?: string;
  author_id?: string;
  tags?: string[];
  status?: 'published' | 'draft' | 'archived';
  content?: string; // Full HTML or Markdown content
}

export interface BlogPostFull extends BlogPostCore {
  // Add any additional fields for a full blog post view
  relatedPosts?: Pick<BlogPostCore, 'slug' | 'title'>[];
  faq?: { question: string; answer: string }[];
}

const MOCK_POSTS: BlogPostFull[] = [
  {
    id: '1',
    slug: 'first-sample-post',
    title: 'My First Amazing Blog Post',
    excerpt: 'This is a short summary of what this fantastic blog post is all about. It will grab your attention!',
    cover_image: 'https://source.unsplash.com/random/800x600?nature,water',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    author_name: 'Jane Doe',
    tags: ['sample', 'nextjs', 'seo'],
    status: 'published',
    content: '<p>This is the full content of the first sample post. It can contain <strong>HTML</strong> or <em>Markdown</em> that gets rendered.</p><h2>A Subheading</h2><p>More details here...</p>',
    relatedPosts: [
      { slug: 'second-sample-post', title: 'The Second Post You Should Read' }
    ],
    faq: [
      { question: 'What is this post about?', answer: 'It is about Next.js and SEO.' },
      { question: 'Who wrote this?', answer: 'Jane Doe did.' }
    ]
  },
  {
    id: '2',
    slug: 'second-sample-post',
    title: 'The Second Post You Should Read',
    excerpt: 'Discover even more insights in this follow-up article. It builds upon the first one.',
    cover_image: 'https://source.unsplash.com/random/800x600?city,technology',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    author_name: 'John Smith',
    tags: ['update', 'tutorial', 'performance'],
    status: 'published',
    content: '<p>Welcome to the second post. We dive deeper here.</p>'
  },
  {
    id: '3',
    slug: 'a-draft-post',
    title: 'This is a Draft Post (Not Published)',
    excerpt: 'This post is currently a draft and should not appear on the public blog.',
    created_at: new Date().toISOString(),
    author_name: 'Admin',
    tags: ['drafting'],
    status: 'draft',
    content: '<p>Working on this content...</p>'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches all blog posts, optionally filtered by status.
 * In a real app, this would query Supabase.
 */
export async function getAllBlogPosts(status?: 'published' | 'draft'): Promise<BlogPostCore[]> {
  await delay(500); // Simulate network delay
  if (status) {
    return MOCK_POSTS.filter(post => post.status === status).map(({ content, relatedPosts, faq, ...corePost }) => corePost);
  }
  return MOCK_POSTS.map(({ content, relatedPosts, faq, ...corePost }) => corePost);
}

/**
 * Fetches a single blog post by its slug.
 * In a real app, this would query Supabase.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  // Construct the absolute URL for the API endpoint
  // Ensure NEXT_PUBLIC_SITE_URL is set in your environment for server-side fetches
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; 
  const apiUrl = `${siteUrl}/api/blog/${slug}`;

  try {
    const response = await fetch(apiUrl, { cache: 'no-store' }); // Fetch fresh data

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Post not found
      }
      // For other errors, log them and return null or throw, depending on desired handling
      console.error(`API error fetching ${slug}: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error('Error body:', errorBody);
      return null;
    }

    const post: BlogPostFull = await response.json();
    // Ensure the fetched post is considered 'published' if your API doesn't filter by status
    // Or, trust the API to only return published posts if it's designed that way.
    // For now, we'll assume the API returns the post if it's accessible.
    return post;
  } catch (error) {
    console.error(`Failed to fetch blog post ${slug} from API:`, error);
    return null;
  }
}

/**
 * Fetches blog posts with pagination.
 * In a real app, this would query Supabase with limit and offset.
 */
export async function getPaginatedBlogPosts(
  page: number = 1,
  limit: number = 9,
  status: 'published' | 'draft' = 'published'
): Promise<{ posts: BlogPostCore[]; totalPosts: number; totalPages: number }> {
  await delay(500);
  const filteredPosts = MOCK_POSTS.filter(post => post.status === status);
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const offset = (page - 1) * limit;
  const paginatedPosts = filteredPosts.slice(offset, offset + limit).map(({ content, relatedPosts, faq, ...corePost }) => corePost);

  return {
    posts: paginatedPosts,
    totalPosts,
    totalPages,
  };
}
