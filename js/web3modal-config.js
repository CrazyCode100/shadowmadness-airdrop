export const WALLET_NETWORK = {
    chainId: "0x61",
    chainName: "BSC Testnet",
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    nativeCurrency: { name: "BNB", symbol: "tBNB", decimals: 18 }
};

export const providerOptions = {
    walletconnect: {
        package: window.WalletConnectProvider.default,
        options: {
            rpc: {
                97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
            }
        }
    }
};
