"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BASE_URL } from "@/Config";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserProfileData } from "../../../redux/userProfileSlice";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { AppWindowMac, Lock, Mail } from "lucide-react";
import { signOut } from "next-auth/react";
import { verifyFromBackend } from "@/Config/verifyToken";
import useVerifyFromBackend from "@/hooks/useVerifyToken";
import { useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const { data: sessionToken, status: connectionStatus } = useSession();

  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  useVerifyFromBackend(sessionToken);

  const { connectModalOpen, openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleSubmit = async () => {
    if (!email && !password) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        emailAddress: email,
        password: password,
        refCode: referralCode || undefined,
      };

      const response = await axios.post(`${BASE_URL}/user/signup`, payload);

      if (response.status === 201) {
        const data = response.data;

        const userData = {
          token: data.token,
          eth_Address: data.ethereumWalletAddress,
          sol_Address: data.solanaWalletAddress,
          name: "Star User",
          profileIcon: null,
          is2faEnbaled: false,
          email: data.emailAddress,
        };

        localStorage.setItem("star_authTokens", JSON.stringify(userData));

        await dispatch(setUserProfileData(data));

        router.push("/");
        toast({
          title: "Successfull",
          description: "Account created successfully",
          variant: "default",
        });
      }
    } catch (error) {
      console.log("Error during signup:", error);
      toast({
        title: "Error Signing Up",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log("Google Sign-In Error:", error);
      toast({
        title: "Google Sign-In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleConnectWallet = async () => {
    try {
      if (openConnectModal) {
        await openConnectModal();
      } else {
        const message = new SiweMessage({
          domain: window.location.host,
          address: address,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: 1,
          // nonce: await fetch('/api/auth/csrf').then((res) => res.text()),
        });

        const signature = await signMessageAsync({
          message: message.prepareMessage(),
          account: address,
        });

        signIn("credentials", {
          message: JSON.stringify(message),
          signature,
          redirect: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (connectionStatus === "authenticated") {
  //     verifyFromBackend(sessionToken, dispatch, router, signOut);
  //   }
  // }, [sessionToken]);

  return (
    <div className="flex h-screen overflow-hidden items-center justify-center min-h-screen bg-gradient-to-br from-[#000000] to-[#222222]">
      {/* Left Side - Immersive Visual */}
      <div className="h-screen w-1/2 relative">
        {/* Logo  */}
        <div
          onClick={() => router.push("/")}
          className="absolute top-5 left-7 w-44 h-auto cursor-pointer z-50"
        >
          <img
            src="/logoFull.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full h-full overflow-hidden border-[#292929] border-r rotate-6 scale-110 relative bottom-5 right-5">
          <img
            src="/v2.jpeg"
            alt=""
            className="w-full h-full scale-150 relative right-44 opacity-10"
          />
        </div>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-medium text-[4.9rem] w-[60%] text-center tracking-wide leading-snug">
          Start your Defi journey Today.
        </p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="h-screen w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center space-y-6 mb-8">
            <img
              src="/logo.png"
              alt="Platform Logo"
              className="w-24 h-24 mx-auto object-contain"
            />
            <h1 className="text-3xl font-bold text-white">
              Create Your Account
            </h1>
            <p className="text-white/60">
              Start your decentralized finance journey today
            </p>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 my-4"
            >
              {/* Email Input with Enhanced Style */}
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 pl-10 rounded-lg 
                    bg-[#2c2c2c] 
                    border border-transparent 
                    text-white 
                    placeholder-white/50 
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 
                    transition duration-300 
                    group-hover:border-white/20
                    peer"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail
                  className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 
                    text-white/50 
                    peer-focus:text-blue-500 
                    transition duration-300"
                />
              </div>

              {/* Password Input with Enhanced Style */}
              <div className="relative group">
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full p-4 pl-10 rounded-lg 
                    bg-[#2c2c2c] 
                    border border-transparent 
                    text-white 
                    placeholder-white/50 
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 
                    transition duration-300 
                    group-hover:border-white/20
                    peer"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock
                  className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 
                    text-white/50 
                    peer-focus:text-blue-500 
                    transition duration-300"
                />
              </div>

              {/* Referral Code Input with Enhanced Style */}
              <div className="relative group flex items-center justify-between">
                <p className="text-white w-1/2">Referral Code - </p>
                <input
                  type="text"
                  placeholder="Referral Code (Optional)"
                  className="w-full px-4 py-2 pl-11 rounded-lg 
                    bg-[#2c2c2c] 
                    border border-transparent 
                    text-white 
                    placeholder-white/50 
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 
                    transition duration-300 
                    group-hover:border-white/20
                    peer"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
                <AppWindowMac
                  className="w-5 h-5 absolute left-[34%] top-1/2 -translate-y-1/2 
                    text-white/50 
                    peer-focus:text-blue-500 
                    transition duration-300"
                />
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full p-3 rounded-lg 
                bg-gradient-to-r from-blue-600 to-purple-600 
                hover:from-blue-700 hover:to-purple-700 
                text-white font-semibold 
                transition duration-300 
                transform hover:scale-[1.01] 
                active:scale-[0.99]"
            >
              Create Account
            </motion.button>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-white/20"></div>
              <span className="px-4 text-white/60">Or signup with</span>
              <div className="flex-grow h-px bg-white/20"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignIn}
                className="flex font-medium items-center justify-center p-3 rounded-lg bg-[#2c2c2c] border border-white/10 text-white hover:bg-[#3c3c3c] transition duration-300"
              >
                <img src="/svgs/google.svg" alt="" className="mr-1" />
                Google
              </button>
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleConnectWallet()}
                  className="flex font-medium items-center justify-center p-3 rounded-lg bg-[#2c2c2c] border border-white/10 text-white hover:bg-[#3c3c3c] transition duration-300"
                >
                  <img src="/svgs/metamask.svg" alt="" className="mr-1" />
                  <span>Metamask</span>
                </motion.button>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-white/60">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/")}
                  className="text-blue-500 hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
