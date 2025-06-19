import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BackgroundElement } from '@/components/svg-components';

export default function CtaSection() {
	return (
		<section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
			<BackgroundElement
				type="paws"
				className="absolute top-0 left-0 opacity-10"
				fill="white"
			/>
			<BackgroundElement
				type="paws"
				className="absolute bottom-0 right-0 opacity-10"
				fill="white"
			/>

			<div className="container mx-auto px-4 text-center relative z-10">
				<Badge className="bg-white text-slate-800 mb-4 px-3 py-1 text-sm rounded-full">
					Join Our Pack
				</Badge>
				<h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
					Give Your Dog the Best Day Out in Hertfordshire!
				</h2>
				<p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
					Join Bonnie's for exceptional private dog walks and socialisation adventures in the stunning Hertfordshire countryside. We offer convenient pick-up for your furry friend, bringing them to our secure, fully-fenced site. Here, they'll enjoy 2+ hours of supervised social play with well-matched doggy pals, engaging all their senses while exploring and having fun. Our professionally trained, DBS-checked, and canine first-aid certified 'dog nut' team is dedicated to providing a safe, stimulating, and joyful experience for every dog in our care, whether they're from Shenley, Radlett, Mill Hill, or nearby areas.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<Button
						asChild
						className="primary-bg hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
					>
						<Link href="#contact">Contact Us</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}