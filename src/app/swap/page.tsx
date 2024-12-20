"use client";
import React, { useState, useEffect } from "react";
import { ArrowDownUp, Info, ChevronUp, Search, X } from "lucide-react";
import SwapSettings from "@/components/Swap/SwapSetting";
import axios from "axios";
import SelectTokenModal from "@/components/Swap/TokenModal";
import { BASE_URL } from "@/Config";
import { useSelector } from "react-redux";

const NativeChainSwap = () => {
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);

  // @ts-ignore
  const userPortfolio = useSelector((state) => state.userPortfolio);

  const [toTokenAmount, setToTokenAmount] = useState("");
  const [fromTokenAmount, setfromTokenAmount] = useState("");
  const [activeTab, setActiveTab] = useState("Market");
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [fromTokenBalance, setFromTokenBalance] = useState(null);
  const [toTokenBalance, setToTokenBalance] = useState(null);

  const [solanaQuote, setSolanaQuote] = useState(null);

  console.log(solanaQuote);

  const findTokenBalance = (token) => {
    console.log(userPortfolio, token);

    if (!token || !userPortfolio.data) return 0;

    let coin;
    Object.entries(userPortfolio.data).forEach(([chain, details]: any) => {
      if (chain === token.asset_platform_id) {
        coin = details.tokens.find(
          (item) => item.symbol === token.symbol.toUpperCase()
        );
      }
    });
    return coin?.balance || 0;
  };

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

  const handleQuoting = async () => {
    try {
      const body = {
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

      const response = await axios.post(`${BASE_URL}/swap/quote`, body);

      const data = await response.data;
      if (response.status === 200) {
        if (fromToken.asset_platform_id === "solana") {
          setSolanaQuote(data);

          const rawOutAmount = data?.amount.outAmount || 0;
          const convertedOutAmount =
            Number(rawOutAmount) / 10 ** Number(body.toDecimal);

          setToTokenAmount(convertedOutAmount.toString());

          return;
        }
        setToTokenAmount(data.amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTokenSelection = (type, token) => {
    if (type === "from") {
      console.log("from : ", token);

      setFromToken(token);
      const balance = findTokenBalance(token);
      setFromTokenBalance(balance);
    } else if (type === "to") {
      setToToken(token);
      setToTokenBalance(findTokenBalance(token));
    }
    setIsTokenModalOpen(false);
  };

  return (
    <div className="h-[89vh] flex items-center justify-center text-white ">
      <div className="w-full rounded-3xl shadow-2xl p-60">
        {/* Header with Chain Selection */}
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Token Swap
        </h1>

        {/* Swap Header  */}
        <div className="flex items-center justify-between my-4 bg-gray-800/50 px-4 py-4 rounded-xl">
          <div className="flex items-center gap-4 relative">
            {["Market", "Limit", "Convert"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 relative
                ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-700/50 text-gray-400 hover:bg-gray-800/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <SwapSettings />
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            className="text-white px-3 py-1 border"
            onClick={handleQuoting}
          >
            Get Quotes
          </button>
          <button className="border px-3 py-1" onClick={handleNativeSwap}>
            Get Native Swap
          </button>
        </div>

        {/* Swap Component  */}
        <div className="relative border border-purple-500/30 rounded-xl my-4 p-3 bg-gray-800/50">
          {/* From Token Selection */}
          <div className="bg-gray-700/30 rounded-xl p-4 mb-4">
            <p className="mb-3 text-xl font-medium text-gray-300">Sell</p>

            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="0.0"
                value={fromTokenAmount}
                onChange={(e) => setfromTokenAmount(e.target.value)}
                className="flex-grow bg-gray-800 px-3 py-2 text-2xl font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => openTokenModal("from")}
                className="flex items-center justify-center gap-2 border border-purple-500/50 rounded-full px-3 py-1 hover:bg-gray-700 transition-colors"
              >
                {fromToken ? (
                  <div className="flex items-center justify-between gap-2">
                    <img
                      src={fromToken.image.small}
                      alt=""
                      className="w-6 h-6 mix-blend-screen"
                    />
                    <p className="text-sm font-medium text-white">
                      {fromToken.symbol.toUpperCase()}
                    </p>
                  </div>
                ) : (
                  <>
                    <p>Select Token</p>
                    <ChevronUp size={17} />
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
              <span>$ 0.00</span>
              <span>
                Balance:{" "}
                {fromTokenBalance ? Number(fromTokenBalance).toFixed(4) : 0}
              </span>
            </div>

            {fromToken && (
              <div className="mt-2 text-xs text-gray-500">
                {fromToken.name} ({fromToken.symbol})
              </div>
            )}
          </div>

          {/* Swap Direction */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center my-4">
            <button className="bg-gray-700 p-2 rounded-full hover:rotate-180 transition-transform">
              <ArrowDownUp className="text-gray-300" />
            </button>
          </div>

          {/* To Token Selection */}
          <div className="bg-gray-700/30 rounded-xl p-4">
            <p className="mb-3 text-xl font-medium text-gray-300">Receive</p>

            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="0.0"
                value={toTokenAmount}
                onChange={(e) => setToTokenAmount(e.target.value)}
                className="flex-grow bg-gray-800 px-3 py-2 text-2xl font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => openTokenModal("to")}
                className="flex items-center justify-center gap-2 border border-purple-500/50 rounded-full px-3 py-1 hover:bg-gray-700 transition-colors"
              >
                {toToken ? (
                  <div className="flex items-center justify-between gap-2">
                    <img
                      src={toToken.image.small}
                      alt=""
                      className="w-6 h-6 mix-blend-screen"
                    />
                    <p className="text-sm font-medium text-white">
                      {toToken.symbol.toUpperCase()}
                    </p>
                  </div>
                ) : (
                  <>
                    <p>Select Token</p>
                    <ChevronUp size={17} />
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
              <span>$ 0.00</span>
              <span>
                Balance:{" "}
                {toTokenBalance ? Number(toTokenBalance).toFixed(4) : "0.00"}
              </span>
            </div>

            {toToken && (
              <div className="mt-2 text-xs text-gray-500">
                {toToken.name} ({toToken.symbol})
              </div>
            )}
          </div>
        </div>

        {/* Swap Button */}
        <button
          // disabled={!fromToken || !toToken || !amount}
          onClick={handleSwap}
          className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-wider ${
            !fromToken || !toToken
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 hover:scale-[1.02]"
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
            onSelect={(token) => handleTokenSelection(modalType, token)}
          />
        )}
      </div>
    </div>
  );
};

export default NativeChainSwap;
