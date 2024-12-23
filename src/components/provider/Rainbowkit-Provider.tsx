'use client';
import React, { useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '@/Config/Wagmi';
import ReactQueryProvider from './react-query-provider';
import { ConnectionProvider, WalletProvider,useWallet, useAnchorWallet,useConnection } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton, } from "@solana/wallet-adapter-react-ui";
import {
 PhantomWalletAdapter,
  SolflareWalletAdapter,

} from "@solana/wallet-adapter-wallets";
import '@solana/wallet-adapter-react-ui/styles.css';
import { BASE_URL } from '@/Config';

const RainbowKitProviderWrapper = ({ children }) => {

    const endpoint = BASE_URL; // local cluster override
  
    const wallets = useMemo( () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ], []);
  


	return (
        <ConnectionProvider endpoint={ endpoint }>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
			<WagmiProvider config={config}>
				<ReactQueryProvider >
					<RainbowKitProvider theme={darkTheme()}>
						{children}
					</RainbowKitProvider>
				</ReactQueryProvider>
			</WagmiProvider>
            </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
	);
};

export default RainbowKitProviderWrapper;
