import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
	return (
		<section id="faq" className="py-20 bg-slate-800">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
						Frequently Asked Questions
					</h2>
					<p className="text-lg text-slate-200 mb-8">
						Find answers to common questions about our dog care services.
					</p>
				</div>

				<div className="max-w-3xl mx-auto">
					<Accordion type="single" collapsible className="space-y-4">
						<AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
							<AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-1000">
								<div className="flex items-center justify-between w-full">
									<span className="text-left font-medium text-slate-800">What specific dog care and training services does Bonnie's offer in Hertfordshire and North London?</span>
									<div className="flex items-center justify-center bg-slate-100 p-2 rounded-full ml-4 flex-shrink-0">
										<ChevronDown className="h-5 w-5 text-slate-600 transition-transform duration-1000" />
										<span className="sr-only">Toggle</span>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4 pt-2 text-slate-600">
								Bonnie's specializes in <strong>Private Dog Field Hire</strong> for exclusive, safe off-lead fun, <strong>Dog Day Care & Socialization Mornings</strong> focusing on positive play and learning, and expert <strong>1-on-1 Dog Training & Behavior</strong> sessions. We serve areas like Shenley, Radlett, Mill Hill, and more, ensuring your dog receives top-quality care and attention.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
							<AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-1000">
								<div className="flex items-center justify-between w-full">
									<span className="text-left font-medium text-slate-800">How do you ensure the safety of dogs in your care?</span>
									<div className="flex items-center justify-center bg-slate-100 p-2 rounded-full ml-4 flex-shrink-0">
										<ChevronDown className="h-5 w-5 text-slate-600 transition-transform duration-1000" />
										<span className="sr-only">Toggle</span>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4 pt-2 text-slate-600">
								Safety is our top priority. We maintain low handler-to-dog ratios, use secure fields for off-lead play, conduct thorough temperament assessments, and ensure all staff are trained in dog behavior and first aid. We also carry full insurance for peace of mind.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
							<AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-1000">
								<div className="flex items-center justify-between w-full">
									<span className="text-left font-medium text-slate-800">Which towns do you cover for dog day care, field hire, and training pick-up/drop-off?</span>
									<div className="flex items-center justify-center bg-slate-100 p-2 rounded-full ml-4 flex-shrink-0">
										<ChevronDown className="h-5 w-5 text-slate-600 transition-transform duration-1000" />
										<span className="sr-only">Toggle</span>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4 pt-2 text-slate-600">
								We proudly offer our services, including free pick-up and drop-off for day care and training, to Shenley, Radlett, Mill Hill, Barnet, Stanmore, London Colney, St Albans, Potters Bar, Elstree, and Borehamwood. If you're nearby, don't hesitate to ask if we can accommodate you!
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
							<AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-1000">
								<div className="flex items-center justify-between w-full">
									<span className="text-left font-medium text-slate-800">How do I book services for my dog?</span>
									<div className="flex items-center justify-center bg-slate-100 p-2 rounded-full ml-4 flex-shrink-0">
										<ChevronDown className="h-5 w-5 text-slate-600 transition-transform duration-1000" />
										<span className="sr-only">Toggle</span>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4 pt-2 text-slate-600">
								Booking is easy! You can contact us through our website form, give us a call, or send an email. We'll arrange an initial consultation to meet you and your dog, discuss your needs, and get your pup set up in our system for regular bookings.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
							<AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-1000">
								<div className="flex items-center justify-between w-full">
									<span className="text-left font-medium text-slate-800">Do you accept all dog breeds and ages?</span>
									<div className="flex items-center justify-center bg-slate-100 p-2 rounded-full ml-4 flex-shrink-0">
										<ChevronDown className="h-5 w-5 text-slate-600 transition-transform duration-1000" />
										<span className="sr-only">Toggle</span>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4 pt-2 text-slate-600">
								We welcome dogs of all breeds, sizes, and ages, provided they pass our temperament assessment and are up-to-date with vaccinations. We create appropriate groupings based on size, energy levels, and play style to ensure every dog has a great experience with us.
							</AccordionContent>
						</AccordionItem>

						{/* New FAQ 1: Private Field Hire */}
						<AccordionItem value="item-6" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
							<AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-1000">
								<div className="flex items-center justify-between w-full">
									<span className="text-left font-medium text-slate-800">How does your Private Dog Field Hire near Shenley and Radlett work?</span>
									<div className="flex items-center justify-center bg-slate-100 p-2 rounded-full ml-4 flex-shrink-0">
										<ChevronDown className="h-5 w-5 text-slate-600 transition-transform duration-1000" />
										<span className="sr-only">Toggle</span>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4 pt-2 text-slate-600">
								Our secure private dog field, conveniently located for Shenley and Radlett residents, can be booked for exclusive sessions. It's perfect for dogs needing their own space, for recall practice, or simply for undisturbed playtime in a safe, enclosed environment.
							</AccordionContent>
						</AccordionItem>

						{/* New FAQ 2: Socialization Mornings */}
						<AccordionItem value="item-7" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
							<AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-1000">
								<div className="flex items-center justify-between w-full">
									<span className="text-left font-medium text-slate-800">What are the benefits of your Dog Socialization Mornings for dogs in Mill Hill or Barnet?</span>
									<div className="flex items-center justify-center bg-slate-100 p-2 rounded-full ml-4 flex-shrink-0">
										<ChevronDown className="h-5 w-5 text-slate-600 transition-transform duration-1000" />
										<span className="sr-only">Toggle</span>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4 pt-2 text-slate-600">
								Our Dog Day Care & Socialization Mornings, easily accessible for dogs from Mill Hill and Barnet, provide structured play and learning in small, supervised groups. This helps dogs build confidence, learn appropriate social skills, and enjoy mental and physical stimulation.
							</AccordionContent>
						</AccordionItem>

						{/* New FAQ 3: 1-on-1 Training */}
						<AccordionItem value="item-8" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
							<AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-1000">
								<div className="flex items-center justify-between w-full">
									<span className="text-left font-medium text-slate-800">Can I get 1-on-1 dog training in Borehamwood for issues like leash pulling or anxiety?</span>
									<div className="flex items-center justify-center bg-slate-100 p-2 rounded-full ml-4 flex-shrink-0">
										<ChevronDown className="h-5 w-5 text-slate-600 transition-transform duration-1000" />
										<span className="sr-only">Toggle</span>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-4 pt-2 text-slate-600">
								Yes, we offer personalized 1-on-1 dog training in Borehamwood, Elstree, and surrounding areas. Our trainers address specific behavioral challenges such as leash reactivity, poor recall, separation anxiety, and general obedience, creating a tailored plan for you and your dog.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</section>
	);
}