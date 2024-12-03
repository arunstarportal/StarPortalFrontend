"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BASE_URL } from "@/Config";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserProfileData } from "../../redux/userProfileSlice";
import { useAccount, useConnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";

const SignupPage = () => {
  const { address, isConnected } = useAccount();
  const [email, setEmail] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { connectors, connect } = useConnect();

  const handleContinue = () => {
    if (email) {
      setShowPasswordInput(true);
    }
  };

  const handleSubmit = async () => {
    if (!address || (!email && !password)) {
      console.log("Please set the valid details");
    }

    try {
      const payload = address
        ? { metamask: address }
        : {
            emailAddress: email,
            password: password,
          };

      console.log(payload);

      const response = await axios.post(`${BASE_URL}/user/signup`, payload);

      if (response.status === 201) {
        const data = response.data;
        console.log(data);
        const userData = {
          token: data.token,
          eth_Address: data.ethereumWalletAddress,
          sol_Address: data.solanaWalletAddress,
          is2faEnbaled: false,
        };
        localStorage.setItem("star_authTokens", JSON.stringify(userData));
        await dispatch(setUserProfileData(data));
        router.push("/");
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#000000] to-[#222222]">
      {/* Left Side - Immersive Visual */}
      <div className="h-screen w-1/2 border-[#292929] border-r relative">
        <div className="w-full h-full overflow-hidden ">
          <img
            src="/v2.jpeg"
            alt=""
            className="w-full h-full scale-150 relative right-40 opacity-10"
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

          <div className="space-y-4">
            {!showPasswordInput && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg bg-[#2c2c2c] border border-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleContinue}
                  className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition duration-300"
                >
                  Continue
                </button>
              </>
            )}

            {showPasswordInput && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full p-3 rounded-lg bg-[#2c2c2c] border border-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition duration-300"
                >
                  Create Account
                </button>
              </motion.div>
            )}

            {!showPasswordInput && (
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-white/20"></div>
                <span className="px-4 text-white/60">Or signup with</span>
                <div className="flex-grow h-px bg-white/20"></div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button className="flex font-medium items-center justify-center p-3 rounded-lg bg-[#2c2c2c] border border-white/10 text-white hover:bg-[#3c3c3c] transition duration-300">
                <img src="/svgs/google.svg" alt="" className="mr-1" />
                Google
              </button>
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openConnectModal}
                    className="flex font-medium items-center justify-center p-3 rounded-lg bg-[#2c2c2c] border border-white/10 text-white hover:bg-[#3c3c3c] transition duration-300"
                  >
                    <img src="/svgs/metamask.svg" alt="" className="mr-1" />
                    <span>Metamask</span>
                  </motion.button>
                )}
              </ConnectButton.Custom>
            </div>

            <div className="text-center mt-4">
              <p className="text-white/60">
                Already have an account?{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
