/* ================================================================
   web3modal-config.js
   إعداد Web3Modal لربط جميع المحافظ على شبكة BSC Testnet
   ================================================================= */

export const WALLET_NETWORK = {
    chainId: "0x61", // BSC Testnet — رقم الشبكة
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
        name: "BNB Testnet",
        symbol: "tBNB",
        decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
};

/* ================================================================
   مزودات المحافظ (Provider Options)
   تدعم:
   - MetaMask
   - TrustWallet
   - Binance Wallet
   - WalletConnect v2
   ================================================================= */

export const providerOptions = {
    walletconnect: {
        package: window.WalletConnectProvider.default,
        options: {
            rpc: {
                97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            },
            chainId: 97,
        },
    },

    binancechainwallet: {
        package: true,
    },

    metamask: {
        package: true,
    },

    trustwallet: {
        package: true,
    },
};
