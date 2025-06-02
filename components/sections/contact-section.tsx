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
						Ready to book private field hire, dog day care, or 1-on-1 training in the Shenley, Radlett, or Mill Hill area? Contact our friendly team today!
					</p>
				</div>

				<div className="text-center mb-12 max-w-xl mx-auto">
					<h3 className="text-2xl font-semibold text-slate-700 mb-4 font-display">Bonnie's Dog Services</h3>
					<p className="text-slate-600 mb-1">Proudly serving Shenley, Radlett, Mill Hill, and surrounding Hertfordshire & North London areas.</p>
					<p className="text-slate-600 mb-1"><strong>Phone:</strong> <a href="tel:+440123456789" className="hover:underline text-primary hover:text-orange-600 transition-colors">+44 (0)123 456 789</a></p>
					<p className="text-slate-600 mb-4"><strong>Email:</strong> <a href="mailto:hello@bonniesdogcare.example.com" className="hover:underline text-primary hover:text-orange-600 transition-colors">hello@bonniesdogcare.example.com</a></p>
					{/* Optional: Add operating hours or a specific address if suitable for public view */}
					{/* <p className="text-slate-600">123 Playful Paw Path, Shenley, WD7 9XX</p> */}
					{/* <p className="text-slate-500 mt-2 text-sm">Office Hours: Mon-Fri, 9am - 5pm</p> */}
				</div>

				<div className="max-w-4xl mx-auto">
					<p className="text-center text-slate-700 font-semibold text-xl mb-6">Send us a message</p>
					<ContactForm />
				</div>
			</div>
		</section>
	);
}