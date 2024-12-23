import { ChevronDown } from "lucide-react";

const TokenInput = ({
  token,
  tokenBalance,
  tokenAmount,
  onTokenAmountChange,
  onTokenSelect,
  label,
}) => (
  <div className="bg-white/10 rounded-xl p-4">
    <p className="mb-3 text-xl font-medium text-gray-300">{label}</p>
    <div className="flex items-center space-x-4">
      <input
        type="number"
        placeholder="0.0"
        value={tokenAmount || ""}
        onChange={onTokenAmountChange}
        className="flex-grow bg-[#000000a5] px-3 py-2 text-2xl font-bold rounded-lg outline-none border-none focus:ring-1 focus:ring-purple-500/70 duration-300"
      />
      <button
        onClick={onTokenSelect}
        className="flex items-center justify-center gap-2 px-3 py-2 min-w-[10vw] hover:scale-105 bg-[#000000a5] rounded-lg border-[.5px] border-gray-500/30 text-gray-400 hover:text-white hover:bg-[#222] transition-all duration-300"
      >
        {token ? (
          <div className="flex items-center justify-between gap-2">
            <img
              src={token.image?.small}
              alt=""
              className="w-6 h-6 mix-blend-screen"
            />
            <p className="text-sm font-medium text-white">
              {token.symbol.toUpperCase()}
            </p>
            <ChevronDown size={17} color="white" />
          </div>
        ) : (
          <>
            <p className="text-defaultText font-medium text-sm py-1">
              SELECT TOKEN
            </p>
            <ChevronDown size={17} color="white" />
          </>
        )}
      </button>
    </div>
    <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
      <span>$ 0.00</span>
      <span>
        Balance:{" "}
        {tokenBalance
          ? tokenBalance.toString().split(".")[0] +
            "." +
            (tokenBalance.toString().split(".")[1] || "")
              .padEnd(5, "0")
              .substring(0, 5)
          : 0}
      </span>
    </div>
  </div>
);

export default TokenInput;
