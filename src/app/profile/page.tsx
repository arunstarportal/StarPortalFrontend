'use client';
import React, { useEffect, useState } from 'react';
import {
	Check,
	X,
	LogOut,
	Shield,
	Key,
	Globe,
	Twitter,
	User,
	Mail,
	QrCode,
	Lock,
	Wallet,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { BASE_URL } from '@/Config';
import axios from 'axios';
import { useConnectModal} from '@rainbow-me/rainbowkit';
import { useSession } from 'next-auth/react';
import useVerifyFromBackend from '@/hooks/useVerifyToken';
import { SiweMessage } from 'siwe';
import { useAccount, useSignMessage } from 'wagmi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';




const SettingsPage = () => {
	const [qrImage, setQrImage] = useState(null);
	const [activeTab, setActiveTab] = useState('profile');
	const [facode, setFaCode] = useState(null);
	const [FAenabled, setFAenalbed] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: sessionToken, status: connectionStatus } = useSession();

  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  console.log("🚀 ~ SettingsPage ~ userData:", userData)

  const {address, isConnected} = useAccount();
    console.log("🚀 ~ SettingsPage ~ address:", address)
    const { signMessageAsync } = useSignMessage();




    const router = useRouter();

    useEffect(() => {

      const userData = JSON.parse(localStorage.getItem('star_authTokens'));
      console.log("🚀 ~ useEffect ~ userData:", userData)
      const userAddress = userData?.address == null || undefined ? address : userData.metamaskAddress

      const fetchUserDetails = async () => {
        try {
          const paylaod = {
            address: userAddress,
            email: userData?.emailAddress
          }

          // Make a request to the backend to get user details
          const response = await axios.post(
            `${BASE_URL}/user/userDetails`,
            paylaod
          );
  
          if (response.status === 200) {
            console.log("useEffect response data",response.data);
            setUserData(response.data.user);
          }
        } catch (error) {
          console.log('Error fetching user details:', error);
          setError('Failed to fetch user details');
        }
      };
  

      if(address || userData?.emailAddress){

        fetchUserDetails();
      }

    }, [address]);
  

	const enableTwoFA = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('star_authTokens')).token;
			console.log("🚀 ~ enableTwoFA ~ token:", token)
			if (!token) {
				console.error('Authorization token is missing.');
				return;
			}

			const response = await axios.post(
				`${BASE_URL}/user/setup2fa`,
				{},
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			);

			const data = response.data;
			if (data.qrCodeUrl) {
				setQrImage(data.qrCodeUrl);
			}
		} catch (error) {
			console.error('Error enabling 2FA:', error);
		}
	};

	const confirm2FA = async () => {
		const token = JSON.parse(localStorage.getItem('star_authTokens')).token;
		if (!facode) return;
		try {
			const response = await axios.post(
				`${BASE_URL}/user/confirm2fa`,
				{
					otp: facode,
				},
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			);
			const data = response.data;
			if (response.status == 200) {
				console.log('2FA enabled');
			}
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const { openConnectModal } = useConnectModal();





	const connection = [
		{
			name: 'Email',
			icon: <Mail className="text-blue-500" size={24} />,
			connected: userData?.emailAddress   ? true : false,
		},
		{
			name: 'Google',
			icon: <Globe className="text-green-500" size={24} />,
			connected: true,
		},
		{
			name: 'Twitter',
			icon: <Twitter className="text-blue-400" size={24} />,
			connected: false,
		},
		{
			name: 'wallet',
			icon: <Wallet className="text-yellow-500" size={24} />,
			connected: userData?.metamaskAddress ? true : false,
		},
	];


 // Conditionally filter connections based on the sessionToken
 const filteredConnections = connection.filter((item) => {
   if (!sessionToken) return true; // Show all items if sessionToken is null
   if (sessionToken.user.address) {
     // Hide wallet if address exists
    return item.name !== 'wallet' && item.name !== 'Google';
  }
  // Hide Email and Google if sessionToken has user but no address
  if (sessionToken.user.email) {
    return item.name !== 'Email' && item.name !== 'Google';
  }
  return true;
});


	const handleClick = async (accountName: string) => {
		if (accountName === 'wallet') {


        if (openConnectModal) {
            await openConnectModal();
          } else {
            console.log("aslskldfkads")
            const message = new SiweMessage({
              domain: window.location.host,
              address: address,
              statement: 'Sign in with Ethereum to the app.',
              uri: window.location.origin,
              version: '1',
              chainId: 1,
              // nonce: await fetch('/api/auth/csrf').then((res) => res.text()),
            });
            console.log('🚀 ~ handleConnectWal ~ message:', message);
      
            const signature = await signMessageAsync({
              message: message.prepareMessage(),
              account: address,
            });

           const userData =  JSON.parse(localStorage.getItem('star_authTokens'));


            const res = await axios.post(`${BASE_URL}/user/linkVerifyOAuth`, {
              address: address,
              signature: signature,
              message: JSON.stringify(message),
              emailAddress: userData.emailAddress
            })

            if (res.status == 200) {
              console.log('wallet connected and updated in mongo');
              setOpenEmailModal(false);
              router.refresh();
            }


      
          }


		}

     if(accountName === 'Email'){
      setOpenEmailModal(true);

      console.log('email clicked');


    }
	};



  const handleEmailLink = async () =>{

    try {
      const res = await axios.post(`${BASE_URL}/user/linkVerifyOAuth`, {
        email: email,
        password: password,
        address: address
      })

      if(res.status == 200){
        console.log('email connected and updated in mongo');
      }
    } catch(err){
      console.log(err)
    }
  }



	const renderContent = () => {
		switch (activeTab) {
			case 'profile':
				return (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-6"
					>
						{/* Profile Details */}
						<div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-2xl border border-gray-800 shadow-xl">
							<div className="flex items-center gap-6">
								<div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
									<User className="text-white" size={48} />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-white">John Doe</h2>
									<p className="text-gray-400">johndoe@example.com</p>
									<div className="mt-2 flex items-center gap-3">
										<span className="text-sm text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
											Verified
										</span>
										<span className="text-sm text-gray-400">
											Joined: June 2024
										</span>
									</div>
								</div>
							</div>
						</div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="space-y-6"
						>
							{/* Two-Factor Authentication */}
							<div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-2xl border border-gray-800 shadow-xl">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<Shield className="text-purple-500" size={32} />
										<div>
											<h3 className="text-xl font-bold text-white">
												Two-Factor Authentication
											</h3>
											<p className="text-gray-400 text-sm">
												Add an extra layer of security to your account
											</p>
										</div>
									</div>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={enableTwoFA}
										className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all duration-300"
									>
										{qrImage ? 'Regenerate' : 'Set Up'}
									</motion.button>
								</div>
								{qrImage && (
									<motion.div
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										className="mt-6 flex flex-col items-center justify-center bg-white/10 p-6 rounded-xl shadow-md"
									>
										<img
											src={qrImage}
											alt="2FA QR Code"
											className="w-64 h-64 rounded-lg shadow-2xl mb-6"
										/>
										<input
											className="text-black p-2 rounded-lg bg-white/20 w-64"
											type="text"
											value={facode}
											onChange={(e) => setFaCode(e.target.value)}
										/>
										<button
											onClick={confirm2FA}
											className="text-white bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg mt-4"
										>
											Verify Code
										</button>
									</motion.div>
								)}
							</div>

							{/* Account Linking */}
							<div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-2xl border border-gray-800 shadow-xl">
								<div className="flex items-center gap-4 mb-6">
									<Key className="text-purple-500" size={32} />
									<div>
										<h3 className="text-xl font-bold text-white">
											Account Connections
										</h3>
										<p className="text-gray-400 text-sm">
											Manage your connected accounts
										</p>
									</div>
								</div>
								<div className="grid grid-cols-3 gap-6">
									{filteredConnections.map((account) => (
										<motion.div
											key={account.name}
											whileHover={{ scale: 1.05 }}
											className="bg-[#2a2a2a] p-4 rounded-xl flex items-center justify-between"
										>
											<div className="flex items-center gap-3">
												{account.icon}
												<span className="text-white">{account.name}</span>
											</div>
											{account.connected ? (
												<motion.button
													whileTap={{ scale: 0.95 }}
													className="px-3 py-1  bg-green-600/10 text-green-500  rounded-lg text-sm"
													// onClick={() => handleClick(account.name)}
												>
													Connected
												</motion.button>
											) : (
												<motion.button
													whileTap={{ scale: 0.95 }}
													className="px-3 py-1 bg-red-600/10 text-red-500  rounded-lg text-sm"
                          onClick={() => handleClick(account.name)}
												>
													Connect
												</motion.button>
											)}
										</motion.div>
									))}
                  <AlertDialog open={openEmailModal}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Enter your email and password</AlertDialogTitle>
                      <AlertDialogDescription>
                          <input
                            type="email"
                            placeholder="Email"
                            className="p-2 rounded-lg bg-[#2a2a2a] text-white"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            className="p-2 rounded-lg bg-[#2a2a2a] text-white"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setOpenEmailModal(false)} >Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleEmailLink()}  >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
								</div>
							</div>
						</motion.div>
					</motion.div>
				);
			case 'referrals':
				return (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-6"
					>
						<div className="w-full h-[10rem] object-cover">
							<img
								src="/referralimg.png"
								alt=""
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-2xl border border-gray-800 shadow-xl">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-xl font-bold text-white">
										Turn Your Connections into Rewards!
									</h3>
									<p className="text-gray-400 text-sm">
										Invite your friends to join and earn exclusive rewards for
										every successful referral.
									</p>
								</div>
							</div>
							<div className="mt-6">
								<div className="flex items-center justify-between bg-[#2a2a2a] p-4 rounded-xl">
									<span className="text-white font-medium">STAR23XPLR</span>
									<div className="flex items-center gap-2">
										<a
											href="https://starportal.app/referral/STAR23XPLR"
											target="_blank"
											rel="noopener noreferrer"
											className="text-purple-500 hover:text-purple-600 transition-colors duration-300"
										>
											https://starportal.app/referral/STAR23XPLR
										</a>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="px-3 py-1 bg-purple-600/10 text-purple-500 rounded-lg text-sm"
										>
											Copy
										</motion.button>
									</div>
								</div>
								<div className="mt-4 text-gray-400 text-sm">
									<p>
										Earn a percentage of rewards from direct referrals and any
										people they refer
									</p>
									<p>Your referrals get a 10% fee discount</p>
								</div>
							</div>
						</div>
					</motion.div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white">
			<div className="max-w-5xl mx-auto py-12 px-4">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-10"
				>
					<h1 className="text-3xl font-bold text-white mb-2">
						Account Settings
					</h1>
					<p className="text-gray-400">
						Manage your account preferences and security
					</p>
				</motion.div>

				{/* Tabs */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="flex gap-6 mb-8 border-b border-gray-800 pb-1"
				>
					{[
						{
							name: 'Profile',
							key: 'profile',
							icon: <User className="mr-2" size={18} />,
						},
						{
							name: 'Referrals',
							key: 'referrals',
							icon: <Shield className="mr-2" size={18} />,
						},
					].map((tab) => (
						<motion.button
							key={tab.key}
							whileHover={{ scale: 1.05 }}
							onClick={() => setActiveTab(tab.key)}
							className={`flex items-center pb-2 ${
								activeTab === tab.key
									? 'text-purple-500 border-b-2 border-purple-500'
									: 'text-gray-400 hover:text-white'
							}`}
						>
							{tab.icon}
							{tab.name}
						</motion.button>
					))}
				</motion.div>

				{/* Content */}
				{renderContent()}

				{/* Logout */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mt-10 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-2xl border border-gray-800 shadow-xl"
				>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-xl font-bold text-white">Log Out</h3>
							<p className="text-gray-400 text-sm">
								Securely exit your account
							</p>
						</div>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => console.log('Logged out')}
							className="px-6 py-3 bg-[#E54243] hover:bg-red-700 text-white rounded-xl flex items-center gap-2 transition-all duration-300"
						>
							<LogOut size={18} />
							Log Out
						</motion.button>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default SettingsPage;
