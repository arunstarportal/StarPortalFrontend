"use client";
import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import SwapSettings, { SwapDirection } from "@/components/Swap/SwapSetting";
import axios from "axios";
import SelectTokenModal from "@/components/Swap/TokenModal";
import { BASE_URL } from "@/Config";
import { useSelector } from "react-redux";
import {
  handleQuotingFrom,
  handleQuotingTo,
  handleTokenSelection,
} from "@/Config/swap";
import TokenInput from "@/components/Swap/TokenInputs";
import { CHAIN_IDS, portfolioTokens } from "@/data/data";

const chainOptions = Object.keys(CHAIN_IDS).map((key) => ({
  name: key.replace(/_/g, " ").toLowerCase(),
  id: CHAIN_IDS[key],
}));

const NativeChainSwap = () => {
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);

  // @ts-ignore
  const userPortfolio = useSelector((state) => state.userPortfolio);

  const [toTokenAmount, setToTokenAmount] = useState("");
  const [fromTokenAmount, setfromTokenAmount] = useState("");
  const [activeTab, setActiveTab] = useState("Market");
  const [selectedChain, setSelectedChain] = useState(chainOptions[0]);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [fromTokenBalance, setFromTokenBalance] = useState(null);
  const [toTokenBalance, setToTokenBalance] = useState(null);

  const [activeInput, setActiveInput] = useState("from"); // "from" or "to"

  const [gasEstimation, setGasEstimation] = useState(null);

  const [solanaQuote, setSolanaQuote] = useState(null);

  console.log(userPortfolio);

  // Token Selection Modal Handler
  const openTokenModal = (type: any) => {
    setModalType(type);
    setIsTokenModalOpen(true);
  };

  const handleSwap = async () => {
    const token = JSON.parse(localStorage.getItem("star_authTokens")).token;

    if (fromToken.asset_platform_id === "solana") {
      try {
        const payload = {
          quoteResponse: solanaQuote,
        };
        const response = await axios.post(`${BASE_URL}/swap/solana`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      const payload = {
        chainId: fromToken.asset_platform_id,
        fromToken: fromToken.contract_address,
        fromDecimal:
          fromToken.detail_platforms[fromToken.asset_platform_id].decimal_place,
        toToken: toToken.contract_address,
        toDecimal:
          toToken.detail_platforms[toToken.asset_platform_id].decimal_place,
        amountOfFromToken: fromTokenAmount,
        slippage: 5,
      };

      try {
        const response = await axios.post(
          `http://localhost:6900/swap/evm`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNativeSwap = async () => {
    try {
      const payload = {};
      const response = await axios.post(
        `http://localhost:6900/swap/evm`,
        payload
      );
      const data = response.data;
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (activeInput === "from" && fromTokenAmount) {
      console.log("running from token quoting");

      handleQuotingFrom(
        fromToken,
        toToken,
        fromTokenAmount,
        setSolanaQuote,
        setToTokenAmount,
        setGasEstimation,
        true
      );
    }
  }, [fromTokenAmount, fromToken, toToken, activeInput]);

  useEffect(() => {
    if (activeInput === "to" && toTokenAmount) {
      console.log("running to token quoting");
      handleQuotingTo(
        fromToken,
        toToken,
        toTokenAmount,
        setSolanaQuote,
        setfromTokenAmount,
        setGasEstimation,
        true
      );
    }
  }, [toTokenAmount, fromToken, toToken, activeInput]);

  const handleFromTokenChange = (e) => {
    setActiveInput("from");
    setfromTokenAmount(e.target.value || "");
  };

  const handleToTokenChange = (e) => {
    setActiveInput("to");
    setToTokenAmount(e.target.value || "");
  };

  const handleChainChange = (event) => {
    const chainId = event.target.value;
    const chain = chainOptions.find((chain) => chain.id === parseInt(chainId));
    setSelectedChain(chain);
  };

  return (
    <div className="text-white ">
      <div className="w-full rounded-3xl shadow-2xl">
        {/* Header with Chain Selection */}
        <h1 className="text-3xl font-bold mb-4 text-left text-white">
          Token Swap
        </h1>

        {/* Swap Header  */}
        <SwapHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleChainChange={handleChainChange}
          selectedChain={selectedChain}
        />

        {/* Swap Component  */}
        <div className="relative border border-borderColor rounded-xl my-4 p-3 bg-card space-y-4">
          <TokenInput
            token={fromToken}
            tokenBalance={fromTokenBalance}
            tokenAmount={fromTokenAmount}
            onTokenAmountChange={handleFromTokenChange}
            onTokenSelect={() => openTokenModal("from")}
            label="Sell"
          />

          {/* Swap Direction */}
          <SwapDirection />

          <TokenInput
            token={toToken}
            tokenBalance={toTokenBalance}
            tokenAmount={toTokenAmount}
            onTokenAmountChange={handleToTokenChange}
            onTokenSelect={() => openTokenModal("to")}
            label="Buy"
          />
        </div>

        {/* Swap Button */}
        <button
          disabled={!fromToken || !toToken}
          onClick={handleSwap}
          className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-wider ${
            !fromToken || !toToken
              ? "bg-card cursor-not-allowed"
              : "bg-purple-600 hover:opacity-90 hover:scale-[1.02]"
          }`}
        >
          Swap
        </button>

        {/* Additional Info */}
        <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center">
          <Info className="mr-2 w-4 h-4" />
          Swap between tokens on the same chain
        </div>

        {/* Token Selection Modal (if needed) */}
        {isTokenModalOpen && (
          <SelectTokenModal
            isOpen={isTokenModalOpen}
            onClose={() => setIsTokenModalOpen(false)}
            type={modalType}
            onSelect={(token) =>
              handleTokenSelection(
                modalType,
                token,
                setFromToken,
                setFromTokenBalance,
                setToToken,
                setToTokenBalance,
                setIsTokenModalOpen,
                userPortfolio
              )
            }
          />
        )}
      </div>
    </div>
  );
};

const SwapHeader = ({
  activeTab,
  setActiveTab,
  handleChainChange,
  selectedChain,
}) => {
  return (
    <div className="flex items-center justify-between border border-borderColor my-4 bg-card px-4 py-4 rounded-xl">
      <div className="flex items-center gap-4 relative">
        {["Market", "Limit", "Convert"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 relative h-[2.5rem]
            ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-gray-400 "
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* <div className="relative">
        <select
          value={selectedChain.id}
          onChange={handleChainChange}
          className="bg-black text-white text-sm font-medium py-2 px-4 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {chainOptions.map((chain) => (
            <option key={chain.id} value={chain.id}>
              {chain.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div> */}

      <SwapSettings />
    </div>
  );
};

export default NativeChainSwap;
