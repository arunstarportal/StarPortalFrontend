"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowDownUp,
  AlertCircle,
  Loader2,
  TrendingUp,
  Wallet,
} from "lucide-react";

const page = () => {
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`transition-all duration-500 p-6`}>
      <div className="max-w-xl mx-auto relative z-10">
        <SwapComponent
          isPriceLoading={isPriceLoading}
          setIsPriceLoading={setIsPriceLoading}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

const SwapComponent = ({ isPriceLoading, setIsPriceLoading, darkMode }) => {
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [isSwapHovered, setIsSwapHovered] = useState(false);
  const [tokens, setTokens] = useState([
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: 2.543,
      price: 2200,
      icon: "/eth.png",
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: 5678.22,
      price: 1,
      icon: "/usdc.png",
    },
    {
      symbol: "WBTC",
      name: "Wrapped Bitcoin",
      balance: 0.1234,
      price: 35000,
      icon: "/wbtc.png",
    },
  ]);

  const [sellToken, setSellToken] = useState(tokens[0]);
  const [buyToken, setBuyToken] = useState(tokens[1]);

  const networks = [
    { name: "Ethereum", icon: "/eth-network.png", gas: "Low" },
    { name: "Polygon", icon: "/polygon.png", gas: "Very Low" },
    { name: "Arbitrum", icon: "/arbitrum.png", gas: "Low" },
  ];

  useEffect(() => {
    if (sellAmount) {
      setIsPriceLoading(true);
      const timer = setTimeout(() => {
        const exchangeRate = buyToken.price / sellToken.price;
        setBuyAmount((parseFloat(sellAmount) * exchangeRate).toFixed(4));
        setIsPriceLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setBuyAmount("");
    }
  }, [sellAmount, sellToken, buyToken]);

  const priceImpact = useMemo(() => {
    const impact = Math.random() * 0.5;
    return impact < 0.1 ? impact.toFixed(2) : (impact * 100).toFixed(2);
  }, [sellAmount, buyAmount]);

  const swapTokens = () => {
    const temp = sellToken;
    setSellToken(buyToken);
    setBuyToken(temp);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Swap Card */}
      <div
        className={`backdrop-blur-xl border ${darkMode ? "bg-black/60 border-gray-800/50" : "bg-white/60 border-gray-200/50"} rounded-3xl p-6 space-y-6 shadow-2xl relative group`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

        {/* Sell Token Section */}
        <div
          className={`rounded-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"} p-4 transition-all duration-300`}
        >
          <div className="flex justify-between items-center mb-2">
            <h2
              className={`${darkMode ? "text-white/80" : "text-gray-700"} font-medium`}
            >
              Sell
            </h2>
            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}
            >
              Balance: {sellToken.balance.toFixed(4)} {sellToken.symbol}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                /* Open Token Selection Modal */
              }}
              className="flex items-center gap-2 border border-gray-300/60 hover:border-gray-300 transition-all duration-300 px-4 py-2 rounded-full group relative"
            >
              <img
                src={sellToken.icon}
                alt={sellToken.name}
                className="w-6 h-6 group-hover:scale-110 transition-transform"
              />
              <span
                className={`${darkMode ? "text-white" : "text-gray-800"} font-medium`}
              >
                {sellToken.symbol}
              </span>
              <span className="material-symbols-outlined text-white/80 group-hover:text-white transition-colors">
                keyboard_arrow_down
              </span>
            </button>
            <input
              type="text"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              placeholder="0.0"
              className={`bg-transparent text-right ${darkMode ? "text-white" : "text-gray-900"} text-3xl w-1/2 focus:outline-none placeholder-gray-500`}
            />
          </div>
          <p
            className={`text-right ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1`}
          >
            ≈ $
            {sellAmount
              ? (parseFloat(sellAmount) * sellToken.price).toFixed(2)
              : "0.00"}
          </p>
        </div>

        {/* Swap Button */}
        <div className="relative">
          <button
            onClick={swapTokens}
            onMouseEnter={() => setIsSwapHovered(true)}
            onMouseLeave={() => setIsSwapHovered(false)}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 p-3 rounded-xl border border-gray-700 transition-all duration-300 hover:scale-110"
          >
            <ArrowDownUp
              className={`w-6 h-6 text-white transition-transform duration-300 ${isSwapHovered ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Buy Token Section */}
        <div
          className={`rounded-2xl ${darkMode ? "bg-[#242424] hover:bg-white/10" : "bg-gray-200 hover:bg-gray-300"} p-4 transition-all duration-300`}
        >
          <div className="flex justify-between items-center mb-2">
            <h2
              className={`${darkMode ? "text-white/80" : "text-gray-700"} font-medium`}
            >
              Buy
            </h2>
            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}
            >
              Balance: {buyToken.balance.toFixed(4)} {buyToken.symbol}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                /* Open Token Selection Modal */
              }}
              className={`flex items-center gap-2 ${darkMode ? "bg-[#2a2a2a] border-gray-700/60" : "bg-gray-300 border-gray-400/60"} hover:border-gray-600 transition-all duration-300 px-4 py-2 rounded-full group`}
            >
              <img
                src={buyToken.icon || "/token-placeholder.png"}
                alt={buyToken.name}
                className="w-6 h-6 group-hover:scale-110 transition-transform"
              />
              <span
                className={`${darkMode ? "text-white" : "text-gray-800"} font-medium`}
              >
                {buyToken.symbol || "Select Token"}
              </span>
              <span className="material-symbols-outlined text-white/80 group-hover:text-white transition-colors">
                keyboard_arrow_down
              </span>
            </button>
            <div className="relative w-1/2">
              <input
                type="text"
                value={buyAmount}
                readOnly
                placeholder="0.0"
                className={`bg-transparent text-right ${darkMode ? "text-white" : "text-gray-900"} text-3xl w-full focus:outline-none placeholder-gray-500`}
              />
              {isPriceLoading && (
                <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 animate-spin" />
              )}
            </div>
          </div>
          <p
            className={`text-right ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1`}
          >
            ≈ $
            {buyAmount
              ? (parseFloat(buyAmount) * buyToken.price).toFixed(2)
              : "0.00"}
          </p>
        </div>

        {/* Additional Swap Details */}
        {sellAmount && (
          <div className="space-y-2 px-2">
            <div className="flex items-center justify-between text-sm">
              <span
                className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Price Impact
              </span>
              <span
                className={`${Number(priceImpact) < 1 ? "text-green-400" : "text-yellow-500"}`}
              >
                ~{priceImpact}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span
                className={`${darkMode ? "text-gray-400" : "text-gray-600"} flex items-center gap-2`}
              >
                <TrendingUp className="w-4 h-4" /> Estimated Price
              </span>
              <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>
                1 {sellToken.symbol} ={" "}
                {(buyToken.price / sellToken.price).toFixed(4)}{" "}
                {buyToken.symbol}
              </span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button
          className={`w-full py-4 px-6 ${
            darkMode
              ? "bg-gradient-to-r from-[#505050] to-[#2B2B2B]"
              : "bg-gradient-to-r from-blue-500 to-purple-600"
          } rounded-xl text-white font-medium transition-all transform hover:scale-[1.02] focus:scale-[0.98] relative group overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 via-gray-600/20 to-gray-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
          <span className="relative flex items-center justify-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </span>
        </button>
      </div>

      {/* Price Alert and Additional Information */}
      <div className="flex flex-col gap-4">
        <div
          className={`flex items-center gap-3 ${
            darkMode
              ? "text-yellow-500/80 bg-yellow-500/10 border-yellow-500/20"
              : "text-yellow-600 bg-yellow-100 border-yellow-200"
          } p-3 rounded-lg border`}
        >
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">
            Price impact warning: Large trades may significantly move market
            price
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
