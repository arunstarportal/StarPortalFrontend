"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  LogOut,
  ExternalLink,
  Bell,
  BadgeDollarSign,
  History,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/Config";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfileData } from "@/redux/userProfileSlice";
import { Login } from "./LoginModal";
import { LeftHeader } from "./leftHeader";
import useDisconnectUser from "@/hooks/useDisconnectUser";
import { useSession } from "next-auth/react";
import { DepositeModal } from "./DepositeModal";

export const Header = () => {
  const router = useRouter();
  const disconnectUser = useDisconnectUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDepositeOpen, setIsDepositeOpen] = useState(false);

  //@ts-ignore
  const profileData = useSelector((state) => state.userProfile.user);
  const { status } = useSession();

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const dispatch = useDispatch();

  const openLoginModal = () => setIsLoginOpen(true);
  const openDepositeModal = () => setIsDepositeOpen(true);

  const closeLoginModal = () => setIsLoginOpen(false);
  const closeDepositeModal = () => setIsDepositeOpen(false);

  useEffect(() => {
    const userDetails = window.localStorage.getItem("star_authTokens");
    if (userDetails?.length > 0) {
      dispatch(setUserProfileData(JSON.parse(userDetails)));
    }
  }, []);

  const handleDisconnect = () => {
    disconnectUser();
  };

  return (
    <div className="bg-defaultBackground border-b-[0.5px] border-gray-700 h-[4.4rem]">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center z-40 justify-between gap-4 backdrop-blur-md relative px-4 w-full h-full"
      >
        {/* Left Section */}
        <LeftHeader />

        {/* Right Section */}
        <div className="flex z-50 items-center gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 z-50 text-gray-400 hover:text-white bg-[#1a1a1a] rounded-lg border-[.5px] border-gray-500/30 hover:bg-[#222] transition-all duration-300"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
          </motion.button>

          {/* Wallet Section */}
          {profileData || status === "authenticated" ? (
            <div className="relative flex items-center justify-center gap-3">
              {/* Navigation Buttons */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/swap")}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600/80 border-[.5px] border-purple-500/40 rounded-lg text-white hover:bg-purple-500/10 transition-all duration-300"
              >
                Swap
              </motion.button>

              <motion.button
                onClick={openDepositeModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-lg border-[.5px] border-gray-500/30 text-gray-400 hover:text-white hover:bg-[#222] transition-all duration-300"
              >
                Deposit
              </motion.button>

              {/* Profile Button */}
              <motion.button
                onHoverStart={() => setIsWalletOpen(true)}
                onHoverEnd={() => setIsWalletOpen(false)}
                onClick={() => setIsWalletOpen(!isWalletOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-lg border-[.5px] border-gray-500/30 hover:bg-[#222] transition-all duration-300"
              >
                <img src="/svgs/user.svg" alt="" className="w-6 h-6" />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isWalletOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onHoverStart={() => setIsWalletOpen(true)}
                    onHoverEnd={() => setIsWalletOpen(false)}
                    className="absolute right-0 top-full mt-2 w-72 bg-[#1a1a1a] border-[.5px] border-gray-500/30 rounded-xl shadow-xl overflow-hidden"
                  >
                    {/* Connected Status */}
                    <div className="p-4 border-b border-gray-800 flex items-end gap-4">
                      <p className="text-sm font-semibold text-green-400">
                        Connected
                      </p>
                    </div>

                    {/* Dropdown Actions */}
                    <div className="p-2">
                      <button
                        onClick={() => router.push("/portfolio/summary")}
                        className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:bg-[#222] rounded-lg transition-all duration-300"
                      >
                        <BadgeDollarSign size={16} />
                        <span>Portfolio</span>
                      </button>

                      <button
                        onClick={() => router.push("/portfolio/history")}
                        className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:bg-[#222] rounded-lg transition-all duration-300"
                      >
                        <History size={16} />
                        <span>Transaction History</span>
                      </button>

                      <button
                        onClick={() => router.push("/profile")}
                        className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:bg-[#222] rounded-lg transition-all duration-300"
                      >
                        <ExternalLink size={16} />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          handleDisconnect();
                          setIsWalletOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:bg-[#222] rounded-lg transition-all duration-300"
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
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openLoginModal}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/40 to-transparent border-[.5px] border-purple-500/40 rounded-lg text-white hover:bg-purple-500/10 transition-all duration-300"
              >
                <Wallet size={20} />
                <span>Login</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/auth/signup")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/40 to-transparent border-[.5px] border-purple-500/40 rounded-lg text-white hover:bg-purple-500/10 transition-all duration-300"
              >
                <Wallet size={20} />
                <span>Signup</span>
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

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
