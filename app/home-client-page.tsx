'use client';

import { useState } from 'react';
import { BackgroundElement } from '@/components/svg-components';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import CtaSection from '@/components/sections/cta-section';
import LocationsSection from '@/components/sections/locations-section';
import GallerySection from '@/components/sections/gallery-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import FaqSection from '@/components/sections/faq-section';
import ContactSection from '@/components/sections/contact-section'; 
import Link from 'next/link';

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen bg-secondary/10">
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
			<Header />
			<HeroSection />
			<ServicesSection />
			<CtaSection />
			<LocationsSection />
			<GallerySection />
			<TestimonialsSection />
			<FaqSection />
			<ContactSection />
			<Footer />
		</div>
	);
}
