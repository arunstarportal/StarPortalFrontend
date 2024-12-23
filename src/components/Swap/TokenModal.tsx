import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { BadgeInfo, Search, X } from "lucide-react";
import { truncate } from "lodash";

const SelectTokenModal = ({ isOpen, onClose, type, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tokenResults, setTokenResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Validate Ethereum and Solana addresses
  const isEthereumAddress = (input) => /^0x[a-fA-F0-9]{40}$/.test(input);
  const isSolanaAddress = (input) =>
    /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(input);

  // Move API call logic to a separate function
  const fetchTokenData = async (input) => {
    if (!input) {
      setTokenResults([]);
      return;
    }

    setIsLoading(true);

    console.log("api is hitting hurr");

    try {
      const options = {
        headers: {
          accept: "application/json",
          "x-cg-api-key": process.env.COIN_GEKO_API,
        },
      };

      let response;
      if (isEthereumAddress(input) || isSolanaAddress(input)) {
        response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/id/contract/${input}`,
          options
        );
        setTokenResults([response.data]);
      } else {
        response = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${input}`,
          options
        );
        setTokenResults(response.data.coins || []);
      }
    } catch (error) {
      console.error("Error fetching token data:", error);
      setTokenResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a debounced search function using useCallback
  const debouncedSearch = useCallback(() => {
    const timeoutId = setTimeout(() => {
      fetchTokenData(searchTerm);
    }, 500);

    // Clean up the timeout if the component re-renders or searchTerm changes
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Update input handler to only update search term
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Use useEffect to handle the debounced search
  useEffect(() => {
    if (searchTerm) {
      const cleanup = debouncedSearch();
      return cleanup;
    } else {
      setTokenResults([]);
    }
  }, [searchTerm, debouncedSearch]);

  const handleTokenSelect = (token) => {
    onSelect(token);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-md bg-card rounded-2xl border border-borderlight shadow-2xl animate-scale-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-defaultText">
            Select {type === "from" ? "Sell" : "Receive"} Token
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="relative p-4">
          <input
            type="text"
            placeholder="Enter token address or name"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full bg-black px-4 py-2 rounded-lg pl-10 placeholder:text-defaultText outline-none border-none"
          />
          <Search
            className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>

        <div className="px-4 pb-4">
          {tokenResults.length > 0 ? (
            <ul className="max-h-[50vh] space-y-3 overflow-y-scroll">
              {tokenResults.map((token, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#000000a5] hover:bg-white/5 transition cursor-pointer"
                  onClick={() => handleTokenSelect(token)}
                >
                  <div className="w-10 h-auto flex-shrink-0">
                    {token.image ? (
                      <img
                        src={token.image?.small}
                        alt=""
                        className="w-full h-full object-contain mix-blend-screen"
                      />
                    ) : (
                      <BadgeInfo size={25} color="white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-start gap-3">
                      <p className="text-white font-semibold">{token.name}</p>
                      <p className="text-gray-400 text-sm">
                        {token.symbol?.toUpperCase()}
                      </p>
                    </div>
                    {token.contract_address && (
                      <p className="text-gray-400 text-sm font-medium">
                        {truncate(token.contract_address, { length: 20 })}
                      </p>
                    )}
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
