import { Header } from "@/components/Header";
import { Settings } from "lucide-react";
import React from "react";
import { GiReceiveMoney } from "react-icons/gi";

const chainData = [
  {
    id: 1,
    label: "ChainLink",
    img: "/svgs/chainLink.svg",
    apy: "2.04%",
    balance: 0,
  },
  {
    id: 2,
    label: "ChainLink",
    img: "/svgs/chainLink.svg",
    apy: "2.04%",
    balance: 0,
  },
  {
    id: 3,
    label: "ChainLink",
    img: "/svgs/chainLink.svg",
    apy: "2.04%",
    balance: 0,
  },
];

const page = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-black to-white/10">
      <Header />
      <div className="my-10 mx-10">
        <div className="flex items-center justify-between py-4 border-b border-gray-300/20">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-medium text-white tracking-wide">
              LENDING
            </h2>
            <GiReceiveMoney color="white" size={26} />
          </div>
          <Settings className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>

        <div className="flex items-center justify-between gap-3 text-white py-5 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
            <img
              src="/svgs/compound.svg"
              alt=""
              className="w-8 h-8 object-contain"
            />
            <p className="font-medium text-2xl">COMPOUND FINANCE</p>
            <span className="material-symbols-outlined text-2xl text-white/60">
              keyboard_arrow_down
            </span>
          </div>
          <div className="px-4 py-2 border border-gray-600/70 rounded-full text-xl font-medium flex items-center justify-center gap-2">
            <span>BALANCE :</span>
            <img
              src="/usdc.png"
              alt=""
              className="w-5 h-5 object-contain ml-2"
            />
            <span>0.00</span>
          </div>
        </div>
        <Details />
      </div>
    </div>
  );
};

const Details = () => {
  return (
    <div className="space-y-5">
      <div className="border border-white/50 rounded-lg">
        <h1 className="text-white font-medium p-4 text-xl">Assets to Supply</h1>
        <div className="grid grid-cols-5">
          <div>
            <h1 className="text-white/80 text-sm font-medium border-b border-white/40  px-10 py-3">
              Assets
            </h1>

            <div className="flex flex-col items-center justify-center">
              {chainData.map((item) => (
                <div className="flex items-center justify-start py-2 px-4 gap-2 my-1 w-full">
                  <img src={item.img} alt="" />
                  <p className="text-white/80 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-white/80 text-sm font-medium border-b border-white/40 px-10 py-3">
              Wallet Balance
            </h1>

            <div className="flex flex-col items-center justify-center">
              {chainData.map((item) => (
                <p className="text-white/80 font-medium px-4 py-2 my-1 w-full">
                  {item.balance}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-white/80 text-sm font-medium border-b border-white/40 px-10 py-3">
              Wallet Balance
            </h1>

            <div className="flex flex-col items-center justify-center">
              {chainData.map((item) => (
                <p className="text-white/80 font-medium px-4 py-2 my-1 w-full">
                  {item.balance}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-white/80 text-sm font-medium border-b border-white/40 px-10 py-3">
              Wallet Balance
            </h1>

            <div className="flex flex-col items-center justify-center">
              {chainData.map((item) => (
                <p className="text-white/80 font-medium px-4 py-2 my-1 w-full">
                  {item.balance}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-white/80 text-sm font-medium border-b border-white/40 px-10 py-3">
              Wallet Balance
            </h1>

            <div className="flex flex-col items-center justify-center">
              {chainData.map((item) => (
                <p className="text-white/80 font-medium px-4 py-2 my-1 w-full">
                  {item.balance}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
