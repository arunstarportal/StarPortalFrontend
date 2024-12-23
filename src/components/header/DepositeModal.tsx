import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Copy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { WalletButton } from '@rainbow-me/rainbowkit';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { config } from '@/Config/Wagmi';

import {
	ConnectionProvider,
	WalletProvider,
	useWallet,
	useAnchorWallet,
	useConnection,
} from '@solana/wallet-adapter-react';
import {
	WalletModalProvider,
	WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {
	PhantomWalletAdapter,
	SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import Image from 'next/image';
import {
	Connection,
	PublicKey,
	SystemProgram,
	Transaction,
} from '@solana/web3.js';
import {
	useAccount,
	useBalance,
	useDisconnect,
	usePrepareTransactionRequest,
	useSendTransaction,
	useWaitForTransactionReceipt,
	useChains,
	useSwitchChain,
} from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { truncateAddress } from '@/Config/general';
import { ethers, providers } from 'ethers';
import { parseEther } from 'viem';
import { Button } from '../ui/button';
import { formatUnits } from 'viem';
import { BASE_URL } from '@/Config';
import { useChainId } from 'wagmi';

const SOLANA_RPC_ENDPOINT =
	'https://solana-devnet.g.alchemy.com/v2/EZk0IPIo20LxLKtgnP_xf7vPtgtKPzbm';

export const DepositeModal = ({ isOpen, onClose, setIsLoginOpen }) => {
	const [activeTab, setActiveTab] = useState('transfer');
	const [selectedNetwork, setSelectedNetwork] = useState<string | undefined>(undefined);
	const [showCopied, setShowCopied] = useState(false);
	const [selectedChains, setSelectedChains] = useState('');
	const [solanaBalance, setSolanaBalance] = useState('0');
	const [depositAmount, setDepositAmount] = useState('0.001');
	const [manualAddress, setManualAddress] = useState('');
	const [error, setError] = useState('');

	const depositAddress = '8reRVMaHwxwG94zzvRErv9KWQBrkBieb4b6vC49gBsij';

	const { isConnected, address } = useAccount();
	const CurrentChainID = useChainId(); // Get the current active chain
	const { data: MetaMaskBalance } = useBalance({
		chainId: CurrentChainID,
		address: address,
	});
	// console.log("🚀 ~ DepositeModal ~ MetaMaskBalance:", MetaMaskBalance)
	const { disconnect: MetaMaskDisconnect } = useDisconnect();

	const {
		connected,
		disconnect,
		publicKey,
		sendTransaction: walletSendTransaction,
		signTransaction,
	} = useWallet();

	const { sendTransaction, data: hash } = useSendTransaction();

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	//   console.log("🚀 ~ DepositeModal ~ chain:", CurrentChainID)
	const { chains: supportedChains, switchChain } = useSwitchChain();
	//   console.log("🚀 ~ DepositeModal ~ supportedChains:", supportedChains)

	const chains = [
		{
			id: 'devnet',
			name: 'solana',
			endpoint: 'https://api.devnet.solana.com',
			explorer: 'https://explorer.solana.com',
			symbol: 'DEV',
			tokenSymbol: 'DEV',
			// icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
		},
		...config.chains,
	];

	const handleChainChange = (selectedChainName: string) => {
		const currentChain = selectedChains;
		setSelectedChains(selectedChainName);
		const selectedChain = chains.find(
			(chain) => chain.name === selectedChainName
		);
		if (selectedChain && switchChain) {
			try {
				const result = switchChain({
					chainId: selectedChain.id as
						| 1
						| 11155111
						| 421614
						| 42161
						| 137
						| 10
						| 8453
						| 17000,
				});
				console.log('🚀 ~ handleChainChange ~ result:', result);
			} catch (error) {
				console.log('🚀 ~ handleChainChange ~ error:', error);
				if (error.message.includes('User rejected the request')) {
					// MetaMask user rejected the request
					console.log('User rejected the request');
				} else {
					console.log('Failed to switch chain:', error);
				}
				setSelectedChains(currentChain); // Revert to the current chain on error
			}
		} else {
			console.log('Failed to find chain or switchNetwork is not available');
			setSelectedChains(currentChain);
		}
	};

	// Use React Query to fetch the balance
	const {
		data: SolanaBalance,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['solanaBalance', publicKey],
		queryFn: async () => await fetchSolanaBalance(publicKey),
		enabled: !!publicKey,
		staleTime: 1000,
	});

	const { data: userDetails } = useQuery({
		queryKey: ['userDetails', address],
		queryFn: async () => await fetchUserDetails(address),
		enabled: !!address,
		staleTime: 1000,
	});
	// console.log('🚀 ~ DepositeModal ~ userDetails:', userDetails);

	const fetchUserDetails = async (address) => {
		const response = await fetch(`${BASE_URL}/user/userDetails`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ address }),
		});

		const data = await response.json();

		return data;
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(userDetails.data.walletAddressEthereum);
		setShowCopied(true);
		setTimeout(() => setShowCopied(false), 2000);
	};

	const fetchSolanaBalance = async (key) => {
		try {
			const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');

			const pubKey = new PublicKey(key);
			// console.log("🚀 ~ fetchSolanaBalance ~ pubKey:", pubKey)
			// console.log("connection",  connection);
			const balance = await connection.getBalance(pubKey);
			// console.log("🚀 ~ fetchSolanaBalance ~ balance:", balance)
			const solBalance = (balance / 10 ** 9).toFixed(4);
			setSolanaBalance((balance / 10 ** 9).toFixed(4)); // Convert lamports to SOL
			return solBalance;
		} catch (error) {
			console.log(error);
			return 0;
		}
	};

	const handleDeposit = async () => {
		const destinationAddr =
			manualAddress || userDetails?.user?.walletAddressEthereum;

		if (selectedChains === 'solana') {
			try {
				if (!publicKey) {
					alert('Please connect your Solana wallet.');
					return;
				}
				const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');
				const transaction = new Transaction().add(
					SystemProgram.transfer({
						fromPubkey: publicKey,
						toPubkey: new PublicKey(userDetails.user.walletAddressSolana),
						lamports: parseFloat(depositAmount) * 10 ** 9, // Convert SOL to lamports
					})
				);
				const { blockhash } = await connection.getRecentBlockhash();
				transaction.recentBlockhash = blockhash;
				transaction.feePayer = publicKey;
				const signedTransaction = await signTransaction(transaction);
				const signature = await connection.sendRawTransaction(
					signedTransaction.serialize()
				);
				await connection.getTransaction(signature);
				alert(`Transaction successful! Signature: ${signature}`);
			} catch (error) {
				console.error('Deposit failed:', error.message);
				setError(error.message);
				// alert('Deposit failed. Check console for details.');
			}
		} else {
			console.log('🚀 ~ handleDeposit ~ selectedChains:', selectedChains);
			try {
				console.log('🚀 ~ handleDeposit ~ depositAddress:', depositAddress);
				console.log('🚀 ~ handleDeposit ~ address:', address);
				sendTransaction({
					chainId: CurrentChainID,
					from: address,
					to: userDetails.user.walletAddressEthereum,
					value: parseEther(depositAmount),
				});
			} catch (error) {
				console.error('Deposit failed:', error);
				console.error('Deposit failed:', error.message);

				// alert('Deposit failed. Check console for details.');
			}
		}
	};

	useEffect(() => {
		const chainIdMapping: { [key: number]: string } = {
			1: 'Ethereum',
			11155111: 'Sepolia',
			421614: 'ArbitrumTestnet',
			42161: 'Arbitrum',
			137: 'Polygon',
			10: 'Optimism',
			8453: 'Base',
		};

		const chainName = chainIdMapping[CurrentChainID];
		if (chainName) {
			setSelectedChains(chainName);
		} else {
			setSelectedChains('solana'); // Default to solana if chain ID is not in the mapping
		}
	}, [CurrentChainID]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="bg-[#171717] border border-gray-500/50 shadow-white/30 w-[90%] max-w-lg rounded-lg p-6 relative"
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.9 }}
					>
						{/* Close Button */}
						<button
							onClick={onClose}
							className="absolute top-2 right-2 text-gray-400 hover:text-white"
						>
							✕
						</button>

						{/* Modal Title */}
						<h2 className="text-white text-xl font-semibold mb-4">Deposit</h2>

						{/* Tabs */}
						<div className="flex border-b border-gray-700 mb-4">
							{[
								{ key: 'transfer', label: 'Transfer manually' },
								{ key: 'wallet', label: 'Pay with a wallet' },
								{ key: 'crypto', label: 'Buy Crypto' },
							].map((tab) => (
								<button
									key={tab.key}
									className={`flex-1 py-2 text-center text-sm font-medium ${
										activeTab === tab.key
											? 'text-white border-b-2 border-purple-500'
											: 'text-gray-400'
									}`}
									onClick={() => setActiveTab(tab.key)}
								>
									{tab.label}
								</button>
							))}
						</div>

						{/* Content */}
						{activeTab === 'transfer' && (
							<div>
								{/* Network Selection */}
								<div className="mb-4">
									<label className="text-gray-400 text-sm mb-2 block">
										Network
									</label>
									<select
										value={selectedNetwork}
										onChange={(e) => setSelectedNetwork(e.target.value)}
										className="w-full bg-[#2c2c2c] text-white border border-gray-700 rounded-md px-4 py-2"
									>
										<option>Solana</option>
										<option>Ethereum</option>
										<option>Polygon</option>
									</select>
								</div>

								{/* Balance Display */}
								<div className="mb-4">
									<p className="text-gray-400 text-sm">Balance</p>
									<p className="text-white text-lg">0 {selectedNetwork}</p>
								</div>

								{/* Deposit Instructions */}
								<div className="p-4 bg-gray-800/50 rounded-md text-sm text-gray-400 mb-4">
									Please make sure that you are depositing tokens to this
									address on the {selectedNetwork} network.
								</div>

								{/* QR Code and Address */}
								<div className="flex items-center justify-between gap-4">
									{/* <QRCode
                    value={depositAddress}
                    size={100}
                    bgColor="#171717"
                    fgColor="#ffffff"
                  /> */}
									<div className="flex-1">
										<p className="text-gray-400 text-sm mb-1">
											Deposit Address
										</p>
										<p className="text-white text-sm bg-gray-800/50 rounded-md px-3 py-2 flex items-center justify-between">
											{depositAddress}
											<button
												onClick={copyToClipboard}
												className="text-gray-400 hover:text-white ml-2"
											>
												<Copy size={16} />
											</button>
										</p>
										{showCopied && (
											<p className="text-green-400 text-xs mt-1">
												Address copied!
											</p>
										)}
									</div>
								</div>
							</div>
						)}

						{activeTab === 'wallet' && (
							<div>
								<div className="flex items-center justify-between ">
									<div>
										<h1 className="text-white">Network</h1>
										<Select
											dir="ltr"
											onValueChange={handleChainChange}
											defaultValue={selectedChains}
											// value={selectedChains}
										>
											<SelectTrigger
												data-side="bottom"
												className="w-[180px] bg-black text-white border-none"
											>
												<SelectValue
													placeholder="Select a Network"
													className="text-white bg-black"
												/>
											</SelectTrigger>
											<SelectContent
												side="bottom"
												align="start"
												className="border-none bg-black text-white !absolute !top-full !mt-1 !z-50"
											>
												<SelectGroup className="">
													{chains.map((chain) => (
														<SelectItem key={chain.id} value={chain.name}>
															{chain.name}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>

									<div>
										<h1 className="text-white">Balance</h1>
										<input
											type="number"
											className="w-[180px] bg-black text-white border-none p-1 px-3 rounded-md"
											placeholder="0.0"
											value={
												selectedChains === 'solana'
													? solanaBalance
													: MetaMaskBalance?.value.toString() == undefined
														? 0
														: formatUnits(
																MetaMaskBalance?.value,
																MetaMaskBalance?.decimals
															).slice(0, 5)
											}
											readOnly
										/>
									</div>
								</div>

								{selectedChains === 'solana' ? (
									<div className="bg-[#1f1f1f] rounded-md p-3 mt-4">
										<div className="flex items-center justify-between border border-neutral-700 rounded-md">
											<WalletMultiButton
												style={{
													background: 'transparent',
													color: 'white',
													padding: 0,
													paddingLeft: 10,
												}}
											/>
											<button
												onClick={() => disconnect()}
												className="text-white rounded-md px-4 py-2"
											>
												Disconnect
											</button>
										</div>

										{connected && (
											<div>
												<div className="flex items-center gap-4 justify-between bg-[#292929] my-2 rounded-md p-2">
													<div className="flex items-center flex-col">
														<div className="flex  gap-4">
															<img
																src="https://pbs.twimg.com/profile_images/1472933274209107976/6u-LQfjG_400x400.jpg"
																width={30}
																height={30}
																alt="ico"
																className="rounded-lg"
															/>
															<h1 className="text-white">Sol</h1>
														</div>
														{/* <ChevronDown /> */}
													</div>
													<div className="flex flex-col gap-3">
														<div className="flex gap-4 text-xs">
															<p className="text-gray-400">Available</p>
															<p className="text-white"> {solanaBalance} SOl</p>
														</div>
														<div className="flex items-center justify-between  ">
															<input
																type="number"
																className="bg-[#2c2c2c] text-white border border-gray-700 rounded-md px-4 py-2 w-20"
																value={depositAmount}
																onChange={(e) =>
																	setDepositAmount(e.target.value)
																}
															/>
															<p className="mx-auto text-purple-500 ">MAX</p>
														</div>
													</div>
												</div>
												<div>
													<Button
														className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md w-full hover:bg-purple-400"
														onClick={handleDeposit}
													>
														Deposit
													</Button>
												</div>
											</div>
										)}

										{error && (
											<div className="text-red-500">
												User has rejected the request
											</div>
										)}
									</div>
								) : (
									<>
										{isConnected ? (
											<div className="bg-[#1f1f1f] rounded-md p-3 mt-4">
												<div className="flex items-center justify-between text-white border border-neutral-700 p-2 rounded-md">
													<h1>{truncateAddress(address)}</h1>
													<button
														className="px-2 py-1"
														onClick={() => MetaMaskDisconnect()}
													>
														Disconnect
													</button>
												</div>

												<div className="text-white flex justify-between items-center my-2 bg-[#292929] rounded-md p-2">
													<div>
														<div>{selectedChains}</div>
														{/* <ChevronDown /> */}
													</div>
													<div className="flex items-end flex-col justify-center">
														<p className="text-xs flex items-center gap-3">
															<span className="text-gray-400">Available</span>
															<span className="flex gap-2">
																{MetaMaskBalance &&
																	formatUnits(
																		MetaMaskBalance?.value,
																		MetaMaskBalance?.decimals
																	).slice(0, 5)}
																<span>ETH</span>
															</span>
														</p>
														<div className="flex justify-between items-center my-2">
															<input
																type="number"
																className="bg-[#2c2c2c] text-white p-1 px-3 rounded-md w-20 border border-gray-700"
																placeholder="0"
																value={depositAmount}
																onChange={(e) =>
																	setDepositAmount(e.target.value)
																}
															/>
															<p className="mx-1">MAX</p>
														</div>
													</div>
												</div>
												<button
													className="mt-2 px-4 w-full py-2 bg-purple-500 text-white rounded-md"
													onClick={() => handleDeposit()}
												>
													Deposit
												</button>
											</div>
										) : (
											<div className="text-gray-400 text-center grid grid-cols-2 place-items-start">
												<WalletButton wallet="metamask" />
												<WalletButton wallet="rainbow" />
												<WalletButton wallet="coinbase" />
												<WalletButton wallet="walletconnect" />
											</div>
										)}
									</>
								)}
							</div>
						)}

						{activeTab === 'crypto' && (
							<div className="text-gray-400 text-center">
								<p>Use a payment method to buy crypto directly.</p>
								{/* Example content */}
								<button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md">
									Buy Crypto
								</button>
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

// const Context = ({children}) => {
//     // const network = WalletAdapterNetwork.Devnet;
//     // const endpoint = useMemo(() => clusterApiUrl(network), [network])

//     return (

//             {children}

//     )
//   }

//   const Content = () => {
//     return (
//       <div className="App">
//         <WalletMultiButton />
//       </div>
//     );
//   }
