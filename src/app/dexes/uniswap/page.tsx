"use client";
import React, { useState } from "react";
import { ArrowDownUp, Info, Settings } from "lucide-react";
import { Header } from "@/components/Header";

const Page = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-black to-white/10">
      <Header />
      <div className="my-10 mx-10">
        <div className="flex items-center justify-between py-4 border-b border-gray-300/20">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-medium text-white">DEXES</h2>
            <img src="/svgs/swap.svg" alt="" className="w-4 h-4" />
          </div>
          <Settings className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>

        <div className="flex items-center justify-start gap-3 text-white py-5">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
            <img
              src="/svgs/uniswap.svg"
              alt=""
              className="w-8 h-8 object-contain"
            />
            <p className="font-medium text-2xl">Uniswap</p>
            <span className="material-symbols-outlined text-2xl text-white/60">
              keyboard_arrow_down
            </span>
          </div>
        </div>

        <SwapComponent />
      </div>
    </div>
  );
};

const SwapComponent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-medium text-2xl">Swap</h1>
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          <p className="text-gray-400 text-sm">Network fees: 0.3%</p>
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-lg border border-gray-300/10 rounded-3xl p-6 space-y-4 shadow-xl">
        {/* Sell Token Section */}
        <div className="rounded-2xl bg-white/5 p-4 hover:bg-black transition-colors">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white/80 font-medium">Sell</h2>
            <p className="text-gray-400 text-sm">Balance: 0.00</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 border border-gray-300/60 transition-colors px-4 py-2 rounded-full relative top-4">
                <img src="/ethereum.png" alt="" className="w-6 h-6" />
                <span className="text-white font-medium">ETH</span>
                <span className="material-symbols-outlined text-white/80">
                  keyboard_arrow_down
                </span>
              </button>
            </div>
            <input
              type="text"
              placeholder="0.0"
              className="bg-transparent text-right text-white text-3xl w-1/2 focus:outline-none"
            />
          </div>
          <p className="text-right text-gray-400 mt-1">≈ $0.00</p>
        </div>

        {/* Swap Container  */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[30%]">
          <img src="/swapCon.png" alt="" className="w-14 h-14" />
          <span className="material-symbols-outlined text-white relative bottom-10 left-4">
            swap_vert
          </span>
        </div>

        {/* Buy Token Section */}
        <div className="rounded-2xl bg-[#242424] p-4 hover:bg-white/10 transition-colors">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white/80 font-medium">Buy</h2>
            <p className="text-gray-400 text-sm">Balance: 0.00</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button className="flex items-center gap-2 bg-[#2a2a2a] border border-gray-700/60 transition-colors px-4 py-2 rounded-full relative top-4">
              <span className="text-white font-medium">Select Token</span>
              <span className="material-symbols-outlined text-white/80">
                keyboard_arrow_down
              </span>
            </button>
            <input
              type="text"
              placeholder="0.0"
              className="bg-transparent text-right text-white text-3xl w-1/2 focus:outline-none"
            />
          </div>
          <p className="text-right text-gray-400 mt-1">≈ $0.00</p>
        </div>

        <button className="w-full py-4 px-6 bg-gradient-to-r from-[#505050] to-[#2B2B2B]  rounded-xl text-white font-medium transition-all transform hover:scale-[1.02] focus:scale-[0.98]">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Page;
