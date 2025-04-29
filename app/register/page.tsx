'use client';

import type React from 'react';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PawPrint, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signup, updateUserProfile } = useAuth();
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(email, password);
			await updateUserProfile(name);
			router.push('/');
		} catch (error: any) {
			if (error.code === 'auth/email-already-in-use') {
				setError('An account with this email already exists');
			} else {
				setError('Failed to create an account. Please try again.');
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<Link href="/" className="inline-flex items-center justify-center">
						<div className="primary-bg text-white p-2 rounded-full">
							<PawPrint className="h-6 w-6" />
						</div>
						<span className="text-2xl font-bold text-slate-800 ml-2 font-display">Bonnies</span>
					</Link>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Create an Account</CardTitle>
						<CardDescription className="text-center">Sign up to book services for your furry friend</CardDescription>
					</CardHeader>
					<CardContent>
						{error && (
							<Alert variant="destructive" className="mb-4">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<form onSubmit={handleSubmit}>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="name">Full Name</Label>
									<Input
										id="name"
										type="text"
										placeholder="John Doe"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="name@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										minLength={6}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="confirm-password">Confirm Password</Label>
									<Input
										id="confirm-password"
										type="password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
									/>
								</div>
								<Button type="submit" className="primary-bg hover:bg-orange-600 text-white w-full" disabled={loading}>
									{loading ? 'Creating account...' : 'Create Account'}
								</Button>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex justify-center">
						<p className="text-sm text-slate-600">
							Already have an account?{' '}
							<Link href="/login" className="secondary hover:text-orange-600 font-medium">
								Sign in
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
