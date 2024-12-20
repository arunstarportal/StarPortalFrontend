"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAccount, useProof } from "wagmi";
import axios from "axios";
import { Wallet } from "lucide-react";
import { BASE_URL } from "@/Config";
import { useDispatch, useSelector } from "react-redux";
import { setPortfolioData } from "@/redux/userPortfolioSlice";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

// Token types
interface TokenBalance {
  name: string;
  symbol: string;
  icon: string;
  balance: string;
  usdValue: number;
  usdPrice: number;
}
interface ChainBalance {
  chain: string;
  image: string;
  totalBalance: number;
}

const PortfolioSection: React.FC = () => {
  const [balances, setBalances] = useState<ChainBalance[]>([]);
  const [grandTotalBalance, setGrandTotalBalance] = useState<number>(0);
  const router = useRouter();

  // @ts-ignore
  const profileData = useSelector((state) => state.userProfile.user);

  // @ts-ignore
  const userPortfolio = useSelector((state) => state.userPortfolio);
  const dispatch = useDispatch();

  const parseTokens = async (data) => {
    const chains: ChainBalance[] = [];
    let grandTotal = 0;

    Object.entries(data).forEach(([chain, details]: any) => {
      if (chain === "grand_total_balance") {
        grandTotal = details as number;
      } else {
        chains.push({
          chain,
          image: details.chain_image,
          totalBalance: details.total_balance || 0,
        });
      }
    });

    dispatch(setPortfolioData(data));

    setBalances(chains);
    setGrandTotalBalance(grandTotal);
  };

  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        const userWallet = JSON.parse(
          window.localStorage.getItem("star_authTokens")
        ).eth_Address;

        const response = await axios.get(
          `${BASE_URL}/user/getUserTokenBalance?address=${userWallet}`
        );

        const data = response.data;
        if (response.status === 200) {
          parseTokens(data);
        }
      } catch (error) {
        console.log("Error fetching wallet data:", error);
      }
    };

    if (profileData && !userPortfolio.data) {
      console.log("Fetching portfolio");
      fetchUserWallet();
    } else if (userPortfolio.data) {
      parseTokens(userPortfolio.data);
    }
  }, [profileData]);

  if (!profileData) {
    return;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#141414] w-[79vw] rounded-2xl px-6 py-4 my-4 shadow-xl border border-gray-500/50 overflow-hidden"
    >
      <div className="flex items-center justify-between mx-4">
        <div className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-gray-400" />
          <h2
            onClick={() => router.push("/portfolio")}
            className="text-2xl font-bold text-white hover:text-purple-300 duration-300 cursor-pointer"
          >
            Total Chain Balances
          </h2>
        </div>
        <div className="flex items-end gap-2">
          <h3 className="text-4xl font-bold text-white">
            {grandTotalBalance.toFixed(2)}
          </h3>
          <span className="text-gray-400 mb-1">USD</span>
        </div>
      </div>

      {balances.length > 0 ? (
        <div className="relative mt-6">
          <div className="flex justify-around gap-4 overflow-x-scroll scrollbar-hide">
            {balances.map((chain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 bg-[#222222] rounded-xl p-4 w-[18rem] hover:bg-[#2a2a2a] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10">
                    <img
                      src={chain.image}
                      alt={chain.chain}
                      className="w-full h-full rounded-full ring-2 ring-gray-500/20"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">
                      {chain.chain.toUpperCase()}
                    </h4>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {chain.totalBalance.toFixed(4)}
                  </span>
                  <span className="text-gray-500 text-sm">Chain Balance</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center my-2">
          <BarLoader color="#fff" width={200} height={2} />
        </div>
      )}
    </motion.div>
  );
};

export default PortfolioSection;
