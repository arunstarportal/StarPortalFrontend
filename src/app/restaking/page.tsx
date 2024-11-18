"use client";
import { Header } from "@/components/Header";
import { Settings, ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const stakedCoinsData = [
  {
    id: 1,
    name: "Natively Staked Ether ETH",
    icon: "/ethereum.png",
    walletBal: 0,
    restakedBal: 0,
    totalval: "3.19m",
    apy: "5.2%",
    rewardTokens: [{ icon: "/svgs/arbitrum.svg" }, { icon: "/usdc.png" }],
  },
  {
    id: 2,
    name: "Natively Staked Ether ETH",
    icon: "/ethereum.png",
    walletBal: 0,
    restakedBal: 0,
    totalval: "3.19m",
    apy: "5.2%",
    rewardTokens: [{ icon: "/svgs/arbitrum.svg" }, { icon: "/usdc.png" }],
  },
  {
    id: 3,
    name: "Natively Staked Ether ETH",
    icon: "/ethereum.png",
    walletBal: 0,
    restakedBal: 0,
    totalval: "3.19m",
    apy: "5.2%",
    rewardTokens: [{ icon: "/svgs/arbitrum.svg" }, { icon: "/usdc.png" }],
  },
];

const Page = () => {
  const [selectedProtocol, setSelectedProtocol] = useState("LIDO");

  return (
    <div className="min-h-screen p-6 relative">
      <div className="fixed inset-0 h-screen bg-gradient-to-b from-black to-white/10 -z-10"></div>
      <Header />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between py-6 border-b border-gray-700/30">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              RESTAKING
            </h2>
            <img src="/svgs/restaking.svg" alt="" className="w-8 h-8" />
          </div>
          <div className="relative group">
            <Settings className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors cursor-pointer" />
            <div className="absolute w-8 h-8 bg-white/5 rounded-full -inset-1 group-hover:scale-100 scale-0 transition-transform duration-200" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 py-8 mb-6">
          <div className="relative group">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-200 cursor-pointer backdrop-blur-sm border border-white/5">
              <img
                src="/svgs/lido2.svg"
                alt=""
                className="w-10 h-10 object-contain"
              />
              <p className="font-semibold text-2xl text-white">
                {selectedProtocol}
              </p>
              <ChevronDown className="w-5 h-5 text-white/60" />
            </div>
          </div>
          <button className="px-6 py-3 rounded-full font-medium text-base bg-white hover:bg-gray-200 text-black transition-colors duration-200 flex items-center gap-2">
            Restake Now
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <StakingComponent />
      </div>
    </div>
  );
};

const StakingComponent = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-white/10 rounded-2xl p-6 bg-gray-900/30 backdrop-blur-xl hover:border-white/20 transition-all duration-200">
          <h2 className="text-white/70 font-medium text-sm">
            Total Value Restaked
          </h2>
          <p className="flex items-center justify-start gap-2 my-4">
            <span className="text-4xl text-white font-bold">1,000</span>
            <span className="text-white/60 text-xl font-medium">ETH</span>
          </p>
          <div className="flex items-center gap-3 mt-4">
            <button className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors duration-200">
              Unstake
            </button>
            <button className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors duration-200">
              Withdraw
            </button>
          </div>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 bg-gray-900/30 backdrop-blur-xl hover:border-white/20 transition-all duration-200">
          <h2 className="text-white/70 font-medium text-sm">Current APY</h2>
          <p className="flex items-center justify-start gap-2 my-4">
            <span className="text-4xl text-white font-bold">5.2</span>
            <span className="text-white/60 text-xl font-medium">%</span>
          </p>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
              +0.2% past 24h
            </div>
          </div>
        </div>
      </div>

      <div className="border border-white/10 rounded-2xl bg-gray-900/30 backdrop-blur-xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-semibold text-white">Available Assets</h1>
        </div>

        <div className="grid grid-cols-5 px-6 py-4 border-b border-white/10">
          <div className="text-white/60 font-medium text-sm">Assets</div>
          <div className="text-white/60 font-medium text-sm text-center">
            Wallet Balance
          </div>
          <div className="text-white/60 font-medium text-sm text-center">
            Restaked Balance
          </div>
          <div className="text-white/60 font-medium text-sm text-center">
            Total Value Restaked
          </div>
          <div className="text-white/60 font-medium text-sm text-center">
            Reward Tokens
          </div>
        </div>

        {stakedCoinsData.map((coin, index) => (
          <div
            key={index}
            className="grid grid-cols-5 px-6 py-4 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={coin.icon} alt="" className="w-8 h-8" />
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
              </div>
              <p className="font-medium text-white">{coin.name}</p>
            </div>
            <p className="text-center text-white/70">{coin.walletBal}</p>
            <p className="text-center text-white/70">{coin.restakedBal}</p>
            <p className="text-center text-white/70">{coin.totalval}</p>
            <div className="flex items-center justify-center -space-x-2">
              {coin.rewardTokens.map((icons, index) => (
                <img
                  src={icons.icon}
                  alt=""
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-gray-900 transition-transform hover:scale-110 hover:z-10"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
