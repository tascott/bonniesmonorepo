"use client"

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from './auth-provider';

export function AuthButtons() {
  const { user, isAdmin, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Helper function to manually navigate to admin dashboard
  const goToAdminBlog = () => {
    router.push('/admin/blog');
  };

  // If no user is logged in, show login button
  if (!user) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push('/admin/login')}
      >
        Log In
      </Button>
    );
  }

  // User is logged in, show user info and buttons
  return (
    <div className="flex items-center gap-2">
      {isAdmin && (
        <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded text-xs">
          Admin
        </span>
      )}
      <span className="text-sm text-slate-600 hidden md:inline-block">
        {user.email}
      </span>
      <Button 
        onClick={goToAdminBlog}
        variant="outline" 
        size="sm"
        className="text-slate-600"
      >
        Dashboard
      </Button>
      <Button 
        onClick={handleSignOut}
        variant="ghost" 
        size="sm"
        className="text-slate-600"
      >
        <LogOut className="h-4 w-4 mr-1" />
        Sign Out
      </Button>
    </div>
  );
}
