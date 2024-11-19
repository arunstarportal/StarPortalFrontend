"use client";
import { Header } from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioTokens, protocolData } from "@/data";
import { useState } from "react";
import { TrendingUp, ArrowUpDown, Search, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

const PortfolioSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#171717] rounded-2xl px-6 py-4 my-8 shadow-xl border border-gray-500/50"
    >
      <div className="flex items-center justify-between mb-6 mx-4">
        <div className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-gray-400" />
          <h2 className="text-2xl font-bold text-white">Total Balance</h2>
        </div>
        <div className="flex items-end gap-2">
          <h3 className="text-4xl font-bold text-white">0.00</h3>
          <span className="text-gray-400 mb-1">USD</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-around gap-4 scrollbar-hide">
          {portfolioTokens.map((token, index) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 bg-[#222222] rounded-xl p-4 min-w-[200px] hover:bg-[#2a2a2a] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10">
                  <img
                    src={token.icon}
                    alt={token.name}
                    className="w-full h-full rounded-full ring-2 ring-gray-500/20"
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium">{token.name}</h4>
                  <p className="text-gray-500 text-sm">{token.symbol}</p>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {token.balance}
                </span>
                <span className="text-gray-500 text-sm">{token.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Filter and sort logic remains the same
  const filteredData = protocolData
    .filter((protocol) =>
      activeTab === "All" ? true : protocol.category === activeTab
    )
    .filter((protocol) =>
      protocol.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedData = [...filteredData].sort(
    (a: (typeof protocolData)[number], b: (typeof protocolData)[number]) => {
      if (!sortBy) return 0;
      const valueA =
        parseFloat((a[sortBy] as string).replace(/[$,]/g, "")) || 0;
      const valueB =
        parseFloat((b[sortBy] as string).replace(/[$,]/g, "")) || 0;
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
  );

  const handleSort = (field: any) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="max-h-screen overflow-y-scroll relative bg-gradient-to-b from-[#000] via-[#28282878] to-[#000] text-gray-200 p-6">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="max-w-7xl mx-auto">
        <PortfolioSection />

        <div className="space-y-8 my-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-gray-400" />
                <h1 className="text-3xl font-bold text-white">
                  Trending Protocols
                </h1>
              </div>
              <p className="text-gray-400">
                Track and analyze the top performing protocols in real-time
              </p>
            </div>
            <div className="flex justify-center w-[50%] bg-[#171717] rounded-xl p-1.5 shadow-xl">
              <div className="flex justify-around space-x-1 w-full">
                {[
                  "All",
                  "Dexes",
                  "Lending",
                  "Liquid Staking",
                  "Restaking",
                  "RWA",
                ].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-[#3B3A3A] to-[#2f2e2e] text-white shadow-lg"
                        : "hover:bg-white/5 text-gray-400"
                    }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#171717] rounded-xl overflow-hidden shadow-xl border border-gray-500/30">
            <div className="overflow-x-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#222222] border-b border-gray-300/50">
                    <th className="p-5 text-gray-400/80 text-lg font-medium pl-7">
                      Name
                    </th>
                    <th className="p-5 text-gray-400/80 text-lg font-medium">
                      Category
                    </th>
                    <th
                      onClick={() => handleSort("tvl")}
                      className="p-5 text-gray-400/80 text-lg font-medium cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        TVL
                        <ArrowUpDown
                          className={`w-4 h-4 transition-colors ${
                            sortBy === "tvl"
                              ? "text-purple-400"
                              : "text-gray-600 group-hover:text-gray-400"
                          }`}
                        />
                      </div>
                    </th>
                    <th className="p-5 text-gray-400/80 text-lg font-medium">
                      Fees 24h
                    </th>
                    <th
                      onClick={() => handleSort("revenue")}
                      className="p-5 text-gray-400/80 text-lg font-medium cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        Revenue
                        <ArrowUpDown
                          className={`w-4 h-4 transition-colors ${
                            sortBy === "revenue"
                              ? "text-purple-400"
                              : "text-gray-600 group-hover:text-gray-400"
                          }`}
                        />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <AnimatePresence>
                    {sortedData.length > 0 ? (
                      sortedData.map((protocol, index) => (
                        <motion.tr
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          key={index}
                          onClick={() =>
                            router.push(
                              `/${protocol.category.toLowerCase()}/${protocol.slug}`
                            )
                          }
                          className="border-b border-[#2c2c2c] hover:bg-[#222222] transition-all duration-300"
                        >
                          <td className="p-5 cursor-pointer">
                            <div className="flex items-center gap-4">
                              <div className="bg-[#212121] text-white flex items-center justify-center text-sm font-medium w-8 h-8 rounded-full">
                                {index + 1}
                              </div>
                              <div className="relative">
                                <img
                                  src={`/svgs/${protocol.icon}.svg`}
                                  alt={protocol.name}
                                  className="w-11 h-11 rounded-full ring-2 ring-gray-500/20"
                                />
                              </div>
                              <div>
                                <p className="text-white font-semibold">
                                  {protocol.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {protocol.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-5">
                            <span className="px-3 py-1 rounded-full bg-[#262626] text-white/70 text-sm">
                              {protocol.category}
                            </span>
                          </td>
                          <td className="p-5">
                            <span className="font-medium text-green-400">
                              {protocol.tvl}
                            </span>
                          </td>
                          <td className="p-5">
                            <span className="text-blue-300">
                              {protocol.fees}
                            </span>
                          </td>
                          <td className="p-5">
                            <span className="font-bold text-purple-400">
                              {protocol.revenue}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-16">
                          <div className="flex flex-col items-center gap-2">
                            <Search className="w-8 h-8 text-gray-600" />
                            <p className="text-gray-400 font-medium text-lg">
                              No protocols found
                            </p>
                            <p className="text-gray-600 text-sm">
                              Try adjusting your search or filters
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
