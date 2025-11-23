/* ============================================================
   claim.js - نظام المطالبة بالتوكن + فحص متابعة تويتر
   ============================================================ */

import { connectWallet } from "./connect-wallet.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

/* ============================================================
   1 — إعداد عقد CrazyCode
   ============================================================ */

const CONTRACT_ADDRESS = "0x2431bB3634b46dE79390CC843de2052298cB9121";

const ABI = [
    "function claimAirdrop() external",
    "function hasClaimed(address) view returns (bool)"
];

/* ============================================================
   2 — عناصر الواجهة
   ============================================================ */

const btnFollow = document.getElementById("followBtn");
const btnCheckFollow = document.getElementById("checkFollowBtn");
const btnClaim = document.getElementById("claimBtn");
const walletBtn = document.getElementById("connectBtn");

const followStatus = document.getElementById("followStatus");
const walletStatus = document.getElementById("walletStatus");
const claimStatus = document.getElementById("claimStatus");

/* ============================================================
   3 — إعداد تويتر
   ============================================================ */

const TWITTER_USERNAME = "CrazyCoderLab";
let userConfirmedFollow = false;

/* ============================================================
   4 — زر المتابعة (فتح حساب تويتر)
   ============================================================ */

btnFollow.addEventListener("click", () => {
    window.open(`https://twitter.com/${TWITTER_USERNAME}`, "_blank");
});

/* ============================================================
   5 — فحص المتابعة — يدوي بدون API
   ============================================================ */

btnCheckFollow.addEventListener("click", () => {
    userConfirmedFollow = true;

    followStatus.innerHTML = `<span style="color:#4cff4c;">✔ تم التأكيد أنك تتابع الحساب</span>`;

    btnCheckFollow.classList.add("disabled");
    btnClaim.classList.remove("disabled");
});

/* ============================================================
   6 — زر ربط المحفظة
   ============================================================ */

walletBtn.addEventListener("click", async () => {
    await connectWallet();
});

/* ============================================================
   7 — زر المطالبة Claim
   ============================================================ */

btnClaim.addEventListener("click", async () => {

    if (btnClaim.classList.contains("disabled")) {
        alert("الرجاء إكمال الخطوات قبل المطالبة!");
        return;
    }

    if (!userConfirmedFollow) {
        alert("يجب متابعة حساب تويتر أولاً!");
        return;
    }

    const user = await connectWallet();
    if (!user) {
        alert("⚠ لم يتم ربط المحفظة!");
        return;
    }

    try {
        claimStatus.innerHTML =
            `<span style="color:#ffdd88;">⏳ جارٍ تنفيذ العملية...</span>`;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        // هل حصل مسبقًا؟
        const claimed = await contract.hasClaimed(user);
        if (claimed) {
            claimStatus.innerHTML =
                `<span style="color:#ff6666;">❌ لقد طالبت مسبقاً</span>`;
            return;
        }

        const tx = await contract.claimAirdrop();
        await tx.wait();

        claimStatus.innerHTML =
            `<span style="color:#4cff4c;">🎉 تمت المطالبة بنجاح!</span>`;

        setTimeout(() => {
            window.location.href = "success.html";
        }, 1200);

    } catch (err) {
        console.error(err);
        claimStatus.innerHTML =
            `<span style="color:#ff6666;">❌ فشل تنفيذ العملية</span>`;
    }
});
