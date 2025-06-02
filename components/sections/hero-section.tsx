import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { BackgroundElement } from '@/components/svg-components';

export default function HeroSection() {
	return (
		<section className="relative bg-gradient-to-b from-amber-50 to-white overflow-hidden pt-12 pb-24">
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden">
				<BackgroundElement
					type="paws"
					className="absolute top-10 left-10 opacity-10"
					fill="#F97316"
				/>
				<BackgroundElement
					type="paws"
					className="absolute bottom-10 right-10 opacity-10"
					fill="#84CC16"
				/>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="flex flex-col md:flex-row items-center gap-12">
					<div className="md:w-1/2">
						<Badge className="primary-bg mb-4 px-3 py-1 text-sm rounded-full white">
							North London, Hertfordshire and St Albans
						</Badge>
						<h1 className="text-4xl md:text-4xl lg:text-6xl font-bold text-slate-800 mb-4 font-display leading-tight">
							Bonnie's: Dog Day Care & Private Fields in Shenley, Radlett & Hertfordshire
						</h1>
						<h2 className="text-2xl md:text-3xl text-orange-600 font-semibold mb-6">
							Give Them Their Own Field Trip!
						</h2>
						<p className="text-slate-600 mb-6 text-lg leading-relaxed">
							Experience peace of mind with Bonnie's premier dog day care. We offer door-to-door pick-ups for exciting free-roam sessions in our secure private fields, plus expert 1-on-1 training. Serving Shenley, Radlett, Mill Hill, and across Hertfordshire. <Link href='/about' className='text-primary hover:text-orange-600 underline font-medium'>Learn more about our commitment to happy, healthy dogs</Link>.
						</p>
						<div className="flex flex-wrap gap-4 mb-8">
							<div className="flex items-center">
								<div className="primary-bg p-2 rounded-full mr-3">
									<Check className="h-5 w-5 secondary" />
								</div>
								<span className="text-slate-700">
									Free pickup
								</span>
							</div>
							<div className="flex items-center">
								<div className="primary-bg p-2 rounded-full mr-3">
									<Check className="h-5 w-5 secondary" />
								</div>
								<span className="text-slate-700">
									Canine first aid trained
								</span>
							</div>
							<div className="flex items-center">
								<div className="primary-bg p-2 rounded-full mr-3">
									<Check className="h-5 w-5 secondary" />
								</div>
								<span className="text-slate-700">
									Fenced and secure site
								</span>
							</div>
						</div>
						<Button
							asChild
							className="primary-bg hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
						>
							<Link href="#contact">Contact Us To Book</Link>
						</Button>
					</div>
					<div className="md:w-1/2 relative">
						<div className="relative">
							<div className="absolute -top-6 -left-6 w-full h-full bg-rose-400 rounded-3xl transform rotate-3"></div>
							<div className="absolute -bottom-6 -right-6 w-full h-full bg-orange-400 rounded-3xl transform -rotate-3"></div>
							<div className="relative bg-white rounded-3xl p-6 shadow-xl overflow-hidden">
								<Image
									src="/images/dog-sm-4511.jpg?height=400&width=500"
									alt="Happy dogs enjoying Bonnie's secure private dog field in Hertfordshire"
									width={500}
									height={400}
									className="rounded-2xl mx-auto"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}