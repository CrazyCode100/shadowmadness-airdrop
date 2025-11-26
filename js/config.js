/* ============================================================
   config.js — إعدادات التوزيع + العقد + تويتر
   ============================================================ */

/* ========== 1 — إعدادات تويتر ========== */
export const TWITTER_USER = "CrazyCoderLab";

/* ========== 2 — عنوان عقد CRAZYCODE على BSC Mainnet ========== */
export const CONTRACT_ADDRESS = "0xE4d658bCCBB1B8e20BD0a81a3726fDF22f1A7997";

/* ========== 3 — ABI مبسّط للتوزيع المجاني فقط ========== */
export const CONTRACT_ABI = [
    "function claimAirdrop() external",
    "function hasClaimed(address) view returns (bool)"
];

