-- Create user_roles table to store role information
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create RLS policies for the user_roles table
-- Enable RLS on the table
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Allow admins to read all roles
CREATE POLICY "Admins can read all roles" 
  ON user_roles FOR SELECT 
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );

-- Allow users to read their own roles
CREATE POLICY "Users can read own role" 
  ON user_roles FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow admins to insert new roles
CREATE POLICY "Admins can insert roles" 
  ON user_roles FOR INSERT 
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );

-- Allow admins to update roles
CREATE POLICY "Admins can update roles" 
  ON user_roles FOR UPDATE 
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );

-- Allow admins to delete roles
CREATE POLICY "Admins can delete roles" 
  ON user_roles FOR DELETE 
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );

-- Create RLS policies for the blog_posts table
-- Enable RLS on the table (assuming it exists)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published posts" 
  ON blog_posts FOR SELECT 
  USING (status = 'published');

-- Admins can read all posts
CREATE POLICY "Admins can read all posts" 
  ON blog_posts FOR SELECT 
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );

-- Admins can insert posts
CREATE POLICY "Admins can insert posts" 
  ON blog_posts FOR INSERT 
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );

-- Admins can update posts
CREATE POLICY "Admins can update posts" 
  ON blog_posts FOR UPDATE 
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );

-- Admins can delete posts
CREATE POLICY "Admins can delete posts" 
  ON blog_posts FOR DELETE 
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );
