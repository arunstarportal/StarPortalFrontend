import { Header } from "@/components/Header";
import { Settings } from "lucide-react";
import React from "react";
import { RiCopperCoinFill } from "react-icons/ri";

const page = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-black to-white/5">
      <Header />
      <div className="my-10 mx-10">
        <div className="flex items-center justify-between py-4 border-b border-gray-300/20">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-medium text-white">DEXES</h2>
            <RiCopperCoinFill color="white" size={22} />
          </div>
          <Settings className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>

        <div className="flex items-center justify-start gap-3 text-white py-5 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
            <img
              src="/svgs/lido2.svg"
              alt=""
              className="w-8 h-8 object-contain"
            />
            <p className="font-medium text-2xl">LIDO</p>
            <span className="material-symbols-outlined text-2xl text-white/60">
              keyboard_arrow_down
            </span>
          </div>
        </div>

        <StackComponent />
      </div>
    </div>
  );
};

const StackComponent = () => {
  return (
    <div className="border-[0.5px] border-gray-800/80 shadow-md shadow-white/30 rounded-2xl py-5">
      <div className="flex items-center justify-between border-b border-white/15 px-5 pb-4">
        <div className="flex items-start justify-center flex-col">
          <p className="text-sm font-medium text-white/70">
            Available to Stack
          </p>
          <p className="text-white font-semibold text-xl">0.00ETH</p>
        </div>
        <button className="px-3 py-2 bg-gradient-to-r from-[#2D2929] to-[#2d2929ac] text-xs text-white font-semibold flex items-center justify-center gap-3 rounded-full">
          {"0x7B5C40aB02D16e2Ca43D466ADF5e3002b436c857".slice(0, 15)}...
          <img
            src="/svgs/userAccnt.svg"
            alt=""
            className="w-7 h-7 object-contain"
          />
        </button>
      </div>
      <div className="px-5 pt-4">
        <div className="flex items-center space-x-24">
          <div className="flex items-start justify-center flex-col gap-1">
            <p className="text-white/70 text-sm font-light">Stacked amount</p>
            <p className="text-white text-lg font-semibold">0.00stETH</p>
          </div>
          <div className="flex items-start justify-center flex-col gap-1">
            <p className="text-white/70 text-sm font-light">Lido APR</p>
            <p className="text-green-500 text-lg font-semibold">30%</p>
          </div>
        </div>
        <div className="my-4 rounded-xl border border-white/40 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <img src="/ethereum.png" alt="" className="w-7 h-7" />
            <p className="text-white/60 text-lg font-medium">ETH Amount</p>
          </div>
          <button className="bg-white/10 text-white/80 text-sm font-medium py-1 px-2 rounded-lg">
            Max
          </button>
        </div>

        <button className="bg-gradient-to-r from-[#505050] to-[#2B2B2B] w-full text-center py-2 text-white rounded-lg">
          Stake
        </button>

        <div className="grid grid-cols-2 gap-5 mt-4">
          <div className=" flex items-start justify-center flex-col font-medium text-white/40 text-sm gap-3">
            <p>You will Receive</p>
            <p>Exchange Rate</p>
            <p>Max Transaction const</p>
            <p>Reward Fee</p>
          </div>

          <div className=" flex items-end justify-center flex-col font-medium text-white/40 text-sm gap-3">
            <p>0.0 stETH</p>
            <p>1ETH = 1stETH</p>
            <p>$8.09</p>
            <p>10%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
