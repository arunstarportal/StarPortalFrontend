"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Wallet,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SidebarData = [
  { label: "Ethereum", icon: "eth", tvl: "$48.2B", change: "+2.4%" },
  { label: "Tron", icon: "tron", tvl: "$12.8B", change: "+1.2%" },
  { label: "Solana", icon: "solona", tvl: "$8.4B", change: "-0.8%" },
  { label: "Base", icon: "base", tvl: "$2.1B", change: "+5.6%" },
  { label: "Arbitrum", icon: "arbitrum", tvl: "$3.7B", change: "+3.1%" },
];

const QuickActions = [
  { label: "Analytics", icon: Activity },
  { label: "Wallet", icon: Wallet },
  { label: "Settings", icon: Settings },
  { label: "Support", icon: HelpCircle },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<any>(false);
  const [activeChain, setActiveChain] = useState<any>(0);
  const [isHovered, setIsHovered] = useState<any>(null);
  const router = useRouter();

  // Keyboard shortcut to toggle sidebar
  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.ctrlKey && e.key === "b") {
        setIsCollapsed((prev: any) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="bg-black h-screen py-5 transition-all duration-500 relative border-r-[0.5px] border-gray-700/50 shadow-2xl flex flex-col z-50"
    >
      {/* Collapse Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-5 -right-4 text-white border border-gray-900 flex items-center justify-center rounded-full w-7 h-7 bg-gray-800/60 hover:bg-gray-700 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </motion.button>

      {/* Logo */}
      <motion.div
        className="text-white border-b-[0.5px] border-gray-700/70 px-5 pb-5 flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
      >
        <motion.img
          src={isCollapsed ? "/logo.png" : "/logoFull.png"}
          alt="Logo"
          onClick={() => router.push("/")}
          className={` transition-all duration-300 cursor-pointer ${
            isCollapsed ? "w-10 h-10" : "w-3/4 h-auto"
          }`}
        />
      </motion.div>

      {/* Network Stats */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-5 my-4 p-3 bg-gray-800/20 rounded-lg overflow-hidden"
        >
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Network Status</span>
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Active
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500">Gas: 32 Gwei</div>
        </motion.div>
      )}

      {/* Chains Section */}
      <div className="px-5 mb-2 overflow-hidden">
        <div
          className={`text-gray-300 py-3 flex items-center gap-3 transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && <p className="font-semibold text-sm">NETWORKS</p>}
          <img src="/svgs/chain.svg" alt="Chains Icon" className="w-4 h-4" />
        </div>

        {/* Chain List */}
        <ul className="space-y-2">
          {SidebarData.map((chain, index) => (
            <motion.li
              key={index}
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
              onClick={() => setActiveChain(index)}
              whileHover={{ scale: 1.02 }}
              className={`relative flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300
                ${
                  activeChain === index
                    ? "bg-purple-500/10 text-purple-400"
                    : "hover:bg-gray-800/30 text-gray-300"
                }`}
            >
              <img
                src={`/svgs/${chain.icon}.svg`}
                alt={`${chain.label} Icon`}
                className={`w-6 h-6 transition-all duration-300 ${
                  isCollapsed ? "mx-auto" : ""
                }`}
              />

              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="flex flex-col"
                >
                  <span className="text-sm font-medium">{chain.label}</span>
                  <span className="text-xs text-gray-500">
                    TVL: {chain.tvl}
                  </span>
                </motion.div>
              )}

              {!isCollapsed && (
                <span
                  className={`ml-auto text-xs ${
                    chain.change.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {chain.change}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && isHovered === index && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-2 px-3 py-2 bg-gray-800 rounded-lg text-sm text-white whitespace-nowrap z-50"
                >
                  {chain.label}
                  <div className="text-xs text-gray-400">TVL: {chain.tvl}</div>
                </motion.div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="mt-auto px-5">
        {!isCollapsed && (
          <p className="text-xs font-medium text-gray-500 mb-2 px-3">
            QUICK ACTIONS
          </p>
        )}
        <div className="space-y-1">
          {QuickActions.map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 transition-all duration-300 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <action.icon size={18} />
              {!isCollapsed && <span className="text-sm">{action.label}</span>}
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-gray-400 text-xs border-t border-gray-700/50 mt-4 pt-4">
          {!isCollapsed ? (
            <div className="space-y-2">
              <p className="text-center">
                Powered by{" "}
                <span className="text-gray-200 font-semibold">
                  Starportal.co
                </span>
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <kbd className="px-2 py-1 bg-gray-800/50 rounded text-xs">
                  Ctrl
                </kbd>
                <span>+</span>
                <kbd className="px-2 py-1 bg-gray-800/50 rounded text-xs">
                  B
                </kbd>
                <span>to toggle sidebar</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <ExternalLink size={16} className="text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
