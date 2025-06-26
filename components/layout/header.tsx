'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AuthButtons } from '@/components/auth-buttons'; // Assuming this is already a separate component

export default function Header() {
	return (
		<header className="sticky top-0 z-50 bg-white shadow-md">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link href="/" className="flex items-center">
					<Image
						src="/images/logo-final-01.png"
						alt="Bonnies Logo"
						width={200}
						height={50}
						className="h-10 w-auto"
						priority
					/>
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
					{/* <Link
						href="/blog"
						className="bg-orange-100 text-orange-600 hover:bg-orange-200 font-medium transition-colors px-3 py-1 rounded-full"
					>
						Blog
					</Link> */}
					<Link
						href="#contact"
						className="text-slate-700 hover:secondary font-medium transition-colors"
					>
						Contact
					</Link>
					{/* <AuthButtons /> */}
				</nav>

				<div className="flex md:hidden items-center">
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
							{/* <DropdownMenuItem asChild>
								<Link
									href="/blog"
									className="text-orange-600 font-medium"
								>
									Blog
								</Link>
							</DropdownMenuItem> */}
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
	);
}