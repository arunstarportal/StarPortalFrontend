"use client";
import { useContractRead } from "@/hooks/useContractRead";
import { useContractWrite } from "@/hooks/useContractWrite";
import React, { useState } from "react";
import { formatEther, parseEther } from "viem";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useAccount,
} from "wagmi";

const LidoStaking = () => {
  const { address: myAddress } = useAccount();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { writeContract, data: hash } = useWriteContract();
  const { executeWrite } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Lido contract address on Sepolia
  const LIDO_ADDRESS = "0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af";

  // Simplified Lido ABI for the submit function
  const LIDO_ABI = [
    {
      inputs: [{ name: "_referral", type: "address" }],
      name: "submit",
      outputs: [{ name: "", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_account", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const { data: accountBalance, isLoading: readLoad } = useContractRead({
    address: LIDO_ADDRESS,
    abi: LIDO_ABI,
    functionName: "balanceOf",
    args: [myAddress],
  });

  const handleStake = async () => {
    try {
      setIsLoading(true);
      if (!amount) return;

      const value = parseEther(amount);

      await executeWrite({
        address: LIDO_ADDRESS,
        abi: LIDO_ABI,
        functionName: "submit",
        args: ["0x0000000000000000000000000000000000000000"], // Zero address as referral
        value: value,
      });
    } catch (error) {
      console.error("Staking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-2xl font-bold text-white">Stake ETH</h2>
      <p className="text-white text-xl font-medium">
        {readLoad ? "Loading..." : formatEther(accountBalance)}
      </p>
      <div className="flex flex-col gap-2">
        <label className="text-white">Amount of ETH to stake:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="px-3 py-2 rounded bg-gray-700 text-white"
          min="0"
          step="0.01"
        />
      </div>

      <button
        onClick={handleStake}
        disabled={isLoading || isConfirming || !amount}
        className="text-white border px-6 py-2 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading || isConfirming ? "Processing..." : "Stake ETH"}
      </button>

      {isSuccess && (
        <div className="text-green-500">Successfully staked {amount} ETH!</div>
      )}
    </div>
  );
};

export default LidoStaking;
