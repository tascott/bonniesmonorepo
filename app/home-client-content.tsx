'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
// import { Input } from "@/components/ui/input"
import { Badge } from '@/components/ui/badge';
import { PawPrint, MapPin, Clock, Phone, Mail, Instagram, Facebook, Menu, Star, Check, ChevronDown } from 'lucide-react';
import { BackgroundElement } from '@/components/svg-components';
import { AuthButtons } from '@/components/auth-buttons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default function HomeClientContent() { // Renamed component
	const [isImageOpen, setIsImageOpen] = useState(false);
	return (
		<div className="flex flex-col min-h-screen bg-secondary/10">
			{/* Top Banner */}
			{/* <div className="primary-bg text-white py-3 text-center">
				<p className="text-sm md:text-base font-medium">
					🐾 For London Dogs Who Love to Run Free! Enrol Today! 🐾
				</p>
			</div> */}

			{/* Navigation */}
			<header className="sticky top-0 z-50 bg-white shadow-md">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<div className="primary-bg text-white p-2 rounded-full">
							<PawPrint className="h-6 w-6" />
						</div>
						<span className="text-2xl font-bold text-foreground font-display">
							Bonnies
						</span>
					</Link>

					<nav className="hidden md:flex items-center space-x-8">
						<Link
							href="#services"
							className="text-slate-700 hover:secondary font-medium transition-colors"
						>
							Services
						</Link>
						<Link
							href="#locations"
							className="text-slate-700 hover:secondary font-medium transition-colors"
						>
							Locations
						</Link>
						{/* <Link
							href="#pricing"
							className="text-slate-700 hover:secondary font-medium transition-colors"
						>
							Pricing
						</Link> */}
						<Link
							href="#gallery"
							className="text-slate-700 hover:secondary font-medium transition-colors"
						>
							Gallery
						</Link>
						<Link 
							href="#faq"
							className="text-slate-700 hover:secondary font-medium transition-colors"
						>
							FAQ
						</Link>
						<Link
							href="/blog"
							className="bg-orange-100 text-orange-600 hover:bg-orange-200 font-medium transition-colors px-3 py-1 rounded-full"
						>
							Blog
						</Link>
						<Link
							href="#contact"
							className="text-slate-700 hover:secondary font-medium transition-colors"
						>
							Contact
						</Link>
						{/* <AuthButtons /> */}
					</nav>

					<div className="flex md:hidden items-center space-x-4">
						<AuthButtons />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="p-2">
									<Menu className="h-6 w-6 text-slate-800" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuItem asChild>
									<Link
										href="#services"
										className="text-slate-700 hover:secondary font-medium transition-colors"
									>
										Services
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="#locations"
										className="text-slate-700 hover:secondary font-medium transition-colors"
									>
										Locations
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="#gallery"
										className="text-slate-700 hover:secondary font-medium transition-colors"
									>
										Gallery
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="/blog"
										className="text-orange-600 font-medium"
									>
										Blog
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
    <Link
        href="#faq"
        className="text-slate-700 hover:secondary font-medium transition-colors"
    >
        FAQ
    </Link>
</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="#contact"
										className="text-slate-700 hover:secondary font-medium transition-colors"
									>
										Contact
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>
			
			{/* Launch Day Banner */}
			<div className="bg-orange-500 text-white py-3 text-center shadow-md relative z-40">
				<div className="container mx-auto px-4">
					<Link href="/launchday" className="inline-flex items-center space-x-2 hover:underline">
						<span className="font-bold">🎉 Join us for our Launch Day on July 5th, 2025! 🐾</span>
						<span className="hidden md:inline">Special offers, activities, and more!</span>
						<span className="ml-2 font-semibold underline">Learn More</span>
					</Link>
				</div>
			</div>

			{/* Hero Section */}
			<section id="hero" className="relative bg-gradient-to-b from-amber-50 to-white overflow-hidden pt-12 pb-24">
				{/* Background elements */}
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
						<div className="md:w-1/2 text-center md:text-left">
							<Badge className="primary-bg mb-4 px-3 py-1 text-sm rounded-full white">
								North London, Hertfordshire & St Albans
							</Badge>
							<h1 className="text-4xl md:text-4xl lg:text-6xl font-bold text-slate-800 mb-6 font-display leading-tight">
							Secure walks in nature, created just for dogs
							</h1>
							<p className="text-slate-600 mb-6 text-lg leading-relaxed">
								Door-to-door pick-ups, small groups, and human-supervised play sessions on secure acreage.
							</p>
							<div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
								<div className="flex items-center">
									<div className="primary-bg p-2 rounded-full mr-3">
										<Check className="h-5 w-5 secondary" />
									</div>
									<span className="text-slate-700">Free pickup & drop-off</span>
								</div>
								<div className="flex items-center">
									<div className="primary-bg p-2 rounded-full mr-3">
										<Check className="h-5 w-5 secondary" />
									</div>
									<span className="text-slate-700">Secure private fields</span>
								</div>
								<div className="flex items-center">
									<div className="primary-bg p-2 rounded-full mr-3">
										<Check className="h-5 w-5 secondary" />
									</div>
									<span className="text-slate-700">Small, supervised groups</span>
								</div>
							</div>
							<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
								<Button asChild size="lg" className="primary-bg hover:primary-bg/90 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105">
									<Link href="#contact">Enquire Now</Link>
								</Button>
								<Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105">
									<Link href="#services">Our Services</Link>
								</Button>
							</div>
						</div>
						<div className="md:w-1/2 mt-8 md:mt-0">
							<div className="relative aspect-video rounded-xl shadow-2xl overflow-hidden group transform transition-all duration-500 hover:scale-105">
								<Image
									src="/images/hero-dog-run.jpg"
									alt="Happy dog running in a field"
									layout="fill"
									objectFit="cover"
									className="group-hover:blur-sm transition-all duration-500"
									priority
								/>
								<div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
									<h2 className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-y-0 translate-y-5">Playtime Paradise!</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section id="services" className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">Our Services</h2>
						<p className="text-slate-600 text-lg max-w-2xl mx-auto">
							We offer a range of services designed to keep your dog happy, healthy, and socialized in a safe and stimulating environment.
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[{
							title: "Private field walks and socialisation",
							description: "Safe, secure, and stimulating play in our private fields. Includes pick-up and drop-off.",
							icon: <PawPrint className="h-8 w-8 primary-text" />,
							image: "/images/dog-daycare.jpg",
							features: ["Door-to-door transport", "Supervised group play", "Secure private fields", "Regular updates & photos"]
						}, {
							title: "Puppy Socialisation",
							description: "Gentle introduction to new sights, sounds, and furry friends for your young pup.",
							icon: <Star className="h-8 w-8 primary-text" />,
							image: "/images/puppy-social.jpg",
							features: ["Safe & controlled environment", "Positive reinforcement techniques", "Small group sizes", "Builds confidence"]
						}, {
							title: "Weekend Adventures (Coming Soon)",
							description: "Longer excursions to exciting locations for extra fun and exercise.",
							icon: <MapPin className="h-8 w-8 primary-text" />,
							image: "/images/weekend-adventure.jpg",
							features: ["Extended play sessions", "Varied locations & activities", "Perfect for energetic dogs", "Pre-booking essential"]
						}].map((service, index) => (
							<Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
								<div className="relative h-56 w-full">
									<Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
								</div>
								<CardHeader className="pb-2">
									<div className="flex items-center mb-2">
										<div className="p-2 primary-bg/10 rounded-full mr-3">
											{service.icon}
										</div>
										<CardTitle className="text-xl font-semibold text-slate-800">{service.title}</CardTitle>
									</div>
								</CardHeader>
								<CardContent className="flex-grow">
									<p className="text-slate-600 mb-4 text-sm leading-relaxed">{service.description}</p>
									<ul className="space-y-2">
										{service.features.map((feature, i) => (
											<li key={i} className="flex items-center text-sm text-slate-700">
												<Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
												{feature}
											</li>
										))}
									</ul>
								</CardContent>
								<div className="p-6 pt-0">
									<Button asChild className="w-full primary-bg hover:primary-bg/90 text-white">
										<Link href="#contact">Learn More</Link>
									</Button>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Locations Section */}
			<section id="locations" className="py-16 bg-secondary/10">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">Our Coverage Areas</h2>
						<p className="text-slate-600 text-lg max-w-2xl mx-auto">
							We provide convenient pick-up and drop-off services across North London, Hertfordshire, and St Albans.
						</p>
					</div>
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<h3 className="text-2xl font-semibold text-slate-700 mb-4">Conveniently Located Fields</h3>
							<p className="text-slate-600 mb-6">
								Our secure private fields are strategically located to be easily accessible from our service areas, ensuring less travel time for your dog and more time for play. We currently have primary field locations near:
							</p>
							<ul className="space-y-3 mb-6">
								{[{
									name: "Barnet Fields (North London Gateway)",
									description: "Spacious fields perfect for dogs from Finchley, Highgate, and surrounding North London areas."
								}, {
									name: "Shenley Fields (Hertfordshire Hub)",
									description: "Rolling acres ideal for pups from Shenley, Radlett, and nearby Hertfordshire towns."
								}, {
									name: "St Albans Green (Historic City Outskirts)",
									description: "Secure play areas conveniently serving St Albans, Harpenden, and Radlett."
								}].map(location => (
									<li key={location.name} className="flex">
										<MapPin className="h-5 w-5 primary-text mr-3 mt-1 flex-shrink-0" />
										<div>
											<h4 className="font-semibold text-slate-700">{location.name}</h4>
											<p className="text-slate-600 text-sm">{location.description}</p>
										</div>
									</li>
								))}
							</ul>
							<Button asChild className="primary-bg hover:primary-bg/90 text-white">
								<Link href="#contact">Check Your Area</Link>
							</Button>
						</div>
						<div className="mt-8 md:mt-0">
							<div className="aspect-video rounded-xl shadow-lg overflow-hidden">
								{/* Replace with an actual map component or static map image */}
								<Image src="/images/map-placeholder.jpg" alt="Map of service areas" layout="fill" objectFit="cover" />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section id="gallery" className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">Happy Pups in Action</h2>
						<p className="text-slate-600 text-lg max-w-2xl mx-auto">
							A glimpse into the fun and adventures our furry clients enjoy every day.
						</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
							<div key={i} className="aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-transform hover:scale-105" onClick={() => setIsImageOpen(true)}>
								<Image src={`/images/gallery/dog-${i}.jpg`} alt={`Gallery image ${i}`} layout="fill" objectFit="cover" className="hover:opacity-90 transition-opacity"/>
							</div>
						))}
					</div>
					<Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
						<DialogContent className="max-w-3xl p-0">
							<DialogTitle className="sr-only">Gallery Image</DialogTitle>
							<Image src="/images/gallery/dog-1.jpg" alt="Enlarged gallery image" width={1200} height={800} className="rounded-md"/>
						</DialogContent>
					</Dialog>
					<div className="text-center mt-8">
						<Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
							View More on Instagram
							<Instagram className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section id="faq" className="py-16 bg-secondary/10">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">Frequently Asked Questions</h2>
					</div>
					<Accordion type="single" collapsible className="max-w-3xl mx-auto">
						{[{
							question: "What are your operating hours?",
							answer: "Our core operating hours for pick-ups and drop-offs are between 8 AM and 5 PM, Monday to Friday. Specific timings can be arranged based on your location and our routes."
						}, {
							question: "What vaccinations do you require?",
							answer: "For the safety of all dogs, we require up-to-date vaccinations for Rabies, DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus), and Bordetella (Kennel Cough). Proof of vaccination from your vet is required before enrolment."
						}, {
							question: "How do you handle different dog temperaments?",
							answer: "We conduct an initial assessment for all new dogs to understand their temperament and play style. We carefully manage group dynamics and ensure dogs are grouped appropriately. Our staff are trained in dog behaviour and positive reinforcement techniques."
						}, {
							question: "What happens in case of bad weather?",
							answer: "We monitor weather conditions closely. In cases of extreme weather (e.g., thunderstorms, heatwaves), we may adjust play times, utilize sheltered areas, or in rare cases, reschedule. Your dog's safety and comfort are our top priority."
						}, {
							question: "How do I enrol my dog?",
							answer: "You can start by filling out our contact form on the website or giving us a call. We'll then schedule a brief meet-and-greet to assess your dog and discuss your needs. Once all paperwork, including vaccination records, is complete, your dog can join the fun!"
						}].map((item, index) => (
							<AccordionItem key={index} value={`item-${index + 1}`}>
								<AccordionTrigger className="text-lg font-medium text-slate-700 hover:text-primary text-left">
									{item.question}
								</AccordionTrigger>
								<AccordionContent className="text-slate-600 pt-2 pb-4 leading-relaxed">
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">Get in Touch</h2>
						<p className="text-slate-600 text-lg max-w-xl mx-auto">
							Ready to give your dog the adventure they deserve? Contact us today!
						</p>
					</div>
					<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-secondary/30 p-8 md:p-12 rounded-xl shadow-lg">
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold text-slate-700 mb-2">Contact Information</h3>
								<div className="space-y-2 text-slate-600">
									<p className="flex items-center"><Phone className="h-5 w-5 mr-3 primary-text" /> <span>020 1234 5678</span></p>
									<p className="flex items-center"><Mail className="h-5 w-5 mr-3 primary-text" /> <span>hello@bonnies.dog</span></p>
									<p className="flex items-center"><MapPin className="h-5 w-5 mr-3 primary-text" /> <span>Servicing North London, Herts & St Albans</span></p>
								</div>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-slate-700 mb-2">Business Hours</h3>
								<div className="space-y-1 text-slate-600">
									<p>Monday - Friday: 8:00 AM - 5:00 PM</p>
									<p>Saturday - Sunday: Closed (Weekend Adventures Coming Soon)</p>
								</div>
							</div>
							<div>
								<h3 className="text-xl font-semibold text-slate-700 mb-2">Follow Us</h3>
								<div className="flex space-x-4">
									<Link href="#" className="text-slate-500 hover:text-primary"><Instagram className="h-7 w-7" /></Link>
									<Link href="#" className="text-slate-500 hover:text-primary"><Facebook className="h-7 w-7" /></Link>
								</div>
							</div>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-slate-700 mb-4">Send us a Message</h3>
							<ContactForm />
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="primary-bg text-white py-12">
				<div className="container mx-auto px-4 text-center">
					<div className="mb-4">
						<Link href="/" className="flex items-center justify-center space-x-2 mb-2">
							<div className="bg-white text-primary p-2 rounded-full">
								<PawPrint className="h-6 w-6" />
							</div>
							<span className="text-2xl font-bold font-display">Bonnies</span>
						</Link>
						<p className="text-sm opacity-90">Premium Private Dog Walks & Socialisation</p>
					</div>
					<div className="flex justify-center space-x-6 mb-6">
						<Link href="#services" className="hover:underline opacity-90 hover:opacity-100">Services</Link>
						<Link href="/blog" className="hover:underline opacity-90 hover:opacity-100">Blog</Link>
						<Link href="#faq" className="hover:underline opacity-90 hover:opacity-100">FAQ</Link>
						<Link href="#contact" className="hover:underline opacity-90 hover:opacity-100">Contact</Link>
						<Link href="/privacy-policy" className="hover:underline opacity-90 hover:opacity-100">Privacy Policy</Link>
						<Link href="/terms-of-service" className="hover:underline opacity-90 hover:opacity-100">Terms of Service</Link>
					</div>
					<p className="text-xs opacity-70">
						&copy; {new Date().getFullYear()} Bonnie's. All rights reserved. 
						Site by <a href="https://tom.scott.is" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-100">Tom Scott</a>.
					</p>
				</div>
			</footer>
		</div>
	);
}

