import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function GallerySection() {
	return (
		<section id="gallery" className="py-24 bg-amber-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<Badge className="primary-bg mb-4 px-3 py-1 text-sm rounded-full white">
						Happy Pups
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">
						Happy Dogs Enjoying Bonnie's Care in Hertfordshire
					</h2>
					<p className="text-slate-600 max-w-2xl mx-auto">
						A glimpse into the fun and adventures at our Shenley-based private fields and training sessions.
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					<div className="aspect-square relative rounded-3xl overflow-hidden">
						<Image
							src="/images/dog1.jpg?height=300&width=300"
							alt="Happy dogs playing off-lead in Bonnie's secure private field near Shenley"
							fill
							className="object-cover"
						/>
					</div>
					<div className="aspect-square relative rounded-3xl overflow-hidden">
						<Image
							src="/images/dog10.JPG?height=300&width=300"
							alt="Group of dogs enjoying a socialisation run at Bonnie's"
							fill
							className="object-cover"
						/>
					</div>
					<div className="aspect-square relative rounded-3xl overflow-hidden">
						<Image
							src="/images/dog11.JPG?height=300&width=300"
							alt="Bonnie's staff member playing with a happy dog during a session in Radlett area"
							fill
							className="object-cover"
						/>
					</div>
					<div className="aspect-square relative rounded-3xl overflow-hidden">
						<Image
							src="/images/dog4.jpeg?height=300&width=300"
							alt="Dog learning agility during a 1-on-1 training session with Bonnie's near Mill Hill"
							fill
							className="object-cover"
						/>
					</div>
					<div className="aspect-square relative rounded-3xl overflow-hidden">
						<Image
							src="/images/dog12.JPG?height=300&width=300"
							alt="Several dogs relaxing in the sun at Bonnie's private dog park facility in Hertfordshire"
							fill
							className="object-cover"
						/>
					</div>
					<div className="aspect-square relative rounded-3xl overflow-hidden">
						<Image
							src="/images/dog13.JPG?height=300&width=300"
							alt="A joyful dog playing fetch at Bonnie's, serving Shenley and surrounding areas"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}