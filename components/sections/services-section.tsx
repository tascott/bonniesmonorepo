import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PawPrint, Check } from 'lucide-react';
import { BackgroundElement } from '@/components/svg-components';
import Link from 'next/link';

export default function ServicesSection() {
	return (
		<section
			id="services"
			className="py-24 bg-white relative overflow-hidden"
		>
			<div className="absolute left-0 top-0 w-full">
				<BackgroundElement
					type="wave"
					className="w-full"
					fill="#FEF3C7"
				/>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center mb-16 mt-10">
					<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">
						Our Expert Dog Care Services in Hertfordshire
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
						<div className="h-3 bg-orange-400"></div>
						<CardHeader className="text-center pt-8">
							<div className="w-16 h-16 primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
								<PawPrint className="h-8 w-8 secondary" />
							</div>
							<Link href="/services#field-hire" className="inline-block">
								<CardTitle className="text-2xl font-display text-slate-800 hover:text-primary transition-colors cursor-pointer">
									Private Dog Field Hire
								</CardTitle>
							</Link>
							<p className="text-slate-500 px-2">
								Secure 8.5-acre private field hire for exclusive use. Perfect for reactive dogs, training, or undisturbed play in the Shenley area.
							</p>
							<div className="mt-4">
								<span className="text-2xl font-bold text-orange-500">
									From £50
								</span>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="aspect-video relative mb-6 overflow-hidden rounded-xl">
								<Image
									src="/images/dog3.jpeg?height=200&width=400"
									alt="Spacious private dog field for hire at Bonnie's near Shenley"
									fill
									className="object-cover"
								/>
							</div>
							<ul className="space-y-3">
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										8.5 Acre field
									</span>
								</li>
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										Parking on site
									</span>
								</li>
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										Varied terrain
									</span>
								</li>
							</ul>
						</CardContent>
					</Card>

					<Card className="shadow-xl rounded-3xl overflow-hidden">
						<div className="h-3 bg-rose-500"></div>
						<CardHeader className="text-center pt-8">
							<div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<PawPrint className="h-8 w-8 primary" />
							</div>
							<Link href="/services#day-care" className="inline-block">
								<CardTitle className="text-2xl font-display text-slate-800 hover:text-primary transition-colors cursor-pointer">
									Dog Day Care & Socialization Mornings
								</CardTitle>
							</Link>
							<p className="text-slate-500 px-2">
								Fun & supervised 2-hour dog day care sessions. Ideal for dog socialization in small, energy-matched groups. Includes pick-up/drop-off in Radlett, Mill Hill, and nearby.
							</p>
							<div className="mt-4">
								<span className="text-2xl font-bold text-orange-500">
									£27
								</span>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="aspect-video relative mb-6 overflow-hidden rounded-xl">
								<Image
									src="/images/dog9.JPG?height=200&width=400"
									alt="Dog enjoying agility and play during Bonnie's day care socialization morning"
									fill
									className="object-cover"
								/>
							</div>
							<ul className="space-y-3">
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										Social play with dogs of their own
										energy levels
									</span>
								</li>
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										Using all their senses
									</span>
								</li>
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										Free pick up & drop off in our service areas
									</span>
								</li>
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										Dogs matched by size and energy
									</span>
								</li>
							</ul>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
						<div className="h-3 bg-orange-400"></div>
						<CardHeader className="text-center pt-8">
							<div className="w-16 h-16 primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
								<PawPrint className="h-8 w-8 secondary" />
							</div>
							<Link href="/services#training" className="inline-block">
								<CardTitle className="text-2xl font-display text-slate-800 hover:text-primary transition-colors cursor-pointer">
									1-on-1 Dog Training & Behavior
								</CardTitle>
							</Link>
							<p className="text-slate-500 px-2">
								Expert 1-on-1 dog training tailored to your dog's specific needs. Addressing behavioral issues, obedience, or puppy basics in Stanmore, Borehamwood, and across our Hertfordshire service areas.
							</p>
							<div className="mt-4">
								<span className="text-2xl font-bold text-orange-500">
									From £75
								</span>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="aspect-video relative mb-6 overflow-hidden rounded-xl">
								<Image
									src="/images/dog5.jpeg?height=200&width=400"
									alt="Focused 1-on-1 dog training session at Bonnie's in Hertfordshire"
									fill
									className="object-cover"
								/>
							</div>
							<ul className="space-y-3">
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										All sessions on private grounds
									</span>
								</li>
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										Discounts for multiple dogs
									</span>
								</li>
								<li className="flex items-start">
									<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
										<Check className="h-4 w-4 secondary" />
									</div>
									<span className="text-slate-700">
										Free pick up & drop off
									</span>
								</li>
							</ul>
						</CardContent>
					</Card>
				</div> {/* End of grid */}
			</div>
		</section>
	);
}