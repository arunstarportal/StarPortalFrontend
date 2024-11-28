// import { ActionType } from "@/dtos/dexes";
// import { parseUnits } from "viem";

// const handleSupply = (
//   actionType: ActionType,
//   amount: number
// ): Promise<void> => {
//   if (!myAddress) {
//     alert("Please connect your wallet");
//     return;
//   }

//   try {
//     const amountInWei = parseUnits(amount.toString(), 6);
//     switch (actionType) {
//       case "supply":
//         // Implement supply logic
//         setSupplyAmount((prevAmount) => prevAmount + amount);

//         console.log(`Supplied ${amountInWei} USDC`);

//         const approveConfig: any = {
//           address: USDC_ADDRESS,
//           abi: ERC20_ABI,
//           functionName: "approve",
//           args: [COMPOUND_ADDRESS, amountInWei],
//         };

//         writeContract(approveConfig);

//         break;
//       case "borrow":
//         // Implement borrow logic
//         setBorrowAmount((prevAmount) => prevAmount + amount);
//         console.log(`Borrowed ${amount} USDC`);
//         break;
//       default:
//         throw new Error("Invalid action type");
//     }
//   } catch (error) {
//     console.log("Transaction failed:", error);
//   }
// };

// const handleSupplyAsset = () => {
//   const amountInWei = parseUnits("100", 6);

//   const supplyArgs: any = {
//     address: COMPOUND_ADDRESS,
//     abi: COMPOUND.sepoliaUSDC.abi,
//     functionName: "supply",
//     args: [USDC_ADDRESS, amountInWei],
//   };
//   writeContract(supplyArgs);
// };
