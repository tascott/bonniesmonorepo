# Bonnies Blog Management System

This is a full-featured blog management system built with Next.js and Supabase. It provides a simple yet powerful interface for creating, editing, and publishing blog posts.

## Getting Started

First, make sure you have the necessary environment variables set up in your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Setup

### Setting Up Authentication

To properly set up the admin authentication system:

1. Create a Supabase account and project at [supabase.com](https://supabase.com)
2. Enable Email/Password authentication in the Authentication > Providers section
3. Create an admin user through the Supabase Auth interface or using the sign-up API
4. Execute the SQL in `setup-admin-auth.sql` file in the Supabase SQL Editor to create necessary tables and policies
5. Manually insert an admin role for your user (replace the UUID with your actual user ID):

```sql
INSERT INTO user_roles (user_id, role) 
VALUES ('your-user-uuid-here', 'admin');
```

### Authentication Troubleshooting

If you encounter issues with admin authentication:

1. Check that you've run the `setup-admin-auth.sql` script in your Supabase project
2. Verify that your user account has been assigned the 'admin' role in the `user_roles` table
3. Ensure your `.env.local` contains the correct Supabase URL and anon key
4. Clear your browser cookies and cache if you're experiencing persistent login issues

## Blog Writer's Guide

### Admin Authentication

The blog system now uses Supabase authentication to protect the admin interface:

1. You'll need to set up an admin account in Supabase first (see Admin Setup section below)
2. Sign in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
3. Only authenticated admin users can create, edit, or delete blog posts

### Accessing the Admin Interface

As a blog writer with admin privileges, you'll work primarily with the admin interface:

1. Sign in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Navigate to [http://localhost:3000/admin/blog](http://localhost:3000/admin/blog) to access the blog management dashboard
3. From here, you can view, create, edit, and delete blog posts

### Creating a New Blog Post

1. Click the "Create New Post" button on the admin dashboard
2. Fill in the following fields:
   - **Title:** The headline of your blog post
   - **Slug:** Auto-generated from the title, but can be customized (used in the URL)
   - **Excerpt:** A brief summary that appears on the blog listing page
   - **Content:** The main content of your post (supports HTML formatting)
   - **Status:** "Draft" (not visible to readers) or "Published" (visible on the blog)
   - **Tags:** Keywords related to your post (add multiple by typing and pressing Enter)
   - **Cover Image:** Upload an image to display at the top of your post (recommended size: 1200×630 pixels)
   - **Author:** Your name or pseudonym
3. Click "Save Post" when you're done

### Editing an Existing Post

1. From the admin dashboard, find the post you want to edit
2. Click the edit (pencil) icon
3. Make your changes in the edit form
4. Click "Update Post" to save your changes

### Publishing Your Posts

1. When creating or editing a post, select "Published" from the Status dropdown
2. Only posts with "Published" status will appear on the public blog page
3. You can save posts as "Draft" while working on them, then publish when ready

### Viewing Your Published Blog

- Navigate to [http://localhost:3000/blog](http://localhost:3000/blog) to see the public-facing blog

### Troubleshooting

**Blank Blog Page**: If your blog page appears blank with just the title "Bonnies Blog", this means you haven't published any posts yet. Go to the admin interface, create a post, and set its status to "Published".

**Images Not Displaying**: The current implementation handles image previews in the admin interface, but for production use, you should implement Supabase Storage for permanent image hosting.

## Technical Information

This project is built with:

- [Next.js](https://nextjs.org) - React framework for server-rendered applications
- [Supabase](https://supabase.io) - Backend-as-a-Service for database functionality
- [shadcn/ui](https://ui.shadcn.com) - UI component library

The blog system features full CRUD capabilities:
- **Create:** Add new blog posts via the admin interface
- **Read:** View posts on the public blog and in the admin interface
- **Update:** Edit existing posts via the admin interface
- **Delete:** Remove posts from the database

## Development Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Deployment

For production deployment, we recommend using [Vercel](https://vercel.com) for hosting the Next.js application and continuing to use Supabase for backend services.
