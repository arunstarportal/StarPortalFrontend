"use client";
import { Header } from "@/components/Header";
import {
  ArrowUpRight,
  ChevronDown,
  Settings,
  ArrowDownUp,
  Info,
} from "lucide-react";
import { useState } from "react";

const Page = () => {
  return (
    <div className="min-h-screen p-6 relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black to-white/10 -z-10 " />

      <Header />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between py-6 border-b border-gray-700/30">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              REAL WORLD ASSETS
            </h2>
            <div className="relative group">
              <img
                src="/svgs/rwa.svg"
                alt=""
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="relative group">
            <Settings className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors cursor-pointer" />
            <div className="absolute w-8 h-8 bg-white/5 rounded-full -inset-1 group-hover:scale-100 scale-0 transition-transform duration-200" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 py-8">
          <div className="relative group">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-200 cursor-pointer backdrop-blur-sm border border-white/5 group-hover:border-white/20">
              <div className="relative">
                <img
                  src="/ondoo.png"
                  alt=""
                  className="w-10 h-10 object-contain"
                />
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
              </div>
              <p className="font-semibold text-2xl text-white">Ondo Finance</p>
              <ChevronDown className="w-5 h-5 text-white/60 group-hover:text-white" />
            </div>
          </div>
        </div>

        <TradeComponent />
      </div>
    </div>
  );
};

const TradeComponent = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-start gap-4">
        <button
          onClick={() => setActiveTab("buy")}
          className={`text-lg font-medium px-6 py-2 rounded-full transition-all duration-200 ${
            activeTab === "buy"
              ? "bg-white text-black shadow-lg shadow-white/20"
              : "border border-white/20 text-white hover:bg-white/5"
          }`}
        >
          Buy USDY
        </button>
        <button
          onClick={() => setActiveTab("redeem")}
          className={`text-lg font-medium px-6 py-2 rounded-full transition-all duration-200 ${
            activeTab === "redeem"
              ? "bg-white text-black shadow-lg shadow-white/20"
              : "border border-white/20 text-white hover:bg-white/5"
          }`}
        >
          Redeem USDY
        </button>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
        <img src="/svgs/usdy.svg" alt="" className="w-12 h-12 object-contain" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-2xl">USDY</p>
            <div className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
              +6.68% APY
            </div>
          </div>
          <p className="text-white/60 font-light">Ondo US Dollar Yield Token</p>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-gray-300/10 rounded-3xl p-8 shadow-2xl">
        <div className="rounded-2xl bg-white/5 p-6 transition-all duration-200 ">
          <div className="flex items-center justify-between mb-2">
            <label className="text-white/60 text-sm">You Pay</label>
            <p className="text-white/60 text-sm">Balance: 0.00</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-white text-4xl font-medium focus:outline-none w-full"
            />

            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 px-4 py-2 rounded-full group">
              <img src="/ethereum.png" alt="" className="w-6 h-6" />
              <span className="text-white font-medium">ETH</span>
              <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center mt-2">
          <button className="absolute -mt-6 p-3 rounded-full bg-[#505050] group border border-white/10">
            <ArrowDownUp className="w-5 h-5 text-white/80 group-hover:text-white" />
          </button>
        </div>

        <div className="rounded-2xl bg-[#242424] p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-white/60">Minimum Amount</p>
              <Info className="w-4 h-4 text-white/40" />
            </div>
            <p className="text-white font-medium">500 USDC</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-white/60">Exchange Rate</p>
            <p className="text-white font-medium">1 USDY = $1.0668828</p>
          </div>
        </div>

        <button className="w-full py-4 px-6 bg-gradient-to-r mt-4  from-[#505050] to-[#2B2B2B]  rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/50 flex items-center justify-center gap-2">
          {activeTab === "buy" ? "Buy USDY" : "Redeem USDY"}
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Page;
