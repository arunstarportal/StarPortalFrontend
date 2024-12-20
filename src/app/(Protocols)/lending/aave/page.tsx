"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/header/Header";
import {
  Settings,
  TrendingUp,
  TrendingDown,
  Info,
  Plus,
  Activity,
  ChevronDown,
} from "lucide-react";
import { AssetsBorrowData, AssetsSupplyData } from "@/data/data";
import { useAccount, useWriteContract } from "wagmi";
import { AAVE, AssetsAddress, ERC20_ABI } from "@/data/AllContractData";
import { formatUnits, parseUnits } from "viem";
import { StatCard } from "@/components/dexes/compound";
import { useContractRead } from "@/hooks/useContractRead";
import {
  BorrowAssetsAave,
  BorrowedAssetsAave,
  SuppliedAssetsAave,
  SupplyAssetsAave,
} from "@/data/Aave";
import { useContractWrite } from "@/hooks/useContractWrite";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

// for supplying ethrer the contract address used is - 0x387d311e47e80b498169e6fb51d3193167d89F7D with function named depositETH
/* parameters
0	undefined	address	0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951
1	onBehalfOf	address	0x7B5C40aB02D16e2Ca43D466ADF5e3002b436c857
2	referralCode	uint16	0

 for borrow -- function name borrow
 #	Name	Type	Data
0	asset	address	0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
1	amount	uint256	1000000
2	interestRateMode	uint256	2
3	referralCode	uint16	0
4	onBehalfOf	address	0x7B5C40aB02D16e2Ca43D466ADF5e3002b436c857

  */

const address = AAVE.sepolia.address as `0x${string}`;
const abi = AAVE.sepolia.abi as any;

const Page: React.FC = () => {
  const { address: myAddress } = useAccount();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const { data: collateral } = useContractRead({
    address,
    abi,
    functionName: "getUserAccountData",
    args: [myAddress],
  });

  const formattedCollateral = collateral ? formatUnits(collateral[0], 8) : "0";
  const formattedHealthFactor = collateral
    ? Number(formatUnits(collateral[5], 18)).toFixed(4)
    : "0";
  const formattedBorrowBase = collateral
    ? Number(formatUnits(collateral[2], 8)).toFixed(6)
    : "0";

  return (
    <div className="max-w-7xl mx-auto px-1 pb-6">
      {/* User's Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <StatCard
          title="Total Collateral Locked"
          value={formattedCollateral}
          change="+5.23%"
          icon={<Activity size={24} className="text-purple-400" />}
        />
        <StatCard
          title="Total Borrow Base"
          value={formattedBorrowBase}
          change="+3.45%"
          icon={<TrendingUp size={24} className="text-green-400" />}
        />
        <StatCard
          title="Health Factor"
          value={formattedHealthFactor}
          change="-1.23%"
          icon={<TrendingDown size={24} className="text-red-400" />}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          {
            title: "Assets Supplied",
            data: SuppliedAssetsAave,
            actionLabel: ["Withdraw"],
          },
          {
            title: "Your Borrows",
            data: BorrowedAssetsAave,
            actionLabel: ["Repay"],
          },
          {
            title: "Assets to Supply",
            data: SupplyAssetsAave,
            actionLabel: ["Approve", "Supply"],
          },
          {
            title: "Available to Borrow",
            data: BorrowAssetsAave,
            actionLabel: ["Borrow"],
          },
        ].map(({ title, data, actionLabel }) => (
          <div
            key={title}
            className={`bg-gray-900/50 backdrop-blur-md border border-gray-700/30 rounded-xl overflow-hidden transition-all duration-300 ${
              hoveredCard === title ? "ring-1 ring-purple-500/50" : ""
            }`}
            onMouseEnter={() => setHoveredCard(title)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <div className="flex items-center gap-2">
                  {hoveredCard !== title ? (
                    <button
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                      onClick={() => setHoveredCard(title)}
                    >
                      <ChevronDown size={20} className="text-white" />
                    </button>
                  ) : (
                    <button
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                      onClick={() => setHoveredCard(null)}
                    >
                      <Plus size={20} className="text-white" />
                    </button>
                  )}
                </div>
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

              {data.length > 0 ? (
                data.map((item, index) => (
                  <AssetsCard
                    key={index}
                    item={item}
                    actionLabel={actionLabel}
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 text-sm py-6">
                  No assets {title.toLowerCase()}
                </div>
              )}
            </div>
          </div>
        ))}
        <Toaster />
      </div>
    </div>
  );
};

export default Page;


interface Item {
  id: number;
  name: string;
  icon: string;
  symbol: string;
  address: `0x${string}`;
  balance: number;
  decimals: number;
}

const AssetsCard = ({
  item,
  actionLabel,
}: {
  item: Item;
  actionLabel: string[];
}) => {
  const { address: myAddress } = useAccount();
  const { executeWrite, isSuccess, isLoading, error } = useContractWrite();

  if (error) {
    // toast({
    //   title: "Error in write Function",
    //   description: error,
    // });

    console.log(error);
  }

  const handleApprove = async () => {
    await executeWrite({
      address: item.address,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [address, parseUnits("10", item.decimals)],
    });
  };

  const handleSupply = async () => {
    if (item.name === "Ether") {
      await executeWrite({
        address: "0x387d311e47e80b498169e6fb51d3193167d89F7D",
        abi: AAVE.sepolia.etherDepAbi,
        functionName: "depositETH",
        args: [address, myAddress, 0],
        value: parseUnits("0.001", item.decimals),
      });
      return;
    }

    await executeWrite({
      address,
      abi,
      functionName: "supply",
      args: [item.address, parseUnits("10", item.decimals), myAddress, 0],
    });
  };

  const handleBorrow = async () => {
    await executeWrite({
      address,
      abi,
      functionName: "borrow",
      args: [item.address, parseUnits("0.01", item.decimals), 2, 0, myAddress],
    });
  };

  return (
    <div className="grid grid-cols-4 py-4 hover:bg-gray-800/30 transition-colors rounded-lg">
      <div className="flex items-center gap-3">
        <img src={item.icon} alt="" className="w-8 h-8" />
        <div>
          <p className="text-white font-medium">{item.name}</p>
          <p className="text-sm text-gray-400">{item.symbol}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-white font-medium">11.5</p>
        <p className="text-sm text-gray-400">≈ $19.3</p>
      </div>
      <p className="text-green-400 font-medium flex items-center justify-center">
        3.12%
      </p>
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-center gap-3">
          {actionLabel.map((item, index) => (
            <button
              key={index}
              onClick={
                item === "Approve"
                  ? handleApprove
                  : item === "Borrow"
                    ? handleBorrow
                    : handleSupply
              }
              disabled={isLoading}
              className="px-4 py-1.5 text-xs font-medium bg-gray-800 hover:bg-gray-700 transition-colors rounded-full text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


