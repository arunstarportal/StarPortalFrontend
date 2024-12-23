"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  Clock,
  Wallet,
} from "lucide-react";
import PortfolioSection from "@/components/HomePortfolio";
import { useSelector } from "react-redux";
import { transactions } from "@/data/SampleDatas";

const CryptoPortfolio = () => {
  // @ts-ignore
  const userPortfolio = useSelector((state) => state.userPortfolio);

  const [parsedTokens, setParsedTokens] = useState([]);
  const [selectedChainOption, setSelectedChainOption] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTokens = () => {
      if (!userPortfolio?.data) return;

      let tokens = [];

      Object.entries(userPortfolio.data).forEach(([chain, chainData]) => {
        if (chain === "grand_total_balance") return;

        if (selectedChainOption === "all" || selectedChainOption === chain) {
          // @ts-ignore
          chainData.tokens.forEach((token) => {
            if (parseFloat(token.balance) > 0) {
              tokens.push({
                ...token,
                chain,
                // @ts-ignore
                chainImage: chainData.chain_image,
              });
            }
          });
        }
      });

      setParsedTokens(tokens);
    };

    fetchTokens();
  }, [userPortfolio, selectedChainOption]);

  const filteredTokens = parsedTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PortfolioSection />

      {/* Available Tokens & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Tokens */}
        <div className="p-6 rounded-xl bg-[#141414] border-[.5px] border-gray-500/50">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Available Tokens</h2>
              <select
                value={selectedChainOption}
                onChange={(e) => setSelectedChainOption(e.target.value)}
                className="flex items-center gap-2 text-gray-300 bg-[#1a1a1a] px-4 py-2 rounded-lg cursor-pointer appearance-none border-[.5px] border-gray-500/30 hover:bg-[#222] transition-colors"
              >
                <option value="all">All Networks</option>
                {Object.keys(userPortfolio?.data || {})
                  .filter((chain) => chain !== "grand_total_balance")
                  .map((chain) => (
                    <option key={chain} value={chain}>
                      {chain.charAt(0).toUpperCase() +
                        chain.slice(1).replace("-", " ")}
                    </option>
                  ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1a1a] rounded-lg border-[.5px] border-gray-500/30 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          <div className="space-y-2 h-[45vh] overflow-y-auto">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <div
                  key={`${token.chain}-${token.token_address}`}
                  className="flex justify-between items-center p-4 rounded-lg bg-[#1a1a1a] hover:bg-[#222] transition-colors border-[.5px] border-gray-500/20"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={token.logo || token.chainImage}
                      alt={token.name}
                      className="w-10 h-10 rounded-full ring-2 ring-purple-500/20"
                    />
                    <div>
                      <p className="font-semibold">{token.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{token.symbol}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-500" />
                        <span className="capitalize">{token.chain}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${parseFloat(token.usd_value).toFixed(2)}
                    </p>
                    <p
                      className={`text-sm flex items-center gap-1 ${token.usd_percentage_change >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {token.usd_percentage_change >= 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {Math.abs(token.usd_percentage_change).toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-4">
                <Wallet className="w-12 h-12 mb-2 opacity-50" />
                <p>No tokens found for the selected network</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="p-6 rounded-xl bg-[#141414] border-[.5px] border-gray-500/50">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-2 h-[55vh] overflow-y-auto">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-[#1a1a1a] border-[.5px] border-gray-500/20 hover:bg-[#222] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <span>{tx.icon}</span>
                  </div>
                  <div>
                    <span className="font-medium">{tx.currency}</span>
                    <p
                      className={`text-sm ${tx.type === "buy" ? "text-green-400" : "text-red-400"}`}
                    >
                      {tx.type === "buy" ? "Buy" : "Sell"}
                    </p>
                  </div>
                </div>
                <div className="text-right self-center font-medium">
                  {tx.value}
                </div>
                <div className="text-right text-gray-400 self-center">
                  {tx.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPortfolio;
