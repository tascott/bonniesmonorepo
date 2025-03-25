"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ContactForm from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PawPrint, MapPin, Clock, Phone, Mail, Instagram, Facebook, Menu, Star, Check } from "lucide-react"
import { BackgroundElement } from "@/components/svg-components"
import { AuthButtons } from "@/components/auth-buttons"

export default function Home() {
  const [isImageOpen, setIsImageOpen] = useState(false)
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
							Woof & Wag
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
							href="#testimonials"
							className="text-slate-700 hover:secondary font-medium transition-colors"
						>
							Testimonials
						</Link>
						<Link
							href="#contact"
							className="text-slate-700 hover:secondary font-medium transition-colors"
						>
							Contact
						</Link>
						<AuthButtons />
					</nav>

					<div className="flex md:hidden items-center space-x-4">
						<AuthButtons />
						<Button variant="ghost" className="p-2">
							<Menu className="h-6 w-6 text-slate-800" />
						</Button>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative bg-gradient-to-b from-amber-50 to-white overflow-hidden pt-12 pb-24">
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
						<div className="md:w-1/2">
							<Badge className="primary-bg mb-4 px-3 py-1 text-sm rounded-full white">
								North London, Hertfordshire and St Albans
							</Badge>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 font-display leading-tight">
								Where Dogs Play & Roam
							</h1>
							<p className="text-slate-600 mb-6 text-lg leading-relaxed">
								When a walk is not enough and daycare is too
								much...try our fun play mornings
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
							<Button asChild className="primary-bg hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
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
										alt="Happy dogs playing"
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

			{/* Services Section */}
			<section
				id="services"
				className="py-24 bg-white relative overflow-hidden"
			>
				<div className="absolute left-0 top-0 w-full">
					<BackgroundElement
						type="wave"
						className="w-full"
						fill="#FEF3C7"
					/>
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<div className="text-center mb-16 mt-10">
						{/* <Badge className="bg-rose-100 text-lime-700 mb-4 px-3 py-1 text-sm rounded-full">
							Our Offerings
						</Badge> */}
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">
							What we do
						</h2>
						{/* <p className="text-slate-600 max-w-2xl mx-auto">
							Choose the perfect plan for your furry friends needs
							and schedule
						</p> */}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card className="border-0 shadow-lg rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
							<div className="h-3 bg-orange-400"></div>
							<CardHeader className="text-center pt-8">
								<div className="w-16 h-16 primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
									<PawPrint className="h-8 w-8 secondary" />
								</div>
								<CardTitle className="text-2xl font-display text-slate-800">
									Turn up & roam
								</CardTitle>
								<p className="text-slate-500">
									2 Hour sessions
								</p>
								<div className="inline-block primary-bg px-6 py-2 rounded-full mt-4 border-2 border-amber-100">
									<span className="text-2xl font-bold white">
										£15
									</span>
								</div>
							</CardHeader>
							<CardContent className="pt-6">
								<div className="aspect-video relative mb-6 overflow-hidden rounded-xl">
									<Image
										src="/images/dog3.jpeg?height=200&width=400"
										alt="Dog playing with staff"
										fill
										className="object-cover"
									/>
								</div>
								<ul className="space-y-3">
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Supervise your dog in our open
											fields
										</span>
									</li>
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Parking on site
										</span>
									</li>
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Dogs matched by size and energy
										</span>
									</li>
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Sessions every day of the week
										</span>
									</li>
								</ul>
							</CardContent>
							{/* <CardFooter>
								<Button className="w-full primary-bg hover:bg-orange-600 rounded-xl py-6">
									Select Location
								</Button>
							</CardFooter> */}
						</Card>

						<Card className="border-0 shadow-xl rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl relative">
							<div className="h-3 bg-rose-500"></div>
							<Badge className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full">
								POPULAR
							</Badge>
							<CardHeader className="text-center pt-8">
								<div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<PawPrint className="h-8 w-8 text-lime-500" />
								</div>
								<CardTitle className="text-2xl font-display text-slate-800">
									Play Mornings
								</CardTitle>
								<p className="text-slate-500">
									2 hour sessions
								</p>
								<div className="inline-block primary-bg px-6 py-2 rounded-full mt-4 border-2 border-amber-100">
									<span className="text-2xl font-bold white">
										£27
									</span>
								</div>
							</CardHeader>
							<CardContent className="pt-6">
								<div className="aspect-video relative mb-6 overflow-hidden rounded-xl">
									<Image
										src="/images/dog2.jpg?height=200&width=400"
										alt="Dog jumping through hoop"
										fill
										className="object-cover"
									/>
								</div>
								<ul className="space-y-3">
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Social play with dogs of their own
											energy levels
										</span>
									</li>
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Using all their senses
										</span>
									</li>
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Free pick up & drop off
										</span>
									</li>
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Dogs matched by size and energy
										</span>
									</li>
								</ul>
							</CardContent>
							{/* <CardFooter>
								<Button className="w-full bg-rose-500 hover:bg-rose-600 rounded-xl py-6">
									Select Location
								</Button>
							</CardFooter> */}
						</Card>

						<Card className="border-0 shadow-lg rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
							<div className="h-3 bg-orange-400"></div>
							<CardHeader className="text-center pt-8">
								<div className="w-16 h-16 primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
									<PawPrint className="h-8 w-8 secondary" />
								</div>
								<CardTitle className="text-2xl font-display text-slate-800">
									Lunchtime Walks
								</CardTitle>
								<p className="text-slate-500">
									1 or 2 hour walks
								</p>
								<div className="inline-block primary-bg px-6 py-2 rounded-full mt-4 border-2 border-amber-100">
									<span className="text-2xl font-bold white">
										£17
									</span>
								</div>
							</CardHeader>
							<CardContent className="pt-6">
								<div className="aspect-video relative mb-6 overflow-hidden rounded-xl">
									<Image
										src="/images/dog5.jpeg?height=200&width=400"
										alt="Dog catching ball"
										fill
										className="object-cover"
									/>
								</div>
								<ul className="space-y-3">
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Walks in parks or our fields
										</span>
									</li>
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Discounts for multiple dogs
										</span>
									</li>
									<li className="flex items-start">
										<div className="primary-bg p-1 rounded-full mr-3 mt-0.5">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Free pick up & drop off
										</span>
									</li>
								</ul>
							</CardContent>
							{/* <CardFooter>
								<Button className="w-full primary-bg hover:bg-orange-600 rounded-xl py-6">
									Select Location
								</Button>
							</CardFooter> */}
						</Card>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			{/* <section id="pricing" className="py-24 bg-slate-50 relative">
				<div className="container mx-auto px-4 relative z-10">
					<div className="text-center mb-16">
						<Badge className="primary-bg mb-4 px-3 py-1 text-sm rounded-full">
							Simple Pricing
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">
							Choose Your Plan
						</h2>
						<p className="text-slate-600 max-w-2xl mx-auto">
							Flexible options to fit your schedule and budget
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						<Card className="border-0 shadow-lg rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
							<CardHeader className="text-center pb-2 pt-8">
								<div className="w-12 h-12 primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="secondary font-bold">
										1x
									</span>
								</div>
								<p className="text-slate-500 mb-2">One time</p>
								<CardTitle className="text-4xl font-bold text-slate-800 font-display">
									£35
								</CardTitle>
								<p className="text-sm text-slate-500">
									per play
								</p>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3 mt-4">
									<li className="flex items-center">
										<div className="primary-bg p-1 rounded-full mr-3">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											One play session
										</span>
									</li>
									<li className="flex items-center">
										<div className="primary-bg p-1 rounded-full mr-3">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											7-9am pickup & drop-off
										</span>
									</li>
									<li className="flex items-center">
										<div className="primary-bg p-1 rounded-full mr-3">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											No commitment
										</span>
									</li>
								</ul>
							</CardContent>
							<CardFooter>
								<Button
									variant="outline"
									className="w-full border-orange-200 secondary hover:bg-orange-50 rounded-xl"
								>
									Get Started
								</Button>
							</CardFooter>
						</Card>

						<Card className="border-2 border-lime-500 shadow-xl rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
							<CardHeader className="text-center pb-2 pt-8">
								<div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-lime-500 font-bold">
										∞
									</span>
								</div>
								<p className="text-slate-500 mb-2">Monthly</p>
								<CardTitle className="text-4xl font-bold text-slate-800 font-display">
									£30
								</CardTitle>
								<p className="text-sm text-slate-500">
									unlimited plays
								</p>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3 mt-4">
									<li className="flex items-center">
										<div className="bg-rose-100 p-1 rounded-full mr-3">
											<Check className="h-4 w-4 text-lime-500" />
										</div>
										<span className="text-slate-700">
											Unlimited play sessions
										</span>
									</li>
									<li className="flex items-center">
										<div className="bg-rose-100 p-1 rounded-full mr-3">
											<Check className="h-4 w-4 text-lime-500" />
										</div>
										<span className="text-slate-700">
											7-9am pickup & drop-off
										</span>
									</li>
									<li className="flex items-center">
										<div className="bg-rose-100 p-1 rounded-full mr-3">
											<Check className="h-4 w-4 text-lime-500" />
										</div>
										<span className="text-slate-700">
											Cancel anytime
										</span>
									</li>
								</ul>
							</CardContent>
							<CardFooter>
								<Button className="w-full bg-rose-500 hover:bg-rose-600 rounded-xl">
									Get Started
								</Button>
							</CardFooter>
						</Card>

						<Card className="border-0 shadow-lg rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
							<CardHeader className="text-center pb-2 pt-8">
								<div className="w-12 h-12 primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="secondary font-bold">
										1y
									</span>
								</div>
								<p className="text-slate-500 mb-2">Yearly</p>
								<CardTitle className="text-4xl font-bold text-slate-800 font-display">
									£25
								</CardTitle>
								<p className="text-sm text-slate-500">
									unlimited plays
								</p>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3 mt-4">
									<li className="flex items-center">
										<div className="primary-bg p-1 rounded-full mr-3">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Unlimited play sessions
										</span>
									</li>
									<li className="flex items-center">
										<div className="primary-bg p-1 rounded-full mr-3">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											7-9am pickup & drop-off
										</span>
									</li>
									<li className="flex items-center">
										<div className="primary-bg p-1 rounded-full mr-3">
											<Check className="h-4 w-4 secondary" />
										</div>
										<span className="text-slate-700">
											Best value option
										</span>
									</li>
								</ul>
							</CardContent>
							<CardFooter>
								<Button
									variant="outline"
									className="w-full border-orange-200 secondary hover:bg-orange-50 rounded-xl"
								>
									Get Started
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</section> */}

			{/* Email Signup */}
			{/* <section className="py-24 bg-gradient-to-br from-orange-500 to-amber-600 text-white relative overflow-hidden">

				<BackgroundElement
					type="circles"
					className="absolute top-0 left-0 opacity-20"
					fill="white"
				/>
				<BackgroundElement
					type="circles"
					className="absolute bottom-0 right-0 opacity-20"
					fill="white"
				/>

				<div className="container mx-auto px-4 text-center relative z-10">
					<div className="max-w-2xl mx-auto">
						<Badge className="bg-white mb-4 px-3 py-1 text-sm rounded-full">
							Early Birds Get The Treats
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
							Rise and shine, it&apos;s playtime!
						</h2>
						<p className="mb-8 text-lg opacity-90">
							We provide morning dog play services in open fields.
							We&apos;ll pick up your pup at 7am, and drop them
							off by 9am, ready for your workday.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
							<Input
								type="email"
								placeholder="Enter your email address"
								className="bg-white/90 border-0 rounded-full py-6 px-6"
							/>
							<Button className="bg-rose-500 hover:bg-rose-600 text-white whitespace-nowrap rounded-full py-6 px-8 shadow-lg">
								Get Early Access
							</Button>
						</div>
					</div>
				</div>
			</section> */}

			{/* CTA Section */}
			<section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
				{/* Background elements */}
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
						Ready for Tail-Wagging Adventures?
					</h2>
					<p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
						We pick up your dog and take them to our secure and
						fully fenced site.
					</p>

					<p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
						Your dog spends 2+ hours on site with us where they will
						participate in social play with dogs of their own energy
						levels
					</p>
					<p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
						They will use all their senses while walking and
						exploring with us and their doggy friends
					</p>
					<p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
						This all takes place in the stunning Hertfordshire
						countryside with our ‘dog nut’ team who are all
						professionally trained and super motivated to do what
						they do.
					</p>
					<h3 className="text-1xl md:text-2xl font-bold mb-6 font-display">
						All staff are DBS checked and canine first aid trained
					</h3>
					<div className="flex flex-wrap justify-center gap-4">
						<Button asChild className="primary-bg hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
							<Link href="#contact">Contact Us</Link>
						</Button>
						{/* <Button
							variant="outline"
							className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
						>
							Book a Tour
						</Button> */}
					</div>
				</div>
			</section>

			{/* Locations */}
			<section id="locations" className="py-24 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<Badge className="bg-rose-100 text-lime-700 mb-4 px-3 py-1 text-sm rounded-full">
							Our Locations
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">
							Where We Cover
						</h2>
						{/* <p className="text-slate-600 max-w-2xl mx-auto">
							Serving London&apos;s finest furry friends across
							the city
						</p> */}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-1 gap-8">
						{/* <div className="group">
							<div className="rounded-3xl overflow-hidden shadow-lg transform transition-all group-hover:scale-105 group-hover:shadow-xl">
								<div className="relative">
									<Image
										src="/images/placeholder.svg?height=200&width=400"
										alt="Map location 1"
										width={400}
										height={200}
										className="w-full h-48 object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
									<div className="absolute bottom-0 left-0 p-4 text-white">
										<h3 className="font-bold text-xl">
											North London
										</h3>
										<p className="flex items-center mt-1 text-sm opacity-90">
											<MapPin className="h-4 w-4 mr-1" />
											Hampstead, Highgate, Camden
										</p>
									</div>
								</div>
								<div className="p-4 bg-white">
									<p className="text-slate-600 mb-4">
										Our North London parks offer scenic
										views and plenty of space for your dog
										to explore.
									</p>
									<Button
										variant="outline"
										className="w-full border-orange-200 secondary hover:bg-orange-50 rounded-xl"
									>
										View Details
									</Button>
								</div>
							</div>
						</div> */}

						<div className="group max-w-[500px] mx-auto">
							<div className="rounded-3xl overflow-hidden shadow-lg transform transition-all group-hover:scale-105 group-hover:shadow-xl">
								<div className="relative">
									<Image
										src="/images/map.png?height=400&width=600"
										alt="Map location 2"
										width={600}
										height={400}
										className="w-full h-64 object-contain"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
									<div className="absolute bottom-0 left-0 p-4 text-white">
										<h3 className="font-bold text-xl">
											Hertfordshire
										</h3>
										<p className="flex items-center mt-1 text-sm opacity-90">
											<MapPin className="h-4 w-4 mr-1" />
											Shenley, Radlett, Hertfordshire
										</p>
									</div>
								</div>
								<div className="p-4 bg-white">
									<p className="text-slate-600 mb-4">
										Shenley, Radlett, Hertfordshire, other
										areas nearby considered
									</p>
									<Button
										variant="outline"
										className="w-full border-orange-200 secondary hover:bg-orange-50 rounded-xl"
										onClick={() => setIsImageOpen(true)}
									>
										View Details
									</Button>
								</div>
							</div>

							<Dialog
								open={isImageOpen}
								onOpenChange={setIsImageOpen}
							>
								<DialogContent className="max-w-[90vw] w-auto h-auto p-0">
									<Image
										src="/images/map.png"
										alt="Map location 2"
										width={1200}
										height={800}
										className="w-full h-auto"
									/>
								</DialogContent>
							</Dialog>
						</div>

						{/* <div className="group">
							<div className="rounded-3xl overflow-hidden shadow-lg transform transition-all group-hover:scale-105 group-hover:shadow-xl">
								<div className="relative">
									<Image
										src="/images/placeholder.svg?height=200&width=400"
										alt="Map location 3"
										width={400}
										height={200}
										className="w-full h-48 object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
									<div className="absolute bottom-0 left-0 p-4 text-white">
										<h3 className="font-bold text-xl">
											West London
										</h3>
										<p className="flex items-center mt-1 text-sm opacity-90">
											<MapPin className="h-4 w-4 mr-1" />
											Fulham, Chelsea, Kensington
										</p>
									</div>
								</div>
								<div className="p-4 bg-white">
									<p className="text-slate-600 mb-4">
										Our West London parks offer premium
										facilities and easy access for busy pet
										parents.
									</p>
									<Button
										variant="outline"
										className="w-full border-orange-200 secondary hover:bg-orange-50 rounded-xl"
									>
										View Details
									</Button>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</section>

			{/* Gallery */}
			<section id="gallery" className="py-24 bg-amber-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<Badge className="primary-bg mb-4 px-3 py-1 text-sm rounded-full white">
							Happy Pups
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">
							Gallery
						</h2>
						<p className="text-slate-600 max-w-2xl mx-auto">
							See the joy and excitement of our furry clients
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<div className="aspect-square relative rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:z-10">
							<Image
								src="/images/dog1.jpg?height=300&width=300"
								alt="Dogs playing in field"
								fill
								className="object-cover"
							/>
						</div>
						<div className="aspect-square relative rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:z-10">
							<Image
								src="/images/dog2.jpg?height=300&width=300"
								alt="Dogs running together"
								fill
								className="object-cover"
							/>
						</div>
						<div className="aspect-square relative rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:z-10">
							<Image
								src="/images/dog3.jpeg?height=300&width=300"
								alt="Dogs playing with staff"
								fill
								className="object-cover"
							/>
						</div>
						<div className="aspect-square relative rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:z-10">
							<Image
								src="/images/dog4.jpeg?height=300&width=300"
								alt="Dog jumping through hoop"
								fill
								className="object-cover"
							/>
						</div>
						<div className="aspect-square relative rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:z-10">
							<Image
								src="/images/dog5.jpeg?height=300&width=300"
								alt="Dogs in park"
								fill
								className="object-cover"
							/>
						</div>
						<div className="aspect-square relative rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:z-10">
							<Image
								src="/images/dog6.jpeg?height=300&width=300"
								alt="Happy dog with ball"
								fill
								className="object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section id="testimonials" className="py-24 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<Badge className="bg-rose-100 text-lime-700 mb-4 px-3 py-1 text-sm rounded-full">
							Happy Clients
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">
							What Pet Parents Say
						</h2>
						{/* <p className="text-slate-600 max-w-2xl mx-auto">
							Don&apos;t just take our word for it - hear from our
							satisfied customers
						</p> */}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						<Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
							<CardContent className="pt-8">
								<div className="flex flex-col items-center mb-6">
									<div className="relative w-20 h-20 mb-4">
										<Image
											src="/images/placeholder.svg?height=80&width=80"
											alt="Testimonial author"
											width={80}
											height={80}
											className="rounded-full object-cover"
										/>
										<div className="absolute -bottom-2 -right-2 primary-bg text-white p-1 rounded-full">
											<PawPrint className="h-4 w-4" />
										</div>
									</div>
									<div className="text-center">
										<p className="font-bold text-slate-800 text-lg">
											Samantha & Bella
										</p>
										<p className="text-slate-500 text-sm">
											North London
										</p>
									</div>
								</div>

								<div className="flex justify-center mb-4">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="h-5 w-5 text-amber-400 fill-amber-400"
										/>
									))}
								</div>

								<p className="text-slate-600 text-center italic mb-6">
									&ldquo;My dog Bella absolutely loves going
									to Woof & Wag! The staff are amazing and she
									comes home happy and tired. I&apos;ve
									noticed such an improvement in her social
									skills with other dogs too.&rdquo;
								</p>

								{/* <div className="flex justify-center">
									<Badge className="primary-bg text-orange-700 px-3 py-1 text-sm rounded-full">
										Playful Pup Member
									</Badge>
								</div> */}
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
							<CardContent className="pt-8">
								<div className="flex flex-col items-center mb-6">
									<div className="relative w-20 h-20 mb-4">
										<Image
											src="/images/placeholder.svg?height=80&width=80"
											alt="Testimonial author"
											width={80}
											height={80}
											className="rounded-full object-cover"
										/>
										<div className="absolute -bottom-2 -right-2 bg-rose-500 text-white p-1 rounded-full">
											<PawPrint className="h-4 w-4" />
										</div>
									</div>
									<div className="text-center">
										<p className="font-bold text-slate-800 text-lg">
											James & Max
										</p>
										<p className="text-slate-500 text-sm">
											West London
										</p>
									</div>
								</div>

								<div className="flex justify-center mb-4">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="h-5 w-5 text-amber-400 fill-amber-400"
										/>
									))}
								</div>

								<p className="text-slate-600 text-center italic mb-6">
									&ldquo;The Woof & Wag difference is real! My
									dog Max gets so much exercise and
									stimulation at their countryside parks. The
									weekly enrichment activities are his
									favorite and the staff truly care about each
									dog.&rdquo;
								</p>

								{/* <div className="flex justify-center">
									<Badge className="bg-rose-100 text-lime-700 px-3 py-1 text-sm rounded-full">
										Social Hound Member
									</Badge>
								</div> */}
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Contact form */}
			<section id="contact" className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
				<div className="container mx-auto px-4">
					<div className="max-w-xl mx-auto text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
							Contact Us
						</h2>
						<p className="text-slate-300">
							Have questions or want to book a service? Send us a message and we&apos;ll get back to you soon.
						</p>
					</div>
					<div className="max-w-lg mx-auto">
						<ContactForm />
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-white pt-16 pb-8">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
						<div>
							<div className="flex items-center space-x-2 mb-6">
								<div className="primary-bg text-white p-2 rounded-full">
									<PawPrint className="h-6 w-6" />
								</div>
								<span className="text-xl font-bold text-slate-800 font-display">
									Woof & Wag
								</span>
							</div>
							<p className="text-slate-600 mb-6">
								Hertfordshires premier dog care people.
							</p>
							<div className="flex space-x-4">
								<a
									href="#"
									className="bg-slate-100 p-2 rounded-full text-slate-600 hover:primary-bg hover:secondary transition-colors"
								>
									<Facebook className="h-5 w-5" />
								</a>
								<a
									href="#"
									className="bg-slate-100 p-2 rounded-full text-slate-600 hover:primary-bg hover:secondary transition-colors"
								>
									<Instagram className="h-5 w-5" />
								</a>
							</div>
						</div>

						<div>
							<h3 className="font-bold text-slate-800 mb-6 text-lg">
								Quick Links
							</h3>
							<ul className="space-y-3">
								<li>
									<Link
										href="#services"
										className="text-slate-600 hover:secondary transition-colors"
									>
										Our Services
									</Link>
								</li>
								<li>
									<Link
										href="#locations"
										className="text-slate-600 hover:secondary transition-colors"
									>
										Locations
									</Link>
								</li>
								<li>
									<Link
										href="#pricing"
										className="text-slate-600 hover:secondary transition-colors"
									>
										Pricing
									</Link>
								</li>
								<li>
									<Link
										href="#gallery"
										className="text-slate-600 hover:secondary transition-colors"
									>
										Gallery
									</Link>
								</li>
								<li>
									<Link
										href="#testimonials"
										className="text-slate-600 hover:secondary transition-colors"
									>
										Testimonials
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-bold text-slate-800 mb-6 text-lg">
								Contact Us
							</h3>
							<ul className="space-y-3">
								<li className="flex items-start">
									<MapPin className="h-5 w-5 secondary mr-3 flex-shrink-0 mt-0.5" />
									<span className="text-slate-600">
										Rectory Road, Shenley, Hertfordshire
									</span>
								</li>
								<li className="flex items-start">
									<Phone className="h-5 w-5 secondary mr-3 flex-shrink-0 mt-0.5" />
									<span className="text-slate-600">
										020 1234 5678
									</span>
								</li>
								<li className="flex items-start">
									<Mail className="h-5 w-5 secondary mr-3 flex-shrink-0 mt-0.5" />
									<span className="text-slate-600">
										woof@woofandwag.com
									</span>
								</li>
								<li className="flex items-start">
									<Clock className="h-5 w-5 secondary mr-3 flex-shrink-0 mt-0.5" />
									<span className="text-slate-600">
										Mon-Fri: 7am-7pm
									</span>
								</li>
							</ul>
						</div>

						{/* <div>
							<h3 className="font-bold text-slate-800 mb-6 text-lg">
								Newsletter
							</h3>
							<p className="text-slate-600 mb-4">
								Subscribe for tips, news and special offers.
							</p>
							<div className="flex flex-col space-y-3">
								<Input
									type="email"
									placeholder="Your email address"
									className="bg-slate-50 border-slate-200 rounded-xl"
								/>
								<Button className="primary-bg hover:bg-orange-600 rounded-xl">
									Subscribe
								</Button>
							</div>
						</div> */}
					</div>

					<div className="border-t border-slate-100 pt-8">
						<p className="text-center text-slate-500">
							&copy; {new Date().getFullYear()} Woof & Wag London
						</p>
					</div>
				</div>
			</footer>
		</div>
  );
}
