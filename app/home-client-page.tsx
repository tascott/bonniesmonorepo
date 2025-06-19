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
		<div className="flex flex-col min-h-screen">

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
