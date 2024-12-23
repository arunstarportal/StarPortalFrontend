'use client';
import './globals.css';
import { motion } from 'framer-motion';

import '@rainbow-me/rainbowkit/styles.css';

import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header/Header';
import { usePathname } from 'next/navigation';

import { store } from '../redux/store';
import { Provider } from 'react-redux';
import NextAuthProvider from '@/components/SessionProvider';
import { Toaster } from '@/components/ui/toaster';
import RainbowKitProviderWrapper from '@/components/provider/Rainbowkit-Provider';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const isSignupRoute = pathname === '/auth/signup';

	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
				/>
			</head>
			<body>
				<NextAuthProvider>
					<RainbowKitProviderWrapper>
						<Provider store={store}>
							<div
								className={`antialiased flex h-screen ${isSignupRoute ? '' : 'overflow-hidden'}`}
							>
								{!isSignupRoute && <Sidebar />}
								<main className={`flex-1 ${isSignupRoute ? '' : 'p-6'}`}>
									{!isSignupRoute && <Header />}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.2 }}
										className={
											isSignupRoute ? '' : 'mt-1 max-h-[90vh] overflow-y-scroll'
										}
									>
										{children}
									</motion.div>
								</main>
								<Toaster />
							</div>
						</Provider>
					</RainbowKitProviderWrapper>
				</NextAuthProvider>
			</body>
		</html>
	);
}
