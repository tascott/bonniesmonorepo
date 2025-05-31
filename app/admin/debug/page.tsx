'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function DebugPage() {
  const { user, session, isAdmin } = useAuth();
  const [sessionState, setSessionState] = useState<any>(null);
  const [userRole, setUserRole] = useState<any>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Check session directly
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSessionState(data);
      
      if (data.session?.user) {
        // Check user role directly
        try {
          const { data: roleData, error } = await supabase
            .from('user_roles')
            .select('*')
            .eq('user_id', data.session.user.id);
          
          setUserRole({ data: roleData, error });
        } catch (error) {
          setUserRole({ error });
        }
      }
    };
    
    checkSession();
  }, []);
  
  const forceRedirect = () => {
    router.push('/admin/blog');
  };

  const resetSession = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error',
        description: 'Could not sign out: ' + error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Signed out successfully',
      });
      router.refresh();
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Authentication Debug</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={resetSession}>
            Reset Session
          </Button>
          <Button onClick={forceRedirect}>
            Force Redirect to Admin Blog
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Auth Provider State:</h2>
          <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-[300px]">
            {JSON.stringify({ user, session, isAdmin }, null, 2)}
          </pre>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Direct Session Check:</h2>
          <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-[300px]">
            {JSON.stringify(sessionState, null, 2)}
          </pre>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">User Role Check:</h2>
          <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-[300px]">
            {JSON.stringify(userRole, null, 2)}
          </pre>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Local Storage:</h2>
          <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-[300px]">
            {typeof window !== 'undefined' ? JSON.stringify(
              Object.keys(localStorage).reduce((obj, key) => {
                if (key.startsWith('sb-')) {
                  // @ts-ignore
                  obj[key] = localStorage.getItem(key);
                }
                return obj;
              }, {}),
              null,
              2
            ) : 'Loading...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
