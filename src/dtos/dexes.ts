export type ActionType = "supply" | "borrow";

export interface WriteContractConfig {
  address: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
}

// Define type for Asset Data
export interface AssetData {
  id: string;
  icon: string; // Assuming URL or path to the icon
  label: string;
  balance: number;
  apy: string;
}

// Define type for Props of AssetRow
export interface AssetRowProps {
  img: string;
  label: string;
  token: string;
  walletBalance: number;
  change: string;
  apy: string;
}

// Define type for Props of StatCard
export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  type: "supply" | "borrow";
  handleSupply: (actionType: "supply" | "borrow", amount: number) => void;
}

// Contract related types
export type ContractAddresses = {
  COMPOUND_ADDRESS: `0x${string}`;
  USDC_ADDRESS: `0x${string}`;
};

// Component state interfaces
export interface TransactionState {
  supplyAmount: number;
  borrowAmount: number;
  isApproved: boolean;
}
