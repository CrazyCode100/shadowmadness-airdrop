/* ===========================================================
   CrazyCode Airdrop Frontend
   - Connect Wallet
   - Check Twitter Follow (via API)
   - Call Smart Contract claimAirdrop()
=========================================================== */

const contractAddress = "0x2431bB3634b46dE79390CC843de2052298cB9121"; 
const contractABI = [
    // ====== claimAirdrop() ======
    {
        "inputs": [],
        "name": "claimAirdrop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },

    // ====== hasClaimed(address) ======
    {
        "inputs": [{"internalType":"address","name":"","type":"address"}],
        "name": "hasClaimed",
        "outputs": [{"internalType":"bool","name":"","type":"bool"}],
        "stateMutability": "view",
        "type": "function"
    },

    // ====== claimCount() ======
    {
        "inputs": [],
        "name": "claimCount",
        "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

let provider;
let signer;
let contract;
let userAddress;

// =============================
// 1. Connect Wallet
// =============================
document.getElementById("connectBtn").onclick = async () => {
    try {
        if (!window.ethereum) {
            document.getElementById("status").innerText =
                "⚠️ الرجاء تثبيت MetaMask أولاً";
            return;
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        userAddress = await signer.getAddress();

        contract = new ethers.Contract(contractAddress, contractABI, signer);

        document.getElementById("status").innerText =
            "🚀 تم ربط المحفظة بنجاح";
        document.getElementById("claimBtn").classList.remove("disabled");

    } catch (err) {
        console.error(err);
        document.getElementById("status").innerText =
            "❌ فشل ربط المحفظة";
    }
};

// =============================
// 2. Claim Airdrop
// =============================
document.getElementById("claimBtn").onclick = async () => {
    if (!signer) {
        document.getElementById("status").innerText =
            "⚠️ الرجاء ربط المحفظة أولاً";
        return;
    }

    // إيقاف الزر
    document.getElementById("claimBtn").classList.add("disabled");

    try {
        // 1) الاتصال بالـ API للتأكد من المتابعة في تويتر
        const response = await fetch(
            `https://shadowmadness-api.vercel.app/check-follow?wallet=${userAddress}`
        );
        const data = await response.json();

        if (!data.following) {
            document.getElementById("status").innerText =
                "❌ يجب متابعة حساب X أولاً: @ShadowMadness_7";
            document.getElementById("claimBtn").classList.remove("disabled");
            return;
        }

        // 2) التأكد من أنك لم تستلم مسبقاً
        const claimed = await contract.hasClaimed(userAddress);
        if (claimed) {
            document.getElementById("status").innerText =
                "⚠️ لقد حصلت على مكافأتك مسبقاً";
            return;
        }

        // 3) تنفيذ المطالبة
        document.getElementById("status").innerText =
            "⏳ يتم الآن تنفيذ العملية…";

        const tx = await contract.claimAirdrop();
        await tx.wait();

        document.getElementById("status").innerText =
            "🎉 تم إرسال المكافأة إلى محفظتك!";

    } catch (err) {
        console.error(err);
        document.getElementById("status").innerText =
            "❌ فشل تنفيذ العملية";
    }

    // إعادة تفعيل الزر
    document.getElementById("claimBtn").classList.remove("disabled");
};
