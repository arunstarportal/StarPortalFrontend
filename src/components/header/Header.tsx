'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, LogOut, Copy, ExternalLink, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/Config';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfileData } from '@/redux/userProfileSlice';
import { Login } from './LoginModal';
import { LeftHeader } from './leftHeader';
import { signOut } from 'next-auth/react';
import useDisconnectUser from '@/hooks/useDisconnectUser';
import { copyAddress, truncateAddress } from '@/Config/general';
import { useSession } from 'next-auth/react';
import { DepositeModal } from './DepositeModal';







interface header {
	searchTerm?: string;
	setSearchTerm?: (term: string) => void;
}

export const Header = () => {
	const router = useRouter();
	const disconnectUser = useDisconnectUser();
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isDepositeOpen, setIsDepositeOpen] = useState(false);

	// @ts-ignore
	const profileData = useSelector((state) => state.userProfile.user);
	const { status } = useSession();

	const [isWalletOpen, setIsWalletOpen] = useState(false);
	const [showCopied, setShowCopied] = useState(false);
	const dispatch = useDispatch();

	const openLoginModal = () => setIsLoginOpen(true);
	const openDepositeModal = () => setIsDepositeOpen(true);

	const closeLoginModal = () => setIsLoginOpen(false);
	const closeDepositeModal = () => setIsDepositeOpen(false);

	useEffect(() => {
		// getting user details from the localstorage
		const userDetails = window.localStorage.getItem('star_authTokens');
		if (userDetails?.length > 0) {
			// comparing the last login date of the user if fails then disconnect
			dispatch(setUserProfileData(JSON.parse(userDetails)));
		}
	}, []);

	const handleDisconnect = () => {
		disconnectUser();
	};

	return (
		<div>
			<div className="pb-2 z-50 relative">
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className="flex items-center justify-between gap-4 backdrop-blur-md "
				>
					{/* Left Section  */}
					<LeftHeader />

					{/* Right Section */}
					<div className="flex z-50 items-center gap-4">
						{/* Notifications */}
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="relative p-2 z-50 text-gray-400 hover:text-white bg-[#171717] rounded-xl border border-gray-800 transition-all duration-300"
						>
							<Bell size={20} />
							<span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
						</motion.button>

						{/* Wallet Section */}
						{profileData || status === 'authenticated' ? (
							<div className="relative flex items-center justify-center gap-3">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="relative px-3 py-2 z-50 text-white hover:text-white bg-purple-500 rounded-md transition-all duration-300"
									onClick={() => router.push('/swap')}
								>
									Swap
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="relative px-3 py-2 z-50 text-white hover:text-white bg-purple-500 rounded-md transition-all duration-300"
								>
									Portfolio
								</motion.button>
								<motion.button
									onClick={openDepositeModal}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="relative px-3 py-2 z-50 text-gray-400 hover:text-white bg-[#171717] rounded-md border border-gray-800 transition-all duration-300"
								>
									Deposite
								</motion.button>

								<motion.button
									onClick={() => setIsWalletOpen(!isWalletOpen)}
									className="flex items-center gap-3 px-4 py-2 bg-[#171717] border border-gray-800 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
								>
									<img src="/svgs/user.svg" alt="" className="w-8 h-8" />
								</motion.button>
								<AnimatePresence>
									{isWalletOpen && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											className="absolute right-0 top-full mt-2 w-72 bg-[#171717] border border-gray-800 rounded-xl shadow-xl overflow-hidden"
										>
											{/* Wallet Balance */}
											<div className="p-4 border-b border-gray-800 flex items-end gap-4">
												<p className="text-sm font-semibold text-green-400">
													Connected
												</p>
											</div>

											{/* Actions */}
											<div className="p-2">
												<button
													onClick={() =>
														copyAddress(profileData.eth_Address, setShowCopied)
													}
													className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
												>
													<Copy size={16} />
													<span>Copy Address</span>
													{showCopied && (
														<span className="ml-auto text-xs text-green-400">
															Copied!
														</span>
													)}
												</button>

												<button
													onClick={() => router.push('/profile')}
													className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
												>
													<ExternalLink size={16} />
													<span>Profile</span>
												</button>

												<button
													onClick={() => {
														handleDisconnect();
														setIsWalletOpen(false);
													}}
													className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
												>
													<LogOut size={16} />
													<span>Disconnect</span>
												</button>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						) : (
							<div className=" flex items-center gap-2">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={openLoginModal}
									className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20"
								>
									<Wallet size={20} />
									<span>Login</span>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => router.push('/auth/signup')}
									className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20"
								>
									<Wallet size={20} />
									<span>Signup</span>
								</motion.button>
							</div>
						)}
					</div>
				</motion.div>
			</div>
			<Login
				isOpen={isLoginOpen}
				onClose={closeLoginModal}
				setIsLoginOpen={setIsLoginOpen}
			/>
			<DepositeModal
				isOpen={isDepositeOpen}
				onClose={closeDepositeModal}
				setIsLoginOpen={setIsDepositeOpen}
			/>
		</div>
	);
};

