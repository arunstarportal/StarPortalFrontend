// "use client";
// import { Header } from "@/components/Header";
// import React from "react";
// import { AAVE, AssetsAddress, ERC20_ABI } from "@/ContractData";
// import { useContractRead } from "@/hooks/useContractRead";
// import { useAccount } from "wagmi";
// import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
// import { useContractWrite } from "@/hooks/useContractWrite";

// const address = AAVE.sepolia.address as `0x${string}`;
// const abi = AAVE.sepolia.abi as any;
// const USDC = AssetsAddress.USDC_AAVE as `0x${string}`;

// const page = () => {
//   const { address: myAddress } = useAccount();

//   const { data: collateral } = useContractRead({
//     address,
//     abi,
//     functionName: "getUserAccountData",
//     args: [myAddress],
//   });
//   const formattedCollateral = collateral ? formatUnits(collateral[0], 6) : "0";

//   // APPROVALS
//   const { executeWrite: approve, error: approveError } = useContractWrite({
//     address: USDC,
//     abi: ERC20_ABI,
//     functionName: "approve",
//     args: [address, parseUnits("100", 6)],
//   });

//   //Supply
//   const { executeWrite: supply, error: supplyError } = useContractWrite({
//     address,
//     abi: "",
//     functionName: "supply",
//     args: [USDC, parseUnits("100", 6), myAddress, 0],
//   });

//   // for supplying ethrer the contract address used is - 0x387d311e47e80b498169e6fb51d3193167d89F7D with function named depositETH
//   /* parameters
// 0	undefined	address	0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951
// 1	onBehalfOf	address	0x7B5C40aB02D16e2Ca43D466ADF5e3002b436c857
// 2	referralCode	uint16	0

//  for borrow -- function name borrow
//  #	Name	Type	Data
// 0	asset	address	0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
// 1	amount	uint256	1000000
// 2	interestRateMode	uint256	2
// 3	referralCode	uint16	0
// 4	onBehalfOf	address	0x7B5C40aB02D16e2Ca43D466ADF5e3002b436c857

//   */

//   if (supplyError) {
//     console.log(supplyError);
//   }

//   return (
//     <div className="min-h-screen p-6 text-white">
//       <Header />
//       <h1 className="text-white font-medium text-xl my-6">
//         Total Collateral Base: {formattedCollateral}
//       </h1>
//       <div className="flex items-center justify-center h-[95vh] gap-5">
//         <button onClick={() => approve()} className="border px-4 py-1">
//           Approve
//         </button>
//         <button onClick={() => supply()} className="border px-4 py-1">
//           Supply
//         </button>
//       </div>
//       <SwapModal />
//     </div>
//   );
// };

// const SwapModal = () => {
//   return <div className=""></div>;
// };

// export default page;
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
