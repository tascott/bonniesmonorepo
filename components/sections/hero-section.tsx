import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { WhatsAppIcon } from '@/components/svg-components/whatsapp-icon';


export default function HeroSection() {
	return (
		<section className="relative overflow-hidden pt-12 pb-24 text-white">
			<div className="absolute top-0 left-0 w-full h-full z-0">
				{/* Mobile/Portrait Video */}
				<video
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover block md:hidden"
					src="/images/portrait.mp4"
				/>
				{/* Desktop/Landscape Video */}
				<video
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover hidden md:block"
					src="/images/vid.mp4"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/[.65] to-black md:from-black/[.65] md:to-black/[.65]"></div>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="flex flex-col md:flex-row items-center gap-12">
					<div className="md:w-1/2">
						<Badge className="primary-bg mb-4 px-3 py-1 text-sm rounded-full white">
							North London, Hertfordshire and St Albans
						</Badge>
						<h1 className="text-2xl md:text-5xl font-semibold mb-6">
							Secure walks in nature, created just for dogs
						</h1>
						<h3 className="text-xl font-semibold mb-4 font-display">Long dog walks, training and play sessions in Shenley</h3>
						<p className="mb-6 text-lg leading-relaxed">
						Experience peace of mind when your dogs are at Bonnie’s. We offer 2 hour dog walks in our nearly 10 acre fully fenced private dog park. Pick up and drop off in North London and Hertfordshire.
						</p>
						<div className="flex flex-wrap gap-4 mb-8">
							<div className="flex items-center">
								<div className="primary-bg p-2 rounded-full mr-3">
									<Check className="h-5 w-5 secondary" />
								</div>
								<span>
									Free pickup
								</span>
							</div>
							<div className="flex items-center">
								<div className="primary-bg p-2 rounded-full mr-3">
									<Check className="h-5 w-5 secondary" />
								</div>
								<span>
									Canine first aid trained
								</span>
							</div>
							<div className="flex items-center">
								<div className="primary-bg p-2 rounded-full mr-3">
									<Check className="h-5 w-5 secondary" />
								</div>
								<span>
									Fenced and secure site
								</span>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<Button asChild>
								<Link href="https://wa.me/447577449045" passHref legacyBehavior>
									<a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-all bg-[#25D366] hover:bg-[#20BA5C] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl"><WhatsAppIcon className="w-6 h-6" /> Message us on WhatsApp</a>
								</Link>
							</Button>
							<Button asChild>
								<Link href="#contact" passHref legacyBehavior>
									<a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-all primary-bg hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl">Contact Us To Book</a>
								</Link>
							</Button>
						</div>
					</div>
					{/* <div className="md:w-1/2 relative">
						<div className="relative">
							<div className="absolute -top-6 -left-6 w-full h-full bg-rose-400 rounded-3xl transform rotate-3"></div>
							<div className="absolute -bottom-6 -right-6 w-full h-full bg-orange-400 rounded-3xl transform -rotate-3"></div>
							<div className="relative bg-white rounded-3xl p-6 shadow-xl overflow-hidden">
								<Image
									src="/images/dog14.JPG?height=400&width=500"
									alt="Happy dogs enjoying Bonnie's secure private dog field in Hertfordshire"
									width={500}
									height={400}
									priority
									className="rounded-2xl mx-auto"
								/>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</section>
	);
}