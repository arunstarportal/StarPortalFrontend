"use client";
import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Wallet,
  ChevronDown,
  LogOut,
  Copy,
  ExternalLink,
  Bell,
} from "lucide-react";

export const Header = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}) => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  const truncateAddress = (addr: string) => {
    return `${addr?.slice(0, 6)}...${addr?.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <div className="relative z-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between gap-4 backdrop-blur-md "
      >
        <div className="relative flex-1 max-w-xl">
          <motion.div whileHover={{ scale: 1.01 }} className="relative">
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 bg-[#171717] rounded-xl border border-gray-800 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
              placeholder="Search protocols, tokens, addresses..."
              onChange={(e) => setSearchTerm?.(e.target.value)}
              value={searchTerm}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-400 hover:text-white bg-[#171717] rounded-xl border border-gray-800 transition-all duration-300"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
          </motion.button>

          {/* Wallet Section */}
          {!isConnected ? (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openConnectModal}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20"
                >
                  <Wallet size={20} />
                  <span>Connect Wallet</span>
                </motion.button>
              )}
            </ConnectButton.Custom>
          ) : (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsWalletOpen(!isWalletOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-[#171717] border border-gray-800 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
              >
                <img src={`/svgs/eth.svg`} alt="Network" className="w-5 h-5" />
                <span className="text-gray-200">
                  {truncateAddress(address || "")}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-300 ${isWalletOpen ? "rotate-180" : ""}`}
                />
              </motion.button>

              <AnimatePresence>
                {isWalletOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-[#171717] border border-gray-800 rounded-xl shadow-xl overflow-hidden"
                  >
                    {/* Wallet Balance */}
                    <div className="p-4 border-b border-gray-800">
                      <p className="text-sm text-gray-400">Balance</p>
                      <p className="text-lg font-semibold text-white">
                        {balance?.formatted.slice(0, 7)} {balance?.symbol}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                      <button
                        onClick={copyAddress}
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

                      <a
                        href={`https://etherscan.io/address/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                      >
                        <ExternalLink size={16} />
                        <span>View on Explorer</span>
                      </a>

                      <button
                        onClick={() => {
                          disconnect();
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
          )}
        </div>
      </motion.div>
    </div>
  );
};
