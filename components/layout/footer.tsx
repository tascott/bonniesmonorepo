import Link from 'next/link';
import { PawPrint, MapPin, Clock, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
	return (
		<footer className="bg-white pt-16 pb-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
					<div>
						<div className="flex items-center space-x-2 mb-6">
							<div className="primary-bg text-white p-2 rounded-full">
								<PawPrint className="h-6 w-6" />
							</div>
							<span className="text-xl font-bold text-slate-800 font-display">
								Bonnies
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
							{/* <li>
								<Link
									href="#pricing"
									className="text-slate-600 hover:secondary transition-colors"
								>
									Pricing
								</Link>
							</li> */}
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
									href="/blog"
									className="text-slate-600 hover:secondary transition-colors"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="#faq"
									className="text-slate-600 hover:secondary transition-colors"
								>
									FAQ
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
									07476 976 633
								</span>
							</li>
							<li className="flex items-start">
								<Mail className="h-5 w-5 secondary mr-3 flex-shrink-0 mt-0.5" />
								<span className="text-slate-600">
									admin@bonnies.dog
								</span>
							</li>
							<li className="flex items-start">
								<Clock className="h-5 w-5 secondary mr-3 flex-shrink-0 mt-0.5" />
								<span className="text-slate-600">
									Mon-Fri: 9am-5pm
								</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-slate-100 pt-8">
					<div className="flex flex-col items-center justify-center">
						<p className="text-center text-slate-500 mb-2">
							&copy; {new Date().getFullYear()} Bonnies
						</p>
						<Link href="/admin/blog" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
							Team Access
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}