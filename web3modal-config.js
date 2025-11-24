
/* ============================================================
   web3modal-config.js — دعم جميع المحافظ
   MetaMask – TrustWallet – BinanceWallet
   باستخدام Web3Modal v2 مع BSC Testnet
============================================================ */

export const WALLET_NETWORK = {
    chainId: "0x61", // BSC Testnet
    chainName: "Binance Smart Chain Testnet",
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18
    },
    blockExplorerUrls: ["https://testnet.bscscan.com/"]
};

/* خيارات المحافظ */
export const providerOptions = {
    walletconnect: {
        package: window.WalletConnectProvider.default,
        options: {
            rpc: {
                97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
            },
            network: "binance"
        }
    }
};
