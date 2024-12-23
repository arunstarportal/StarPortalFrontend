"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  BarChart2,
  Clock,
  Wallet,
  Download,
  Filter,
  Search,
} from "lucide-react";

const transactions = [
  {
    currency: "Ethereum",
    value: "$360.0",
    time: "29 Nov 2024, 17:54",
    icon: "⟠",
    status: "success",
  },
  {
    currency: "BSC",
    value: "$91.7M",
    time: "29 Nov 2024, 17:54",
    icon: "⛓️",
    status: "failed",
  },
  {
    currency: "Base",
    value: "$63.9M",
    time: "29 Nov 2024, 17:54",
    icon: "🔵",
    status: "success",
  },
  {
    currency: "Arbitrum",
    value: "$63.9M",
    time: "29 Nov 2024, 17:54",
    icon: "🔷",
    status: "success",
  },
  {
    currency: "Avalanche",
    value: "$62.7M",
    time: "29 Nov 2024, 17:54",
    icon: "🔺",
    status: "success",
  },
  {
    currency: "Ethereum",
    value: "$360.0",
    time: "29 Nov 2024, 17:54",
    icon: "⟠",
    status: "success",
  },
  {
    currency: "BSC",
    value: "$58.2M",
    time: "29 Nov 2024, 17:54",
    icon: "⛓️",
    status: "success",
  },
];

const TransactionHistory = () => {
  const [selectedTab, setSelectedTab] = useState("history");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#141414] border-[.5px] border-gray-500/50 rounded-xl p-6">
      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] rounded-lg border-[.5px] border-gray-500/30 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] hover:bg-[#222] transition-colors border-[.5px] border-gray-500/30">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] hover:bg-[#222] transition-colors border-[.5px] border-gray-500/30">
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      {/* Transaction Table */}
      <div className="rounded-lg overflow-y-auto h-[57vh]">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1a1a1a] text-gray-400">
              <th className="text-left py-4 px-6">Currency</th>
              <th className="text-left py-4 px-6">Value</th>
              <th className="text-left py-4 px-6">Time</th>
              <th className="text-left py-4 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, index) => (
              <tr
                key={index}
                className="border-t border-gray-300/30 hover:bg-[#1a1a1a] transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <span>{tx.icon}</span>
                    </div>
                    <span className="font-medium">{tx.currency}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-medium">{tx.value}</span>
                  <span className="text-gray-400 ml-1">USDT</span>
                </td>
                <td className="py-4 px-6 text-gray-400">{tx.time}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-2 ${
                      tx.status === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        tx.status === "success" ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></span>
                    {tx.status === "success" ? "Success" : "Failed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
