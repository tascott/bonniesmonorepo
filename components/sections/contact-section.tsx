import ContactForm from '@/components/contact-form'; // Assuming this is already a separate component

export default function ContactSection() {
	return (
		<section id="contact" className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-display">
						Contact Bonnie's Dog Care in Shenley
					</h2>
					<p className="text-lg text-slate-600 mb-8">
						Ready to book private field hire, dog walks, or 1-on-1 training in the Shenley, Radlett, or Mill Hill area? Contact our friendly team today!
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<p className="text-center text-slate-700 font-semibold text-xl mb-6">Send us a message</p>
					<ContactForm />
				</div>
			</div>
		</section>
	);
}