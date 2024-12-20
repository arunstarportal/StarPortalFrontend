import axios from "axios";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const SelectTokenModal = ({ isOpen, onClose, type, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tokenResults, setTokenResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCoinSearch = async () => {
    if (!searchTerm) return;
    setIsLoading(true);

    try {
      const options = {
        headers: {
          accept: "application/json",
          "x-cg-api-key": process.env.COIN_GEKO_API,
        },
      };
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/id/contract/${searchTerm}`,
        options
      );
      setTokenResults([response.data]);
    } catch (error) {
      console.error("Error fetching token data:", error);
      setTokenResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenSelect = (token) => {
    onSelect(token);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-md bg-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl animate-scale-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            Select {type === "from" ? "Sell" : "Receive"} Token
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Enter token address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
          <button
            onClick={handleCoinSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2 rounded-lg font-medium text-white hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Token Results */}
        <div className="p-4">
          {tokenResults.length > 0 ? (
            <ul>
              {tokenResults.map((token, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => handleTokenSelect(token)}
                >
                  <div className="w-14 h-auto flex-1">
                    <img
                      src={token.image.small}
                      alt=""
                      className="w-full h-full object-contain "
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{token.name}</p>
                    <p className="text-gray-400 text-sm">{token.symbol}</p>
                    <p className="text-gray-500 text-sm">
                      {token.contract_address}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center">
              {isLoading ? "Loading tokens..." : "No tokens found"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectTokenModal;
