/* ============================================================
   config.js  
   ملف الإعدادات الأساسية لموقع CRAZYCODE Airdrop
   ============================================================ */

export const CONFIG = {

    /* عنوان عقد العملة على الشبكة */
    CONTRACT_ADDRESS: "0x2431bB3634b46dE79390CC843de2052298cB9121",

    /* ABI المختصر للتعامل مع التوزيع */
    ABI: [
        "function claimAirdrop() external",
        "function hasClaimed(address) view returns (bool)"
    ],

    /* بيانات الحساب المطلوب متابعته */
    TWITTER_USERNAME: "CrazyCoderLab",

    /* اسم المشروع (اختياري) */
    PROJECT_NAME: "CrazyCode Airdrop",

    /* عدد التوكنات عند المطالبة */
    TOKEN_REWARD: 1000,

    /* شبكة BSC Testnet */
    NETWORK: {
        chainId: "0x61",
        chainName: "BNB Smart Chain Testnet",
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        nativeCurrency: {
            name: "tBNB",
            symbol: "tBNB",
            decimals: 18
        },
        blockExplorerUrls: ["https://testnet.bscscan.com"]
    }
};
