import { protocolData } from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MoveRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const LeftHeader = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProtocols, setFilteredProtocols] = useState<any>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const searchResults = protocolData.filter((protocol) =>
      protocol.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProtocols(searchResults.slice(0, 5)); // Limit to 5 results
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRecommendationClick = (protocol: any) => {
    router.push(`/${protocol.category.toLowerCase()}/${protocol.slug}`);
    setSearchTerm("");
    setFilteredProtocols([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleNavigation();
    }
  };

  const handleNavigation = () => {
    const matchingProtocol = protocolData.find(
      (protocol) => protocol.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (matchingProtocol) {
      router.push(
        `/${matchingProtocol.category.toLowerCase()}/${matchingProtocol.slug}`
      );
      setSearchTerm("");
      setFilteredProtocols([]);
    }
  };

  return (
    <div className="relative flex-1 max-w-xl " ref={searchContainerRef}>
      <motion.div className="relative">
        <motion.div
          whileHover={{ scale: 1.005 }}
          className={`relative transition-all duration-300 `}
        >
          <input
            ref={inputRef}
            type="text"
            className="text-white ml-5 w-full pl-12 pr-14 py-2 bg-black rounded-xl border border-borderlight focus:border-purple-500/50 outline-none transition-all duration-300"
            placeholder="Search protocols, tokens, addresses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
          />
          <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleNavigation}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-900 p-2 rounded-lg transition-all duration-300"
            >
              <MoveRight className="text-white w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
        <AnimatePresence>
          {isInputFocused && searchTerm && filteredProtocols.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-2 w-full bg-[#171717] border border-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-2">
                {filteredProtocols.map((protocol: any, index: number) => (
                  <motion.div
                    key={protocol.slug}
                    onClick={() => handleRecommendationClick(protocol)}
                    className={`flex items-center gap-4 p-3 hover:bg-gray-800/50 rounded-lg cursor-pointer group transition-all ${
                      index !== filteredProtocols.length - 1
                        ? "border-b border-gray-800"
                        : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={`/svgs/${protocol.icon}.svg`}
                        alt={protocol.name}
                        className="w-10 h-10 rounded-lg p-2 bg-gray-800/50 group-hover:bg-gray-700/50 transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white flex items-center gap-2">
                        {protocol.name}
                        <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all" />
                      </p>
                      <p className="text-sm text-gray-400">
                        {protocol.category}
                      </p>
                    </div>
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                      <div className="px-3 py-1 text-xs text-purple-400 bg-purple-500/10 rounded-full">
                        View
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
