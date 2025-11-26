/* =====================================================
   claim-airdrop.js — منطق التوزيع المجاني (Airdrop Logic)
   ===================================================== */

import { getProvider } from "./web3modal-config.js";

// عنوان العقد الخاص بك
const CONTRACT_ADDRESS = "0xE4d658bCCBB1B8e20BD0a81a3726fDF22f1A7997";

// ABI الأساسي لدالة claim فقط
const ABI = [
    {
        "inputs": [],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// حساب X المطلوب
const REQUIRED_X_USERNAME = "ShadowMadnessLab";

// زر الكليم
const btn = document.getElementById("claimBtn");

// تشغيل الحدث عند الضغط
btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.innerText = "جارٍ التحقق...";

    try {
        // 1️⃣ — ربط المحفظة عبر web3modal
        const provider = await getProvider();
        if (!provider) {
            btn.disabled = false;
            btn.innerText = "Claim Airdrop";
            return;
        }

        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const userAddress = await signer.getAddress();

        console.log("Connected wallet:", userAddress);

        // 2️⃣ — التحقق من متابعة حساب X
        const isFollowing = await checkTwitterFollow(userAddress);
        if (!isFollowing) {
            alert("⚠ يجب عليك متابعة حساب X قبل المطالبة بالتوكن!");
            btn.disabled = false;
            btn.innerText = "Claim Airdrop";
            return;
        }

        // 3️⃣ — استدعاء العقد
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        btn.innerText = "جارٍ إرسال المعاملة...";

        const tx =
