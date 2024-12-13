"use client";
import { useState, useEffect, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, LogOut, Copy, ExternalLink, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/Config";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfileData } from "@/redux/userProfileSlice";
import { Login } from "./LoginModal";
import { LeftHeader } from "./leftHeader";
import { signOut } from "next-auth/react";
import useDisconnectUser from "@/hooks/useDisconnectUser";
import { copyAddress, truncateAddress } from "@/Config/general";

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

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const dispatch = useDispatch();

  const openLoginModal = () => setIsLoginOpen(true);
  const openDepositeModal = () => setIsDepositeOpen(true);

  const closeLoginModal = () => setIsLoginOpen(false);
  const closeDepositeModal = () => setIsDepositeOpen(false);

  useEffect(() => {
    // getting user details from the localstorage
    const userDetails = window.localStorage.getItem("star_authTokens");
    if (userDetails?.length > 0) {
      // comparing the last login date of the user if fails then disconnect
      console.log("from the local storage :", userDetails);
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
            {profileData ? (
              <div className="relative flex items-center justify-center gap-3">
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
                          onClick={() => router.push("/profile")}
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
                  onClick={() => router.push("/auth/signup")}
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

export const DepositeModal = ({ isOpen, onClose, setIsLoginOpen }) => {
  const [activeTab, setActiveTab] = useState("transfer");
  const [selectedNetwork, setSelectedNetwork] = useState("Solana");
  const [showCopied, setShowCopied] = useState(false);

  const depositAddress = "FDCR2CYdZIRiURCwuFKdiEQE8Wtbkh3yX2GmbfiWKU2D";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(depositAddress);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

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
                { key: "transfer", label: "Transfer manually" },
                { key: "wallet", label: "Pay with a wallet" },
                { key: "crypto", label: "Buy Crypto" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`flex-1 py-2 text-center text-sm font-medium ${
                    activeTab === tab.key
                      ? "text-white border-b-2 border-purple-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            {activeTab === "transfer" && (
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

            {activeTab === "wallet" && (
              <div className="text-gray-400 text-center">
                <p>Connect your wallet to deposit tokens.</p>
                {/* Example button */}
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md">
                  Connect Wallet
                </button>
              </div>
            )}

            {activeTab === "crypto" && (
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
