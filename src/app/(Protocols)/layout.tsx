"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiReceiveMoney } from "react-icons/gi";
import {
  ChevronDown,
  ChevronUp,
  Settings,
  Zap,
  Shield,
  Layers,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "../globals.css";
import { useRouter } from "next/navigation";

const protocolData = {
  Dexes: [
    {
      id: 1,
      name: "Uniswap",
      icons: "/svgs/uniswap.svg",
      description: "Leading decentralized exchange",
      link: "/dexes/uniswap",
    },
    {
      id: 2,
      name: "SushiSwap",
      icons: "/svgs/sushi.svg",
      description: "Community-driven DEX",
      link: "/dexes/sushiswap",
    },
  ],
  lending: [
    {
      id: 1,
      name: "Aave",
      icons: "/svgs/aave.svg",
      description: "Advanced DeFi lending protocol",
      link: "/lending/aave",
    },
    {
      id: 2,
      name: "Compound",
      icons: "/svgs/compound.svg",
      description: "Algorithmic money markets",
      link: "/lending/compound",
    },
  ],
  liquidRestaking: [
    {
      id: 1,
      name: "EigenLayer",
      icons: "/svgs/eigenLayer.svg",
      description: "Restaking infrastructure",
      link: "/restaking/eigenlayer",
    },
    {
      id: 2,
      name: "EtherFi",
      icons: "/svgs/etherfi.svg",
      description: "Liquid staking solution",
      link: "/restaking/etherfi",
    },
  ],
};

const chains = [
  {
    id: 1,
    name: "Arbitrum",
    icons: "/svgs/arbitriumColor.svg",
    description: "Ethereum Layer 2 scaling solution",
  },
  {
    id: 2,
    name: "Base",
    icons: "/svgs/base.svg",
    description: "Coinbase's Layer 2 network",
  },
  {
    id: 3,
    name: "Ethereum",
    icons: "/svgs/ethereum.svg",
    description: "Primary blockchain network",
  },
  {
    id: 4,
    name: "Sepolia",
    icons: "/svgs/sepolia.svg",
    description: "Ethereum testnet",
  },
];

export default function ProtocolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative text-white">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black to-white/10 -z-10 " />

      {/* Protocol Header Section */}
      <ProtocolHeader />

      {/* Page Content */}
      <div>{children}</div>
    </div>
  );
}

const ProtocolHeader = () => {
  const router = useRouter();
  const [isProtocolDropdownOpen, setProtocolDropdownOpen] = useState(false);
  const [isChainDropdownOpen, setChainDropdownOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(
    protocolData.lending[0]
  );
  const [selectedChain, setSelectedChain] = useState(chains[0]);
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-800/50">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl shadow-lg">
          <GiReceiveMoney className="text-white" size={34} />
        </div>
        <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Lending Protocols
        </h2>
      </motion.div>

      {/* Dropdowns Container */}
      <div className="flex items-center gap-6">
        {/* Protocol Dropdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setProtocolDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl px-4 py-2 transition-all"
          >
            <img
              src={selectedProtocol.icons}
              alt={selectedProtocol.name}
              className="w-8 h-8 object-contain"
            />
            <span className="font-medium text-xl">{selectedProtocol.name}</span>
            {isProtocolDropdownOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </motion.button>

          <AnimatePresence>
            {isProtocolDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-2 bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl p-4 w-64 z-50 border border-gray-700/50"
              >
                {Object.entries(protocolData).map(([category, protocols]) => (
                  <div key={category} className="mb-3">
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
                      {category}
                    </p>
                    {protocols.map((protocol) => (
                      <motion.div
                        key={protocol.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => {
                          router.push(protocol.link);
                          setSelectedProtocol(protocol);
                          setProtocolDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-all"
                      >
                        <img
                          src={protocol.icons}
                          alt={protocol.name}
                          className="w-6 h-6 object-contain"
                        />
                        <div>
                          <span className="text-white font-medium">
                            {protocol.name}
                          </span>
                          <p className="text-xs text-gray-400">
                            {protocol.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Chain Dropdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChainDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl px-4 py-2 transition-all"
          >
            <img
              src={selectedChain.icons}
              alt={selectedChain.name}
              className="w-6 h-6 object-contain"
            />
            <span className="font-medium">{selectedChain.name} Market</span>
            {isChainDropdownOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </motion.button>

          <AnimatePresence>
            {isChainDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-2 bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl p-4 w-64 z-50 border border-gray-700/50"
              >
                {chains.map((chain) => (
                  <motion.div
                    key={chain.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setSelectedChain(chain);
                      setChainDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-all"
                  >
                    <img
                      src={chain.icons}
                      alt={chain.name}
                      className="w-6 h-6 object-contain"
                    />
                    <div>
                      <span className="text-white font-medium">
                        {chain.name}
                      </span>
                      <p className="text-xs text-gray-400">
                        {chain.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
