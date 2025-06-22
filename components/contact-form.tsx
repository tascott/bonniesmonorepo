'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const formData = new FormData(event.currentTarget);
			formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY!);
			formData.append('subject', 'New Contact Form Submission - Bonnies');

			const object = Object.fromEntries(formData);
			const json = JSON.stringify(object);

			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: json,
			});

			const result = await response.json();
			if (result.success) {
				event.currentTarget.reset();
				setIsSuccess(true);
			} else {
				throw new Error('Failed to submit form');
			}
		} catch (error) {
			setError('Failed to send message. Please try again. Alternatively, email or call us');
		} finally {
			setIsSubmitting(false);
		}
	}

	if (isSuccess) {
		return (
			<div className="text-center p-8 bg-green-50 rounded-lg">
				<h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
				<p className="text-green-600">Thank you for your message. We&apos;ll get back to you as soon as possible.</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<Label htmlFor="name">Name</Label>
					<Input
						required
						id="name"
						name="name"
						type="text"
						className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
						placeholder="Your name"
					/>
				</div>

				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						required
						id="email"
						name="email"
						type="email"
						className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
						placeholder="your.email@example.com"
					/>
				</div>

				<div>
					<Label htmlFor="phone">Phone</Label>
					<Input
						required
						id="phone"
						name="phone"
						type="tel"
						className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
						placeholder="Your phone number"
					/>
				</div>

				<div>
					<Label htmlFor="message">Message</Label>
					<Textarea
						required
						id="message"
						name="message"
						className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
						rows={4}
						placeholder="Your message"
					/>
				</div>

				<Button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full cursor-pointer">
					{isSubmitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Sending...
						</>
					) : (
						'Send Message'
					)}
				</Button>
			</form>
			{error && <div className="p-4 bg-red-50 text-red-600 rounded-lg mt-4">{error}</div>}
		</div>
	);
}
