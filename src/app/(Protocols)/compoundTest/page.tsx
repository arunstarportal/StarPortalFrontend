// "use client";
// import React from "react";
// import { COMPOUND, AssetsAddress, ERC20_ABI } from "@/ContractData";
// import { Header } from "@/components/Header";
// import { useAccount, useReadContract } from "wagmi";
// import { useContractRead } from "@/hooks/useContractRead";
// import { formatEther, parseEther, parseUnits } from "viem";
// import { useContractWrite } from "@/hooks/useContractWrite";

// const address = COMPOUND.sepoliaUSDC.address as `0x${string}`;
// const abi = COMPOUND.sepoliaUSDC.abi as any;
// const USDC = AssetsAddress.USDC_Sepolia as `0x${string}`;
// const WETH = AssetsAddress.WETH_COMP as `0x${string}`;

// // supply function can be used to supply collateral, supply the base asset, or repay an open borrow
// //when supplying the collateral asset --> supply
// //for WETH get usdc from aave faucet then swap it from uniswap

// const page = () => {
//   const { address: myAddress } = useAccount();

//   const { data: balance, isLoading } = useContractRead({
//     address,
//     abi,
//     functionName: "balanceOf",
//     args: [myAddress],
//   });

//   const { data: totalSupply, isLoading: supplyLoading } = useContractRead({
//     address,
//     abi,
//     functionName: "totalSupply",
//   });

//   const { data: WETHBalance, isLoading: balanceLoading } = useContractRead({
//     address,
//     abi,
//     functionName: "userCollateral",
//     args: [myAddress, WETH],
//   });

//   //Getting the approval
//   const { executeWrite: approve, isSuccess: appSuccess } = useContractWrite({
//     address: USDC,
//     abi: ERC20_ABI,
//     functionName: "approve",
//     args: [address, parseUnits("100", 18)],
//   });

//   const { executeWrite: approveETH, error: ethapprovError } = useContractWrite({
//     address: WETH,
//     abi: ERC20_ABI,
//     functionName: "approve",
//     args: [address, parseUnits("0.1", 18)],
//   });

//   //sending the ether
//   const {
//     executeWrite: supplyAsset,
//     isSuccess: suppSuccess,
//     error: supplyError,
//   } = useContractWrite({
//     address: address,
//     abi: abi,
//     functionName: "supply",
//     args: [USDC, parseUnits("10", 6)],
//   });

//   const { executeWrite: supplyETH, error: supplyETHerror } = useContractWrite({
//     address: address,
//     abi: abi,
//     functionName: "supply",
//     args: [WETH, parseUnits("0.1", 18)],
//   });

//   if (supplyError) {
//     console.log(supplyError);
//   }
//   if (ethapprovError) {
//     console.log(ethapprovError);
//   }
//   if (supplyETHerror) {
//     console.log(supplyETHerror);
//   }

//   return (
//     <div className="p-6">
//       <Header />
//       <div className=" h-[90vh]">
//         <h1 className="text-white text-xl font-medium">
//           Balance : {isLoading ? "Loding..." : formatEther(balance)}
//         </h1>
//         <h2 className="text-white text-xl font-medium">
//           Total Supply :{" "}
//           {supplyLoading ? "Loding..." : formatEther(totalSupply)}
//         </h2>
//         <h2 className="text-white text-xl font-medium">
//           Total WETH : {balanceLoading ? "Loding..." : formatEther(WETHBalance)}
//         </h2>
//         <div className="flex justify-center items-center">
//           <button
//             onClick={() => approve()}
//             className="border px-4 py-1 text-white text-xl mx-4 font-medium"
//           >
//             Approve USDC
//           </button>
//           <button
//             onClick={() => supplyAsset()}
//             className="border px-4 py-1 text-white text-xl mx-4 font-medium"
//           >
//             Stake USDC
//           </button>
//           <button
//             onClick={() => approveETH()}
//             className="border px-4 py-1 text-white text-xl mx-4 font-medium"
//           >
//             Approve WETH
//           </button>
//           <button
//             onClick={() => supplyETH()}
//             className="border px-4 py-1 text-white text-xl mx-4 font-medium"
//           >
//             Stake WETH
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
