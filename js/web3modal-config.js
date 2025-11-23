/* ============================================================
   web3modal-config.js
   إعداد Web3Modal لدعم جميع المحافظ
   ============================================================ */

import { CONFIG } from "../config/config.js";

/* ============================================================
   1 — مزودي المحافظ (Provider Options)
   ============================================================ */

export const providerOptions = {
    walletconnect: {
        package: window.WalletConnectProvider.default,
        options: {
            rpc: {
                97: CONFIG.NETWORK.rpcUrls[0], // BSC TESTNET
            },
            chainId: 97
        }
    },

    binancechainwallet: {
        package: true
    }
};

/* ============================================================
   2 — بيانات الشبكة (BSC Testnet)
   ============================================================ */

export const WALLET_NETWORK = {
    chainId: CONFIG.NETWORK.chainId,
    chainName: CONFIG.NETWORK.chainName,
    rpcUrls: CONFIG.NETWORK.rpcUrls,
    nativeCurrency: CONFIG.NETWORK.nativeCurrency,
    blockExplorerUrls: CONFIG.NETWORK.blockExplorerUrls
};
