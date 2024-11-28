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
import { AssetsAddress, COMPOUND, ERC20_ABI } from "@/ContractData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StatCard } from "@/components/dexes/compound";
import { useContractRead } from "@/hooks/useContractRead";
import { formatUnits, parseUnits } from "viem";
import { useContractWrite } from "@/hooks/useContractWrite";

const address = COMPOUND.sepoliaUSDC.address as `0x${string}`;
const abi = COMPOUND.sepoliaUSDC.abi as any;

const CompoundBaseAssetData = [
  {
    id: 1,
    name: "USDC",
    symbol: "USDC",
    address: AssetsAddress.USDC_Sepolia as `0x${string}`,
    icon: "/usdc.png",
    decimals: 6,
  },
  {
    id: 2,
    name: "WETH",
    symbol: "WETH",
    address: "0x2D5ee574e710219a521449679A4A7f2B43f046ad" as `0x${string}`,
    icon: "/eth.png",
    decimals: 18,
  },
  {
    id: 3,
    name: "WBTC",
    symbol: "WBTC",
    address: "0xa035b9e130F2B1AedC733eEFb1C67Ba4c503491F" as `0x${string}`,
    icon: "/wbtc.svg",
    decimals: 8,
  },
];

const CompoundCollateralData = [
  {
    id: 1,
    label: "Wrapped BTC",
    token: "WBTC",
    apy: "2.04%",
    address: "0xa035b9e130F2B1AedC733eEFb1C67Ba4c503491F",
    icon: "/wbtc.svg",
    decimals: 8,
    balance: 0,
    walletBalance: "0",
    change: "+5.2%",
  },
  {
    id: 2,
    label: "Wrapped Ethereum",
    token: "WETH",
    apy: "8.04%",
    address: "0x2D5ee574e710219a521449679A4A7f2B43f046ad",
    icon: "/eth.png",
    decimals: 18,
    balance: 0,
    walletBalance: "0",
    change: "+5.2%",
  },
];

const Page = () => {
  const [baseAsset, setBaseAsset] = useState("WETH");
  const { address: myAddress } = useAccount();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { executeWrite, error } = useContractWrite();

  if (error) {
    error;
  }

  const { data: AccountBalance } = useContractRead({
    address,
    abi,
    functionName: "balanceOf",
    args: [myAddress],
  });

  const { data: TotalCollateral } = useContractRead({
    address,
    abi,
    functionName: "totalsCollateral",
    args: [myAddress],
  });

  const { data: TotalBorrowedBase } = useContractRead({
    address,
    abi,
    functionName: "borrowBalanceOf",
    args: [myAddress],
  });

  const formatAccountBalance = AccountBalance
    ? Number(formatUnits(AccountBalance, 10)).toFixed(4)
    : "0";

  const formatAccountCollateral = TotalCollateral
    ? Number(formatUnits(TotalCollateral[0], 10)).toFixed(4)
    : "0";

  const formatAccountBorrowed = TotalBorrowedBase
    ? Number(formatUnits(TotalBorrowedBase, 10)).toFixed(4)
    : "0";

  const handleApprove = async () => {
    const selectedToken: any = CompoundBaseAssetData.find(
      (item) => item.symbol === baseAsset
    );

    await executeWrite({
      address: selectedToken.address,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [address, parseUnits("0.1", selectedToken.decimals)],
    });
  };

  const handleSupplyBase = async () => {
    const selectedToken: any = CompoundBaseAssetData.find(
      (item) => item.symbol === baseAsset
    );

    await executeWrite({
      address,
      abi,
      functionName: "supply",
      args: [selectedToken.address, parseUnits("0.01", selectedToken.decimals)],
    });
  };

  const handleBorrowBase = async () => {};

  return (
    <main className="max-w-7xl mx-auto px-1 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <StatCard
          title="Total Account Balance"
          value={formatAccountBalance}
          icon={<Activity size={24} className="text-purple-400" />}
        />
        <StatCard
          title="Total Supplied Collateral"
          value={formatAccountCollateral}
          icon={<TrendingUp size={24} className="text-green-400" />}
        />
        <StatCard
          title="Total Borrowed Base"
          value={formatAccountBorrowed}
          icon={<TrendingDown size={24} className="text-red-400" />}
        />
      </div>

      {/* Asset Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {CompoundBaseAssetData.map((token, index) => (
            <button
              key={index}
              onClick={() => setBaseAsset(token.symbol)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                baseAsset === token.symbol
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                  : "hover:bg-gray-800/50"
              }`}
            >
              <img src={token.icon} alt="" className="w-6 h-6" />
              <p className="text-white font-medium">{token.name}</p>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {["Approve", "Supply", "Borrow"].map((action) => (
            <button
              key={action}
              onClick={
                action === "Supply"
                  ? handleSupplyBase
                  : action === "Approve"
                    ? handleApprove
                    : handleBorrowBase
              }
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

      {/* Collateral Assets Section */}
      <div className="my-8 border border-white/10 rounded-xl bg-gray-900/40 backdrop-blur-lg overflow-hidden">
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
          <div className="grid grid-cols-3 py-3 border-b border-gray-700/50 mb-2">
            <p className="text-gray-400 text-sm font-medium text-center">
              Asset
            </p>
            <p className="text-gray-400 text-sm font-medium text-center">
              Protocol Balance
            </p>
            <p className="text-gray-400 text-sm font-medium text-center">
              Collateral Factor
            </p>
          </div>

          {CompoundCollateralData.map((item) => (
            <AssetRow key={item.id} {...item} />
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

      {/* Risk Alert */}
      <Alert className="bg-yellow-500/10 border border-yellow-500/30 mb-8 flex">
        <AlertDescription className="text-yellow-500 ml-2">
          Always maintain a healthy collateral ratio to avoid liquidation.
          Current market conditions may affect asset prices.
        </AlertDescription>
      </Alert>
    </main>
  );
};

const AssetRow = (props: any) => {
  const { executeWrite, error } = useContractWrite();

  if (error) {
    console.log(error);
  }

  const handleApprove = async () => {
    await executeWrite({
      address: props.address,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [address, parseUnits("0.1", props.decimals)],
    });
  };

  const handleSupply = async () => {
    console.log(props);

    await executeWrite({
      address,
      abi,
      functionName: "supply",
      args: [props.address, parseUnits("0.001", props.decimals)],
    });
  };
  const handleBorrow = () => {};

  return (
    <div className="grid grid-cols-3 py-4 px-6 hover:bg-white/5 transition-all duration-300 rounded-lg cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={props.icon}
            alt=""
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900" />
        </div>
        <div>
          <h1 className="text-white font-medium text-lg group-hover:text-purple-400 transition-colors">
            {props.label}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-white/70 text-sm">{props.token}</p>
            <span
              className={`text-xs ${props.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
            >
              {props.change}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="text-right">
          <div className="flex items-center justify-end gap-3">
            <p className="text-lg text-white/90 font-medium">
              {props.walletBalance}
            </p>
          </div>
          <p className="text-sm text-white/50 font-medium mt-1">
            APY: <span className="text-green-400">{props.apy}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handleApprove}
          className="flex items-center justify-center gap-1 p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-purple-400" />
          <p>Approve</p>
        </button>
        <button
          onClick={handleSupply}
          className="flex items-center justify-center gap-1 p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-purple-400" />
          <p>Supply</p>
        </button>
        <button
          onClick={handleBorrow}
          className="flex items-center justify-center gap-1 p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
        >
          <MinusCircle className="w-4 h-4 text-purple-400" />
          <p>Borrow</p>
        </button>
      </div>
    </div>
  );
};

export default Page;
