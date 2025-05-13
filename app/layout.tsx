import type React from 'react';
import type { Metadata } from 'next';
import { Playfair_Display, Fira_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/auth-context';

const playfair = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-playfair',
	display: 'swap',
});

const fira = Fira_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-fira',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Bonnies',
	description: "London's premier dog day care service, providing expert care and off-leash fun for your furry friends.",
	icons: {
		icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><style>.e%7Bfont-size:90px%7D.l%7Bdisplay:inline;fill:black%7D.d%7Bdisplay:none%7D@media(prefers-color-scheme:dark)%7B.l%7Bdisplay:none%7D.d%7Bdisplay:inline;fill:white%7D%7D@media(prefers-color-scheme:light)%7B.l%7Bdisplay:inline;fill:black%7D.d%7Bdisplay:none%7D%7D</style><text y=%22.9em%22 class=%22e l%22>🐾</text><text y=%22.9em%22 class=%22e d%22>🐾</text></svg>",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${playfair.variable} ${fira.variable}`} suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
					<AuthProvider>{children}</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
