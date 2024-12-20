import { ethers, providers } from "ethers";

export function getTestNetProvider(RPC_URL: string): providers.Provider {
  return new ethers.providers.JsonRpcProvider(RPC_URL);
}
export function getProvider(RPC_URL: string): providers.Provider {
  return new ethers.providers.JsonRpcProvider(RPC_URL);
}
