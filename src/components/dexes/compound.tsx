import { useContractWrite } from "@/hooks/useContractWrite";
import {
  MinusCircle,
  PlusCircle,
  Shield,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm mb-2 group-hover:text-gray-300 transition-colors">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {value}
        </h3>
        {change && (
          <div className="flex items-center gap-2 mt-2">
            {change.startsWith("+") ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <p
              className={`text-sm ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
            >
              {change} (24h)
            </p>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-800/50 rounded-lg group-hover:bg-purple-500/20 transition-all duration-300">
        {icon}
      </div>
    </div>
  </div>
);
