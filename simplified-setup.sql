-- Step 1: First just focus on creating the table and disabling RLS
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Step 2: Disable RLS on user_roles
ALTER TABLE user_roles DISABLE ROW LEVEL SECURITY;

-- Step 3: Disable RLS on blog_posts to allow all operations for now
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
