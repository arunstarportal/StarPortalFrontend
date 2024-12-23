"use client";
import { setUserProfileData } from "@/redux/userProfileSlice";
import { BASE_URL } from "@/Config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import useVerifyFromBackend from "@/hooks/useVerifyToken";
import { useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";

export const Login = ({
  isOpen,
  onClose,
  setIsLoginOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  setIsLoginOpen: (isOpen: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [is2FaEnable, setIs2FaEnable] = useState(false);
  const [faDetails, setFaDetails] = useState(null);
  const [faCode, setFaCode] = useState("");

  const [hasWalletBeenHandled, setHasWalletBeenHandled] = useState(false);

  const { toast } = useToast();
  const { data: sessionToken, status: connectionStatus } = useSession();
  const { connectModalOpen, openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // useVerifyFromBackend(sessionToken);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const walletHandled =
        localStorage.getItem("hasWalletBeenHandled") === "true";
      setHasWalletBeenHandled(walletHandled);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:6900/user/login`, {
        emailAddress: email,
        password: password,
      });
      const data = response.data;
      if (response.status === 200) {
        if (data.is2faEnabled === false) {
          const userData = {
            token: data.token,
            eth_Address: data.ethereumWalletAddress,
            sol_Address: data.solanaWalletAddress,
            is2FaEnable: false,
            emailAddress: data.emailAddress,
          };
          localStorage.setItem("star_authTokens", JSON.stringify(userData));
          await dispatch(setUserProfileData(data));
          setIsLoginOpen(false);
        } else {
          setFaDetails(data);
          setIs2FaEnable(true);
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed",
        description:
          error.response?.data?.message || "An error occurred during login.",
        variant: "destructive",
      });
    }
  };

  const handle2FA = async () => {
    if (!faCode) return;
    try {
      const response = await axios.post(`${BASE_URL}/user/verifyOtp`, {
        token: faDetails.tempToken,
        otp: faCode,
      });
      const data = response.data;
      if (response.status === 200) {
        const userData = {
          token: data.token,
          eth_Address: data.ethereumWalletAddress,
          sol_Address: data.solanaWalletAddress,
          is2FaEnable: false,
          emailAddress: data.emailAddress,
          metamaskAddress: data.metamaskAddress,
        };
        localStorage.setItem("star_authTokens", JSON.stringify(userData));
        await dispatch(setUserProfileData(data));
        setIsLoginOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "2FA Verification Failed",
        description:
          error.response?.data?.message ||
          "Invalid OTP or error during verification.",
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
        });

        const signature = await signMessageAsync({
          message: message.prepareMessage(),
          account: address,
        });

        const res = await signIn("credentials", {
          message: JSON.stringify(message),
          signature,
          redirect: false,
        });

        if (res.status === 200) {
          const response = await axios.post(`${BASE_URL}/user/userDetails`, {
            address: address,
          });
          if (response.data.user.is2faEnabled) {
            setFaDetails(response.data.user);
            setIs2FaEnable(true);
          } else {
            setIsLoginOpen(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Wallet Connection Failed",
        description:
          error.message || "An error occurred while connecting your wallet.",
        variant: "destructive",
      });
    }
  };

  // useEffect(() => {
  //   if (isConnected && !hasWalletBeenHandled) {
  //     setHasWalletBeenHandled(true);
  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("hasWalletBeenHandled", "true");
  //     }
  //     handleConnectWallet();
  //   }
  // }, [isConnected]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 w-screen h-screen bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-[#171717] border border-gray-500/50 shadow-white/30 w-[90%] max-w-md rounded-lg p-8 shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-16 h-16 mx-auto bg-black/70 rounded-full flex items-center justify-center mb-4">
          <img
            src="/svgs/user.svg"
            alt="User Icon"
            className="w-8 h-8 text-gray-400"
          />
        </div>

        <div className="text-center mt-4 mb-8 space-y-2">
          <h2 className="text-2xl font-semibold text-white">
            Good to See You Again!
          </h2>
          <p className="text-gray-400 text-sm">
            First time here?{" "}
            <a href="/auth/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {is2FaEnable ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Code"
              value={faCode}
              onChange={(e) => setFaCode(e.target.value)}
              className="w-full px-4 py-3 bg-[#1f1f1f] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              onClick={handle2FA}
              className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Authorize
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1f1f1f] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1f1f1f] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Log in
            </button>
          </div>
        )}

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-4 text-gray-400 text-sm">or sign up with</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-all"
          >
            <img src="/svgs/google.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConnectWallet}
            className="flex font-medium items-center justify-center p-3 rounded-lg bg-[#2c2c2c] border border-white/10 text-white hover:bg-[#3c3c3c] transition duration-300"
          >
            <img src="/svgs/metamask.svg" alt="" className="mr-1" />
            <span>Metamask</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
