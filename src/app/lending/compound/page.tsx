import React from "react";
import { Header } from "@/components/Header";
import { Settings, TrendingUp, TrendingDown, Info } from "lucide-react";
import { GiReceiveMoney } from "react-icons/gi";
import { AssetsBorrowData, AssetsSupplyData } from "@/data";

const Page = () => {
  return (
    <div className="max-h-screen overflow-y-scroll p-6 relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black to-white/10 -z-10 " />
      <Header />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between py-4 border-b border-gray-300/10">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-semibold text-white tracking-wide">
              LENDING
            </h2>
            <GiReceiveMoney className="text-white opacity-80" size={30} />
          </div>
          <Settings className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>

        <div className="flex items-center justify-between gap-6 text-white py-8">
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-all cursor-pointer backdrop-blur-lg">
            <img
              src="/svgs/compound.svg"
              alt=""
              className="w-10 h-10 object-contain"
            />
            <div>
              <p className="font-medium text-2xl">COMPOUND FINANCE</p>
              <p className="text-white/60 text-sm">Protocol Version 3.0</p>
            </div>
            <span className="material-symbols-outlined text-2xl text-white/60 ml-2">
              keyboard_arrow_down
            </span>
          </div>
          <div className="px-6 py-3 border border-gray-600/40 rounded-xl text-xl font-medium flex items-center gap-3 hover:border-gray-600/60 transition-all backdrop-blur-lg">
            <span className="text-white/80">BALANCE</span>
            <img src="/usdc.png" alt="" className="w-6 h-6 object-contain" />
            <span className="text-white">0.00</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 my-8">
          <StatCard
            title="Assets Supplied"
            value="0.000"
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
          />
          <StatCard
            title="Assets Borrowed"
            value="0.000"
            icon={<TrendingDown className="w-5 h-5 text-red-400" />}
          />
        </div>

        <div className="space-y-8">
          <div className="border border-white/10 rounded-xl bg-gray-900/40 backdrop-blur-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h1 className="text-white font-medium text-xl">
                Assets to Supply
              </h1>
              <Info className="w-5 h-5 text-white/60 hover:text-white cursor-pointer" />
            </div>
            <div>
              {AssetsSupplyData.map((item, index) => (
                <AssetRow key={item.id} {...item} />
              ))}
            </div>
          </div>

          <div className="border border-white/10 rounded-xl bg-gray-900/40 backdrop-blur-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h1 className="text-white font-medium text-xl">
                Assets to Borrow
              </h1>
              <Info className="w-5 h-5 text-white/60 hover:text-white cursor-pointer" />
            </div>
            <div>
              {AssetsBorrowData.map((item) => (
                <AssetRow
                  key={item.id}
                  img={item.icon}
                  label={item.label}
                  token={item.label}
                  walletBalance={item.balance}
                  change="+0.0%"
                  apy={item.apy}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: any) => (
  <div className="border-[0.5px] border-white/20 bg-gray-900/40 backdrop-blur-lg w-full px-6 py-5 rounded-xl hover:border-white/40 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-white/70 font-medium">{title}</p>
      {icon}
    </div>
    <p className="text-white text-3xl font-medium group-hover:scale-105 transition-transform">
      {value}
    </p>
  </div>
);

const AssetRow = ({ img, label, token, walletBalance, change, apy }: any) => (
  <div className="grid grid-cols-2 py-3 px-4 hover:bg-white/5 transition-colors rounded-lg cursor-pointer">
    <div className="flex items-center gap-3">
      <img src={img} alt="" className="w-8 h-8 object-contain" />
      <div>
        <h1 className="text-white font-medium text-lg">{label}</h1>
        <div className="flex items-center gap-2">
          <p className="text-white/70 text-sm">{token}</p>
          <span
            className={`text-xs ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
          >
            {change}
          </span>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-end gap-4">
      <div className="text-right">
        <p className="text-lg text-white/90 font-medium">{walletBalance}</p>
        <p className="text-sm text-white/50">APY: {apy}</p>
      </div>
    </div>
  </div>
);

export default Page;
