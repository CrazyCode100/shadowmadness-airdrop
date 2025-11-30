// إعدادات عامة للتطبيق (كـ متغيرات عالمية)

window.CRAZY_CONFIG = {
    CONTRACT: "0xE4d658bCCBB1B8e20BD0a81a3726fDF22f1A7997", // عقد CRAZYCODE على BSC
    ABI: [
        "function claimAirdrop() external payable",
        "function hasClaimed(address) view returns (bool)"
    ],
    TWITTER: "CrazyCoderLab",
    REQUIRED_GAS_BNB: "0.0001" // قيمة BNB المطلوبة مع المطالبة
};

// حالة الجلسة
window.CRAZY_STATE = {
    provider: null,
    signer: null,
    userAddress: null,
    followed: false
};
