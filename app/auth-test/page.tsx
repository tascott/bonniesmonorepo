'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AuthTestPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const { toast } = useToast();

  // Check current session
  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    setSessionData({ data, error });
    
    if (error) {
      toast({
        title: 'Session Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
  
  // Sign in directly with Supabase
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: 'Authentication Error',
          description: error.message,
          variant: 'destructive',
          duration: 5000,
        });
        console.error('Login error:', error);
        setSessionData({ error });
      } else {
        toast({
          title: 'Success!',
          description: 'Authentication successful',
          duration: 3000,
        });
        setSessionData({ data });
        
        // Check if user has admin role
        if (data.user) {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', data.user.id);
          
          console.log('User role data:', roleData, roleError);
          
          if (roleData && roleData.length > 0) {
            toast({
              title: 'Role Check',
              description: `User has role: ${roleData[0].role}`,
              duration: 3000,
            });
          }
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Unexpected Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
        duration: 5000,
      });
      setSessionData({ error });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sign out
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: 'Sign Out Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed Out',
        description: 'Successfully signed out',
      });
      setSessionData(null);
    }
  };

  return (
    <div className="container py-8">
      <Card className="w-full max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle>Authentication Test</CardTitle>
          <CardDescription>Test direct Supabase authentication</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <div className="flex gap-2 w-full">
              <Button type="button" variant="outline" onClick={checkSession} className="flex-1">
                Check Session
              </Button>
              <Button type="button" variant="outline" onClick={handleSignOut} className="flex-1">
                Sign Out
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
      
      {sessionData && (
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Session Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-100 p-4 rounded text-xs overflow-auto max-h-[400px]">
              {JSON.stringify(sessionData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
