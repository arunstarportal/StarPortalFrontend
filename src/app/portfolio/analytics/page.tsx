"use client";
import React, { useState } from "react";
import {
  BarChart2,
  Clock,
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

// Dummy data for charts
const portfolioHistory = [
  { date: "Jan", value: 45000 },
  { date: "Feb", value: 52000 },
  { date: "Mar", value: 49000 },
  { date: "Apr", value: 63000 },
  { date: "May", value: 58000 },
  { date: "Jun", value: 71000 },
  { date: "Jul", value: 84000 },
  { date: "Aug", value: 82000 },
  { date: "Sep", value: 96000 },
  { date: "Oct", value: 88000 },
  { date: "Nov", value: 105000 },
  { date: "Dec", value: 118000 },
];

const assetAllocation = [
  { name: "Bitcoin", value: 45, color: "#F7931A" },
  { name: "Ethereum", value: 30, color: "#627EEA" },
  { name: "Solana", value: 15, color: "#00FFA3" },
  { name: "Other", value: 10, color: "#B8B8B8" },
];

const topPerformers = [
  { asset: "SOL", change: 234.5, value: "$118.45" },
  { asset: "ETH", change: 89.2, value: "$2,285.30" },
  { asset: "MATIC", change: 45.8, value: "$0.98" },
  { asset: "AVAX", change: 28.4, value: "$35.67" },
];

const worstPerformers = [
  { asset: "DOGE", change: -12.3, value: "$0.078" },
  { asset: "XRP", change: -8.7, value: "$0.54" },
  { asset: "DOT", change: -5.4, value: "$7.23" },
  { asset: "ADA", change: -3.2, value: "$0.45" },
];

const AnalyticsPage = () => {
  const [selectedTab, setSelectedTab] = useState("analytics");
  const [timeframe, setTimeframe] = useState("1Y");

  return (
    <div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Portfolio Value",
            value: "$118,234.45",
            change: "+12.5%",
            icon: <DollarSign className="w-6 h-6" />,
            positive: true,
          },
          {
            title: "24h Change",
            value: "+$1,234.45",
            change: "+2.3%",
            icon: <TrendingUp className="w-6 h-6" />,
            positive: true,
          },
          {
            title: "Total Profit/Loss",
            value: "$45,234.45",
            change: "+45.8%",
            icon: <BarChart2 className="w-6 h-6" />,
            positive: true,
          },
          {
            title: "Assets Count",
            value: "15",
            change: "+2",
            icon: <Wallet className="w-6 h-6" />,
            positive: true,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-[#141414] border-[.5px] border-gray-500/50 rounded-xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400">{stat.title}</span>
              <div className="p-2 rounded-lg bg-[#1a1a1a]">{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold mb-2">{stat.value}</div>
            <div
              className={`flex items-center gap-1 ${stat.positive ? "text-green-400" : "text-red-400"}`}
            >
              {stat.positive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Portfolio Value Chart */}
        <div className="lg:col-span-2 bg-[#141414] border-[.5px] border-gray-500/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Portfolio Value</h2>
            <div className="flex gap-2">
              {["1M", "3M", "6M", "1Y"].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-3 py-1 rounded-lg ${
                    timeframe === period
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-[#1a1a1a] text-gray-400 hover:bg-[#222]"
                  } transition-colors`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioHistory}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="bg-card border-[.5px] border-gray-500/50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Asset Allocation</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={assetAllocation}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {assetAllocation.map((asset, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: asset.color }}
                />
                <span className="text-sm text-gray-400">
                  {asset.name} ({asset.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best/Worst Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-[#141414] border-[.5px] border-gray-500/50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Top Performers</h2>
          <div className="space-y-4">
            {topPerformers.map((asset, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-[#1a1a1a] rounded-lg"
              >
                <div className="font-medium">{asset.asset}</div>
                <div className="text-right">
                  <div className="font-medium">{asset.value}</div>
                  <div className="text-green-400 flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    {asset.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worst Performers */}
        <div className="bg-[#141414] border-[.5px] border-gray-500/50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Worst Performers</h2>
          <div className="space-y-4">
            {worstPerformers.map((asset, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-[#1a1a1a] rounded-lg"
              >
                <div className="font-medium">{asset.asset}</div>
                <div className="text-right">
                  <div className="font-medium">{asset.value}</div>
                  <div className="text-red-400 flex items-center gap-1">
                    <ArrowDownRight className="w-4 h-4" />
                    {Math.abs(asset.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
