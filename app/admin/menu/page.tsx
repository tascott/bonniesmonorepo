'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminMenuPage() {
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function checkSession() {
      try {
        // Direct session check
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setError(error.message);
          return;
        }
        
        setSession(data.session);
        
        // Log session info to console
        console.log('Session on admin menu page:', 
          data.session ? 'Active session with user: ' + data.session.user.email : 'No session'
        );
      } catch (err) {
        console.error('Error checking session:', err);
        setError('Failed to check authentication status');
      }
    }
    
    checkSession();
  }, []);
  
  // Force a hard reload to the blog page
  const goToBlog = () => {
    window.location.href = '/admin/blog';
  };

  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              {error}
            </div>
          ) : session ? (
            <>
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 font-medium">
                  Logged in as: {session.user.email}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  User ID: {session.user.id}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={goToBlog}
                  size="lg" 
                  className="h-24 text-lg"
                >
                  Go to Blog Management
                </Button>
                
                <Link href="/admin/blog/create" passHref>
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="h-24 text-lg w-full"
                  >
                    Create New Blog Post
                  </Button>
                </Link>
                
                <Link href="/blog" passHref>
                  <Button 
                    variant="secondary"
                    size="lg" 
                    className="h-24 text-lg w-full"
                  >
                    View Public Blog
                  </Button>
                </Link>
                
                <Link href="/auth-test" passHref>
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="h-24 text-lg w-full"
                  >
                    Auth Test Page
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex justify-center p-8">
              <p>Loading authentication status...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
