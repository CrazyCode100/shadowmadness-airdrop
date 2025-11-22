// =========================
// 🔧 إعدادات العقد (TESTNET)
// =========================

export const CONTRACT_ADDRESS = "0x2431bB3634b46dE79390CC843de2052298cB9121"; // عقدك
export const TWITTER_USERNAME = "CrazyCoderLab"; // حساب X المطلوب متابعته

export const NETWORK = {
    chainId: 97,             // BSC Testnet
    chainName: "BNB Chain Testnet",
    nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
};

// =========================
//         ABI العقد
// =========================

export const ABI = [
    {
        "inputs": [],
        "name": "claimAirdrop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
