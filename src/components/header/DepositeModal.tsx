import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import { useState } from "react";

export const DepositeModal = ({ isOpen, onClose, setIsLoginOpen }) => {
  const [activeTab, setActiveTab] = useState("transfer");
  const [selectedNetwork, setSelectedNetwork] = useState("Solana");
  const [showCopied, setShowCopied] = useState(false);

  const depositAddress = "FDCR2CYdZIRiURCwuFKdiEQE8Wtbkh3yX2GmbfiWKU2D";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(depositAddress);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#171717] border border-gray-500/50 shadow-white/30 w-[90%] max-w-lg rounded-lg p-6 relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* Modal Title */}
            <h2 className="text-white text-xl font-semibold mb-4">Deposit</h2>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-4">
              {[
                { key: "transfer", label: "Transfer manually" },
                { key: "wallet", label: "Pay with a wallet" },
                { key: "crypto", label: "Buy Crypto" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`flex-1 py-2 text-center text-sm font-medium ${
                    activeTab === tab.key
                      ? "text-white border-b-2 border-purple-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            {activeTab === "transfer" && (
              <div>
                {/* Network Selection */}
                <div className="mb-4">
                  <label className="text-gray-400 text-sm mb-2 block">
                    Network
                  </label>
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="w-full bg-[#2c2c2c] text-white border border-gray-700 rounded-md px-4 py-2"
                  >
                    <option>Solana</option>
                    <option>Ethereum</option>
                    <option>Polygon</option>
                  </select>
                </div>

                {/* Balance Display */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">Balance</p>
                  <p className="text-white text-lg">0 {selectedNetwork}</p>
                </div>

                {/* Deposit Instructions */}
                <div className="p-4 bg-gray-800/50 rounded-md text-sm text-gray-400 mb-4">
                  Please make sure that you are depositing tokens to this
                  address on the {selectedNetwork} network.
                </div>

                {/* QR Code and Address */}
                <div className="flex items-center justify-between gap-4">
                  {/* <QRCode
                    value={depositAddress}
                    size={100}
                    bgColor="#171717"
                    fgColor="#ffffff"
                  /> */}
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-1">
                      Deposit Address
                    </p>
                    <p className="text-white text-sm bg-gray-800/50 rounded-md px-3 py-2 flex items-center justify-between">
                      {depositAddress}
                      <button
                        onClick={copyToClipboard}
                        className="text-gray-400 hover:text-white ml-2"
                      >
                        <Copy size={16} />
                      </button>
                    </p>
                    {showCopied && (
                      <p className="text-green-400 text-xs mt-1">
                        Address copied!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "wallet" && (
              <div className="text-gray-400 text-center">
                <p>Connect your wallet to deposit tokens.</p>
                {/* Example button */}
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md">
                  Connect Wallet
                </button>
              </div>
            )}

            {activeTab === "crypto" && (
              <div className="text-gray-400 text-center">
                <p>Use a payment method to buy crypto directly.</p>
                {/* Example content */}
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md">
                  Buy Crypto
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
