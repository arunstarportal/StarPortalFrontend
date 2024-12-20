import {
  Timer,
  Zap,
  TrendingUp,
  Settings,
  Info,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const SwapSettings = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [slippage, setSlippage] = useState(0.5); // Default 0.5%
  const [priorityMode, setPriorityMode] = useState("balanced");
  const [customSlippage, setCustomSlippage] = useState("");
  const [deadline, setDeadline] = useState(20); // Default 20 minutes

  // Predefined slippage options
  const slippageOptions = [0.1, 0.5, 1.0];

  // Priority modes
  const priorityModes = [
    {
      id: "fast",
      name: "Fast",
      icon: <Zap className="w-4 h-4 mr-2" />,
      description: "Prioritize speed of transaction",
    },
    {
      id: "balanced",
      name: "Balanced",
      icon: <Timer className="w-4 h-4 mr-2" />,
      description: "Optimal balance of speed and cost",
    },
    {
      id: "economic",
      name: "Economic",
      icon: <TrendingUp className="w-4 h-4 mr-2" />,
      description: "Minimize transaction costs",
    },
  ];

  // Handle slippage selection
  const handleSlippageSelect = (value) => {
    setSlippage(value);
    setCustomSlippage(""); // Reset custom input
  };

  // Handle custom slippage input
  const handleCustomSlippageInput = (e) => {
    const value = e.target.value;
    setCustomSlippage(value);

    // Validate and set custom slippage
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setSlippage(numValue);
    }
  };

  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className="  relative"
      >
        <Settings className="text-white hover:text-gray-300  " />
        {isSettingsOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-80 bg-gray-800 rounded-xl shadow-2xl p-4 z-50 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              {/* Slippage Tolerance */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center text-sm">
                    <Info className="w-4 h-4 mr-2 text-gray-400" />
                    Slippage Tolerance
                  </label>
                  <span className="text-sm text-blue-400">{slippage}%</span>
                </div>

                {/* Predefined Slippage Options */}
                <div className="flex space-x-2 mb-2">
                  {slippageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSlippageSelect(option)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        slippage === option
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {option}%
                    </button>
                  ))}

                  {/* Custom Slippage Input */}
                  <input
                    type="text"
                    placeholder="Custom"
                    value={customSlippage}
                    onChange={handleCustomSlippageInput}
                    className="w-20 px-2 py-1 rounded-full bg-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Transaction Deadline */}
              <div>
                <label className="flex items-center text-sm mb-2">
                  <Info className="w-4 h-4 mr-2 text-gray-400" />
                  Transaction Deadline
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={deadline}
                    onChange={(e: any) => setDeadline(e.target.value)}
                    className="w-20 px-2 py-1 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-400">minutes</span>
                </div>
              </div>

              {/* Priority Mode */}
              <div>
                <label className="text-sm mb-2 block">
                  Transaction Priority
                </label>
                <div className="space-y-2">
                  {priorityModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setPriorityMode(mode.id)}
                      className={`w-full flex items-center p-2 rounded-lg text-left ${
                        priorityMode === mode.id
                          ? "bg-blue-600/30 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {mode.icon}
                      <div>
                        <div className="font-semibold">{mode.name}</div>
                        <div className="text-xs text-gray-400">
                          {mode.description}
                        </div>
                      </div>
                      {priorityMode === mode.id && (
                        <div className="ml-auto">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default SwapSettings;
