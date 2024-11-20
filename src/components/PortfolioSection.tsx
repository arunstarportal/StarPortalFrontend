"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAccount, usePublicClient } from "wagmi";
import { formatEther } from "viem";
import { Wallet } from "lucide-react";
import { mainnet, bsc, arbitrum, avalanche, base, sepolia } from "wagmi/chains";

const chainConfigs = [
  {
    chain: mainnet,
    name: "Ethereum",
    symbol: "ETH",
    icon: "/ethereum.png",
  },
  //   { chain: bsc, name: "BSC", symbol: "BNB", icon: "/svgs/bsc.svg" },
  { chain: base, name: "Base", symbol: "ETH", icon: "/svgs/baseColor.svg" },
  {
    chain: arbitrum,
    name: "Arbitrum",
    symbol: "ETH",
    icon: "/svgs/arbitriumColor.svg",
  },
  {
    chain: avalanche,
    name: "Avalanche",
    symbol: "AVAX",
    icon: "/svgs/avalanche.svg",
  },
  {
    chain: sepolia,
    name: "Sepolia",
    symbol: "ETH",
    icon: "/svgs/eth.svg",
  },
];

const PortfolioSection = () => {
  const { address, isConnected } = useAccount();
  const [balances, setBalances] = useState(
    chainConfigs.map((config) => ({
      name: config.name,
      symbol: config.symbol,
      icon: config.icon,
      balance: "0",
      change: "0%",
    }))
  );

  const [totalBalance, setTotalBalance] = useState(0);
  const publicClients = chainConfigs.map((config) =>
    usePublicClient({ chainId: config.chain.id })
  );

  // Price estimates (you'd replace with real API)
  const priceEstimates = {
    ETH: 2000,
    BNB: 300,
    AVAX: 20,
  };

  useEffect(() => {
    const fetchBalances = async () => {
      if (!isConnected || !address) return;

      let totalUsdBalance = 0;

      const updatedBalances = await Promise.all(
        chainConfigs.map(async (config, index) => {
          try {
            const balanceWei = await publicClients[index].getBalance({
              address,
            });
            const balanceNative = parseFloat(formatEther(balanceWei));

            // Estimate USD value
            const usdValue =
              balanceNative * (priceEstimates[config.symbol] || 0);
            totalUsdBalance += usdValue;

            return {
              ...balances[index],
              balance: balanceNative.toFixed(4),
              usdValue: usdValue.toFixed(2),
            };
          } catch (error) {
            console.error(`Error fetching balance for ${config.name}:`, error);
            return balances[index];
          }
        })
      );

      setBalances(updatedBalances);
      setTotalBalance(totalUsdBalance);
    };

    if (isConnected) fetchBalances();
  }, [address, isConnected]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#171717] rounded-2xl px-6 py-4 my-8 w-[] shadow-xl border border-gray-500/50 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6 mx-4">
        <div className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-gray-400" />
          <h2 className="text-2xl font-bold text-white">Total Balance</h2>
        </div>
        <div className="flex items-end gap-2">
          <h3 className="text-4xl font-bold text-white">
            {totalBalance.toFixed(2)}
          </h3>
          <span className="text-gray-400 mb-1">USD</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-around gap-4 scrollbar-hide overflow-x-scroll">
          {balances.map((token, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 bg-[#222222] rounded-xl p-4 min-w-[200px] hover:bg-[#2a2a2a] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10">
                  <img
                    src={token.icon}
                    alt={token.name}
                    className="w-full h-full rounded-full ring-2 ring-gray-500/20"
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium">{token.name}</h4>
                  <p className="text-gray-500 text-sm">{token.symbol}</p>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                  {token.balance} {token.symbol}
                </span>
                <span className="text-gray-500 text-sm">Balance</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioSection;