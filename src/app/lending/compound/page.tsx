"use client";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Settings, TrendingUp, TrendingDown, Info, Plus } from "lucide-react";
import { GiReceiveMoney } from "react-icons/gi";
import { AssetsBorrowData, AssetsSupplyData } from "@/data";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { COMPOUND, AssetsAddress, ERC20_ABI } from "@/ContractData";
import { parseUnits } from "viem";

type ActionType = "supply" | "borrow";

interface WriteContractConfig {
  address: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
}

// Define type for Asset Data
interface AssetData {
  id: string;
  icon: string; // Assuming URL or path to the icon
  label: string;
  balance: number;
  apy: string;
}

// Define type for Props of AssetRow
interface AssetRowProps {
  img: string;
  label: string;
  token: string;
  walletBalance: number;
  change: string;
  apy: string;
}

// Define type for Props of StatCard
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  type: "supply" | "borrow";
  handleSupply: (actionType: "supply" | "borrow", amount: number) => void;
}

// Contract related types
type ContractAddresses = {
  COMPOUND_ADDRESS: `0x${string}`;
  USDC_ADDRESS: `0x${string}`;
};

// Component state interfaces
interface TransactionState {
  supplyAmount: number;
  borrowAmount: number;
  isApproved: boolean;
}

const Page: React.FC = () => {
  const COMPOUND_ADDRESS = COMPOUND.sepoliaUSDC
    .address as `0x${string} | undefined`;
  const USDC_ADDRESS = AssetsAddress.USDC_Sepolia as `0x${string} | undefined`;
  const COMPOUND_ABI = COMPOUND.sepoliaUSDC.abi as any;
  const ERC_ABI = ERC20_ABI as any;

  const { address: myAddress } = useAccount() as { address: string };
  const { writeContract, isPending, isError, error } = useWriteContract();
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const [supplyAmount, setSupplyAmount] = useState<number>(0);
  const [borrowAmount, setBorrowAmount] = useState<number>(0);

  const handleSupply = (
    actionType: ActionType,
    amount: number
  ): Promise<void> => {
    if (!myAddress) {
      alert("Please connect your wallet");
      return;
    }

    try {
      const amountInWei = parseUnits(amount.toString(), 6);
      switch (actionType) {
        case "supply":
          // Implement supply logic
          setSupplyAmount((prevAmount) => prevAmount + amount);

          console.log(`Supplied ${amountInWei} USDC`);

          const approveConfig: any = {
            address: USDC_ADDRESS,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [COMPOUND_ADDRESS, amountInWei],
          };

          writeContract(approveConfig);

          break;
        case "borrow":
          // Implement borrow logic
          setBorrowAmount((prevAmount) => prevAmount + amount);
          console.log(`Borrowed ${amount} USDC`);
          break;
        default:
          throw new Error("Invalid action type");
      }
      // Here you would typically also call a blockchain/backend function
    } catch (error) {
      console.error("Transaction failed:", error);
      // Optionally show error to user
    }
  };

  if (error) {
    console.log(error);
  }

  const handleSupplyAsset = () => {
    const amountInWei = parseUnits("100", 6);

    const supplyArgs: any = {
      address: COMPOUND_ADDRESS,
      abi: COMPOUND.sepoliaUSDC.abi,
      functionName: "supply",
      args: [USDC_ADDRESS, amountInWei],
    };
    writeContract(supplyArgs);
  };

  return (
    <div className="max-h-screen overflow-y-scroll p-6 relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black to-white/10 -z-10 " />
      <Header />
      <button className="text-white px-4 py-2" onClick={handleSupplyAsset}>
        Supply funciotn
      </button>
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

        <div className="flex items-center justify-between gap-6 text-white mt-4">
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

        <div className="grid grid-cols-2 gap-8 my-8 ">
          <StatCard
            title="Assets Supplied"
            value="0.000"
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
            type="supply"
            handleSupply={handleSupply}
          />
          <StatCard
            title="Assets Borrowed"
            value="0.000"
            icon={<TrendingDown className="w-5 h-5 text-red-400" />}
            type="borrow"
            handleSupply={handleSupply}
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

const StatCard = ({
  title,
  value,
  icon,
  type,
  handleSupply,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  type: "supply" | "borrow";
  handleSupply: (type: "supply" | "borrow", amount: number) => void;
}) => {
  const [inputAmount, setInputAmount] = useState("");

  const handleButtonClick = () => {
    const amount = parseFloat(inputAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    handleSupply(type, amount);
    setInputAmount("");
  };

  return (
    <div className="border-[0.5px] border-white/20 bg-gray-900/40 backdrop-blur-lg w-full px-6 py-5 rounded-xl hover:border-white/40 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-white/70 font-medium">{title}</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder="Amount"
            className="w-28 px-3 py-2 rounded-md bg-black/50 text-white border border-white/20 outline-none"
          />
          <button
            onClick={handleButtonClick}
            className="border border-white/40 text-white px-3 font-medium py-2 rounded-lg bg-black flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <span className="w-5 h-5 bg-gray-900 flex items-center justify-center rounded-full">
              <Plus size={15} />
            </span>
            {type === "supply" ? "Supply" : "Borrow"} USDC
          </button>
        </div>
      </div>
      <p className="text-white text-3xl font-medium group-hover:scale-[1.01] transition-transform">
        {value}
      </p>
    </div>
  );
};

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
