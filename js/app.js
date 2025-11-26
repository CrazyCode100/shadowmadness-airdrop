console.log("CrazyCode Airdrop App Loaded");

// ======== إعداد العقد ==========

// عنوان عقدك على BSC Mainnet
const CONTRACT_ADDRESS = "0xE4d658bCCBB1B8e20BD0a81a3726fDF22f1A7997";

// ABI مختصر يحتوي فقط على دالة claimAirdrop
const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "claimAirdrop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// ======== متغيرات عامة ==========
let provider;
let signer;
let contract;

// ======== ربط المحفظة ==========
async function connectWallet() {
    try {
        if (window.ethereum === undefined) {
            alert("⚠ الرجاء تثبيت MetaMask أولاً");
            return;
        }

        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        signer = provider.getSigner();
        const address = await signer.getAddress();

        document.getElementById("status").innerText = `🔗 تم الاتصال: ${address}`;

        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        document.getElementById("claimBtn").disabled = false;
        document.getElementById("claimBtn").innerText = "🎁 المطالبة الآن";

    } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء ربط المحفظة");
    }
}

// ======== تنفيذ المطالبة ==========
async function claimAirdrop() {
    try {
        if (!contract) {
            alert("⚠ الرجاء ربط المحفظة أولاً");
            return;
        }

        document.getElementById("claimBtn").innerText = "⏳ جاري التنفيذ...";

        const tx = await contract.claimAirdrop();

        document.getElementById("claimBtn").innerText = "⏳ جاري التأكيد...";

        await tx.wait();

        document.getElementById("claimBtn").innerText = "🎉 تم استلام التوكن!";
        document.getElementById("claimBtn").disabled = true;

        alert("🎉 تمت المطالبة بالتوكن بنجاح!");

    } catch (err) {
        console.error(err);
        alert("⚠ العملية فشلت. ربما سبق لك المطالبة أو انتهى التوزيع.");
        document.getElementById("claimBtn").innerText = "🎁 المطالبة الآن";
    }
}

// ======== ربط الأزرار ==========
document.getElementById("connectBtn").addEventListener("click", connectWallet);
document.getElementById("claimBtn").addEventListener("click", claimAirdrop);
