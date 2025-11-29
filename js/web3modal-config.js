import WalletConnectProvider from "https://cdn.jsdelivr.net/npm/@walletconnect/ethereum-provider@2.9.0/dist/index.min.js";

export const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            projectId: "b2e38cb3a203f72c1d6439c9b0cc8e09", 
            chains: [56], // BNB Chain Mainnet
        }
    }
};

export const BSC_PARAMS = {
    chainId: "0x38",
    chainName: "BNB Smart Chain",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com/"]
};
