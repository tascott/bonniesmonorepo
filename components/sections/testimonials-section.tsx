import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
	return (
		<section id="testimonials" className="py-24 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<Badge className="bg-rose-100 primary mb-4 px-3 py-1 text-sm rounded-full">
						Happy Clients
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">
						Happy Pups, Happy Parents: Bonnie's Dog Care Reviews
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					<Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
						<CardContent className="pt-8">
							<div className="flex flex-col items-center mb-6">
								<div className="text-center">
									<p className="font-bold text-slate-800 text-lg">
										Samantha & Bella
									</p>
									<p className="text-slate-500 text-sm">
										North London
									</p>
								</div>
							</div>

							<div className="flex justify-center mb-4">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-5 w-5 text-amber-400 fill-amber-400"
									/>
								))}
							</div>

							<p className="text-slate-600 text-center italic mb-6">
								&ldquo;My dog Bella absolutely loves going
								to Bonnies! The staff are amazing and she
								comes home happy and tired. I&apos;ve
								noticed such an improvement in her social
								skills with other dogs too.&rdquo;
							</p>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
						<CardContent className="pt-8">
							<div className="flex flex-col items-center mb-6">
								<div className="text-center">
									<p className="font-bold text-slate-800 text-lg">
										James & Max
									</p>
									<p className="text-slate-500 text-sm">
										Shenley
									</p>
								</div>
							</div>

							<div className="flex justify-center mb-4">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-5 w-5 text-amber-400 fill-amber-400"
									/>
								))}
							</div>

							<p className="text-slate-600 text-center italic mb-6">
								&ldquo;My dog Max gets so much exercise and
								stimulation at their fields. The staff truly care about each dog and mine is always so excited to see them! .&rdquo;
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}