import type React from 'react';
import type { Metadata } from 'next';
import { Playfair_Display, Fira_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-provider';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

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
	description: "London's premier private field walks and socialisation service, providing expert care and off-leash fun for your furry friends.",
	icons: {
		icon: '/images/logo-final-02.jpg',
		shortcut: '/images/logo-final-02.jpg',
		apple: '/images/logo-final-02.jpg',
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
					<Toaster />
				</ThemeProvider>
				<Script
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-W0FD3HB2YB"
				/>
				<Script
					id="google-analytics"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-W0FD3HB2YB');
            `,
					}}
				/>
			</body>
		</html>
	);
}
