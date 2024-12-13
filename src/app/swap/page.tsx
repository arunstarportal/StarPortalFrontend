"use client";
import React, { useState } from "react";
import { ArrowDownUp, Settings, Search, TrendingUp } from "lucide-react";

const Swap = () => {
  const [activeTab, setActiveTab] = useState("Market");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-black p-6 text-white">
      {/* Header with Subtle Animation */}
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-white">Token Swap</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-800/50 hover:bg-gray-700/50 p-2.5 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110">
            <Settings className="text-gray-300 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tab Navigation with Animated Indicator */}
      <div className="flex items-center gap-4 mb-6 relative">
        {["Market", "Limit", "Convert"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative
              ${
                activeTab === tab
                  ? "bg-gray-700 text-white"
                  : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/50"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-2/3 bg-gray-200 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Search and Swap Container */}
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800/50 shadow-2xl">
        {/* Search Input with Icon */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tokens or paste contract address"
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600/50 transition-all duration-300"
          />
        </div>

        {/* Swap Section */}
        <div className="relative">
          {/* From Token */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-xs">From</span>
              <span className="text-gray-400 text-xs">Balance: 0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0.0"
                className="bg-transparent text-2xl font-bold w-full focus:outline-none text-white"
              />
              <button className="bg-gray-700/30 text-gray-300 px-3 py-1 rounded-full text-sm">
                MAX
              </button>
            </div>
          </div>

          {/* Swap Icon */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <button className="bg-gray-500 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
              <ArrowDownUp className="text-gray-100" />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-gray-800/50 rounded-lg p-4 mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-xs">To</span>
              <span className="text-gray-400 text-xs">Balance: 0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0.0"
                className="bg-transparent text-2xl font-bold w-full focus:outline-none text-white"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button className="w-full bg-gradient-to-r from-gray-700 to-gray-900 py-4 rounded-lg text-white font-bold hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-[1.02] mt-4">
          {/* Connect Wallet */}
          Swap
        </button>
      </div>

      {/* Trending Tokens Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-green-500" />
          <h2 className="text-lg font-semibold">Trending by 24H Volume</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {TRENDING_TOKENS.map((token) => (
            <div
              key={token.name}
              className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-3 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-[1.03]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={token.icon}
                    alt={token.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-700"
                  />
                  <div>
                    <p className="font-semibold text-sm">{token.name}</p>
                    <p className="text-xs text-gray-400">{token.price}</p>
                  </div>
                </div>
                <p
                  className={`text-sm font-bold ${
                    token.change > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {token.change > 0 ? `+${token.change}%` : `${token.change}%`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Example Token Data
const TRENDING_TOKENS = [
  { name: "WBTC", price: "$281.2M", change: 291, icon: "/wbtc.png" },
  { name: "ARB", price: "$177.8M", change: 135, icon: "/arb.png" },
  { name: "LINK", price: "$123.3M", change: 48.1, icon: "/link.png" },
  { name: "WETH", price: "$43.0M", change: 549, icon: "/weth.png" },
  { name: "PEPE", price: "$45.3M", change: 102, icon: "/pepe.png" },
];

export default Swap;
