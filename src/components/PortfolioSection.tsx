"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import axios from "axios";
import { Wallet } from "lucide-react";
import { BASE_URL } from "@/Config";

// Chain configuration types
interface ChainConfig {
  name: string;
  symbol: string;
  icon: string;
}

// Token types
interface TokenBalance {
  name: string;
  symbol: string;
  icon: string;
  balance: string;
  usdValue: number;
  usdPrice: number;
}

// Chain configurations
const chainConfigs: ChainConfig[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "/eth.png",
  },
  {
    name: "Base",
    symbol: "ETH",
    icon: "/svgs/baseColor.svg",
  },
  {
    name: "Arbitrum",
    symbol: "ETH",
    icon: "/svgs/arbitriumColor.svg",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    icon: "/svgs/avalanche.svg",
  },
];

const PortfolioSection: React.FC = () => {
  const { isConnected } = useAccount();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/getUserTokenBalance?address=${"0x7b5c40ab02d16e2ca43d466adf5e3002b436c857"}`
        );

        const data = response.data;

        // Parse data
        const tokens: TokenBalance[] = [];
        let total = 0;

        Object.entries(data).forEach(([chain, details]: any) => {
          if (chain !== "grand_total_balance") {
            details.tokens.forEach((token: any) => {
              tokens.push({
                name: token.name,
                symbol: token.symbol,
                icon: token.logo,
                balance: token.balance,
                usdValue: token.usd_value,
                usdPrice: token.usd_price,
              });
            });
          } else {
            total = details as number;
          }
        });

        setBalances(tokens);
        setTotalBalance(total);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchUserWallet();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#171717] w-[79vw] rounded-2xl px-6 py-4 my-4 shadow-xl border border-gray-500/50 overflow-hidden"
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
        <div className="flex justify-around gap-4 overflow-x-scroll scrollbar-hide">
          {balances.map((token, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 bg-[#222222] rounded-xl p-4 w-[18rem] hover:bg-[#2a2a2a] transition-colors cursor-pointer group"
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
                  {parseFloat(token.balance).toFixed(4)} {token.symbol}
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
