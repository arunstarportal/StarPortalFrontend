"use client";
import { useState, useEffect, useRef } from "react";
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
  MoveRight,
  ArrowUpRight,
} from "lucide-react";
import { protocolData } from "@/data";
import { useRouter } from "next/navigation";

interface header {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

export const Header = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProtocols, setFilteredProtocols] = useState<any>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const searchResults = protocolData.filter((protocol) =>
      protocol.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProtocols(searchResults.slice(0, 5)); // Limit to 5 results
  }, [searchTerm]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRecommendationClick = (protocol: any) => {
    router.push(`/${protocol.category.toLowerCase()}/${protocol.slug}`);
    setSearchTerm("");
    setFilteredProtocols([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleNavigation();
    }
  };

  const handleNavigation = () => {
    const matchingProtocol = protocolData.find(
      (protocol) => protocol.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (matchingProtocol) {
      router.push(
        `/${matchingProtocol.category.toLowerCase()}/${matchingProtocol.slug}`
      );
      setSearchTerm("");
      setFilteredProtocols([]);
    }
  };

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
    <div className="relative z-50 pb-2">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between gap-4 backdrop-blur-md "
      >
        <div className="relative flex-1 max-w-xl" ref={searchContainerRef}>
          <motion.div className="relative">
            <motion.div
              whileHover={{ scale: 1.005 }}
              className={`relative transition-all duration-300 `}
            >
              <input
                ref={inputRef}
                type="text"
                className="text-white w-full pl-12 pr-14 py-3 bg-[#171717] rounded-xl border border-gray-800 focus:border-purple-500/50 outline-none transition-all duration-300"
                placeholder="Search protocols, tokens, addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputFocused(true)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleNavigation}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-900 p-2 rounded-lg transition-all duration-300"
                >
                  <MoveRight className="text-white w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
            <AnimatePresence>
              {isInputFocused && searchTerm && filteredProtocols.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-2 w-full bg-[#171717] border border-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-2">
                    {filteredProtocols.map((protocol: any, index: number) => (
                      <motion.div
                        key={protocol.slug}
                        onClick={() => handleRecommendationClick(protocol)}
                        className={`flex items-center gap-4 p-3 hover:bg-gray-800/50 rounded-lg cursor-pointer group transition-all ${
                          index !== filteredProtocols.length - 1
                            ? "border-b border-gray-800"
                            : ""
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={`/svgs/${protocol.icon}.svg`}
                            alt={protocol.name}
                            className="w-10 h-10 rounded-lg p-2 bg-gray-800/50 group-hover:bg-gray-700/50 transition-all"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white flex items-center gap-2">
                            {protocol.name}
                            <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all" />
                          </p>
                          <p className="text-sm text-gray-400">
                            {protocol.category}
                          </p>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                          <div className="px-3 py-1 text-xs text-purple-400 bg-purple-500/10 rounded-full">
                            View
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
