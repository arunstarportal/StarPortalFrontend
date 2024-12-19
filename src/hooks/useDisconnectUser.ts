import { signOut } from "next-auth/react";
import { useDisconnect } from "wagmi";

const useDisconnectUser = () => {
  const { disconnect: walletDisconnect } = useDisconnect();

  const disconnectUser = () => {
    signOut(); // Disconnect NextAuth session
    walletDisconnect(); // Disconnect from wallet
    window.localStorage.removeItem("star_authTokens"); // Remove custom tokens
    window.localStorage.removeItem("hasWalletBeenHandled");
  };

  return disconnectUser;
};

export default useDisconnectUser;
