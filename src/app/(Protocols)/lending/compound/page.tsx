"use client";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import {
  Settings,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronDown,
  Activity,
  Search,
  AlertCircle,
  Clock,
  Shield,
  Wallet,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { GiReceiveMoney } from "react-icons/gi";
import { AssetsSupplyData } from "@/data";
import { useAccount, useWriteContract } from "wagmi";
import { COMPOUND, AssetsAddress, ERC20_ABI } from "@/ContractData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AssetRow, StatCard } from "@/components/dexes/compound";

const Page = () => {
  const [activeTab, setActiveTab] = useState("supply");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const marketStats = {
    tvl: { value: "$1,234,567", change: "+5.23%", trend: "up" },
    supplied: { value: "$890,123", change: "+3.45%", trend: "up" },
    borrowed: { value: "$345,678", change: "-1.23%", trend: "down" },
    utilization: { value: "67.8%", change: "+2.1%", trend: "up" },
  };

  return (
    <main className="max-w-7xl mx-auto px-1 pb-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Value Locked"
          value={marketStats.tvl.value}
          change={marketStats.tvl.change}
          icon={<Activity size={24} className="text-purple-400" />}
        />
        <StatCard
          title="Total Supplied"
          value={marketStats.supplied.value}
          change={marketStats.supplied.change}
          icon={<TrendingUp size={24} className="text-green-400" />}
        />
        <StatCard
          title="Total Borrowed"
          value={marketStats.borrowed.value}
          change={marketStats.borrowed.change}
          icon={<TrendingDown size={24} className="text-red-400" />}
        />
        <StatCard
          title="Utilization Rate"
          value={marketStats.utilization.value}
          change={marketStats.utilization.change}
          icon={<Clock size={24} className="text-blue-400" />}
        />
      </div>

      {/* Asset Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {["ETH", "USDC", "USDT"].map((token) => (
            <button
              key={token}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                token === "ETH"
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                  : "hover:bg-gray-800/50"
              }`}
            >
              <img
                src={`/${token.toLowerCase()}.png`}
                alt=""
                className="w-6 h-6"
              />
              <p className="text-white font-medium">{token}</p>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {["Supply", "Borrow"].map((action) => (
            <button
              key={action}
              className={`px-6 py-2 rounded-full text-white font-medium transition-all ${
                action === "Supply"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                  : "bg-gray-800/50 hover:bg-gray-800/70"
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {["Assets Supplied", "Your Borrows"].map((title) => (
          <div
            key={title}
            className={`bg-gray-900/50 backdrop-blur-md border border-gray-700/30 rounded-xl overflow-hidden transition-all duration-300 ${
              hoveredCard === title ? "ring-2 ring-purple-500/50" : ""
            }`}
            onMouseEnter={() => setHoveredCard(title)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <Info className="w-5 h-5 text-gray-400 cursor-help" />
                </div>
                <button className="px-4 py-1.5 text-sm font-medium bg-purple-500 hover:bg-purple-600 transition-colors rounded-full text-white">
                  {title === "Assets Supplied" ? "Withdraw" : "Repay"}
                </button>
              </div>

              <div className="grid grid-cols-4 py-3 border-b border-gray-700/50 mb-2">
                <p className="text-gray-400 text-sm font-medium">Asset</p>
                <p className="text-gray-400 text-sm font-medium text-center">
                  Balance
                </p>
                <p className="text-gray-400 text-sm font-medium text-center">
                  APY
                </p>
                <p className="text-gray-400 text-sm font-medium text-center">
                  Action
                </p>
              </div>

              {AssetsSupplyData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 py-4 hover:bg-gray-800/30 transition-all duration-300 rounded-lg group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={item.img}
                        alt=""
                        className="w-8 h-8 group-hover:scale-110 transition-transform"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
                    </div>
                    <div>
                      <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-400">{item.token}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-white font-medium">
                      {item.walletBalance}
                    </p>
                    <p className="text-sm text-gray-400">
                      ≈ ${item.walletBalance}
                    </p>
                  </div>
                  <p className="text-green-400 font-medium flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {item.apy}
                  </p>
                  <div className="flex justify-center items-center">
                    <button className="px-4 py-1.5 text-sm font-medium bg-purple-500/20 hover:bg-purple-500/30 transition-all rounded-full text-purple-400 hover:text-purple-300">
                      {title === "Assets Supplied" ? "Withdraw" : "Repay"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Collateral Assets Section */}
      <div className="space-y-8 my-8">
        <div className="border border-white/10 rounded-xl bg-gray-900/40 backdrop-blur-lg overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <h1 className="text-white font-medium text-xl">
                Collateral Assets
              </h1>
              <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                Active
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Info className="w-5 h-5" />
                <span className="text-sm">Learn More</span>
              </button>
              <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 transition-colors rounded-full text-white text-sm font-medium">
                Manage Collateral
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">
                  Total Collateral Value
                </p>
                <p className="text-2xl font-bold text-white">$12,345.67</p>
                <p className="text-sm text-green-400 mt-1">
                  +2.34% from last week
                </p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">
                  Current Health Factor
                </p>
                <p className="text-2xl font-bold text-green-400">1.82</p>
                <p className="text-sm text-gray-400 mt-1">
                  Safe → Minimum: 1.0
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 py-3 border-b border-gray-700/50 mb-2">
              <p className="text-gray-400 text-sm font-medium">Asset</p>
              <p className="text-gray-400 text-sm font-medium text-center">
                Protocol Balance
              </p>
              <p className="text-gray-400 text-sm font-medium text-center">
                Collateral Factor
              </p>
            </div>

            {AssetsSupplyData.map((item) => (
              <AssetRow key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Risk Alert */}
      <Alert className="bg-yellow-500/10 border border-yellow-500/30 mb-8">
        <AlertCircle className="w-5 h-5 text-yellow-500" />
        <AlertDescription className="text-yellow-500 ml-2">
          Always maintain a healthy collateral ratio to avoid liquidation.
          Current market conditions may affect asset prices.
        </AlertDescription>
      </Alert>

      {/* Network Status */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700/30">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-gray-400 text-sm">Network</span>
        </div>
        <div className="w-px h-4 bg-gray-700" />
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-purple-400" />
          <span className="text-gray-400 text-sm">Connected</span>
        </div>
      </div>
    </main>
  );
};

export default Page;
