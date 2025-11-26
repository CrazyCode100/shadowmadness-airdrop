/* ============================================================
   app.js — المنطق الرئيسي لصفحة التوزيع (Airdrop Page)
   ============================================================ */

import { connectWallet } from "./connect-wallet.js";
import { CONTRACT_ADDRESS, CONTRACT_ABI, TWITTER_USER } from "./config.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

/* ================= عناصر الصفحة ================= */

const followBtn = document.getElementById("followBtn");
const followStatus = document.getElementById("followStatus");

const connectBtn = document.getElementById("connectWalletBtn");
const walletStatus = document.getElementById("walletStatus");

const claimBtn = document.getElementById("claimBtn");
const claimStatus = document.getElementById("claimStatus");

let isFollowed = false;
let userWallet = null;

/* ============================================================
   1 — زر متابعة تويتر
   ============================================================ */

followBtn.addEventListener("click", () => {
    window.open(`https://twitter.com/${TWITTER_USER}`, "_blank");
});

/* ============================================================
   2 — تأكيد المتابعة (بدون API — يدوي)
   ============================================================ */

document.getElementById("confirmFollowBtn").addEventListener("click", () => {
    isFollowed = true;
    followStatus.innerHTML = `<span style="color:#4cff4c;">✔ تم التأكيد أنك تتابع الحساب</span>`;
    claimBtn.classList.remove("disabled");
});

/* ============================================================
   3 — زر ربط المحفظة
   ============================================================ */

connectBtn.addEventListener("click", async () => {
    const w = await connectWallet();
    if (!w) return;

    userWallet = w;
    walletStatus.innerHTML = `<span style="color:#4cff4c;">✔ المحفظة: ${w.substring(0, 6)}...${w.slice(-4)}</span>`;
});

/* ============================================================
   4 — زر المطالبة بالتوكن
   ============================================================ */

claimBtn.addEventListener("click", async () => {
    if (!isFollowed) {
        alert("يجب متابعة حساب تويتر أولاً!");
        return;
    }

    if (!userWallet) {
        alert("يجب ربط المحفظة قبل المطالبة!");
        return;
    }

    try {
        claimStatus.innerHTML = `<span style="color:#ffd966;">⏳ جاري معالجة العملية...</span>`;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // تحقق لمرة واحدة
        const claimed = await contract.hasClaimed(userWallet);
        if (claimed) {
            claimStatus.innerHTML = `<span style="color:#ff6666;">❌ لقد حصلت على التوزيع مسبقاً</span>`;
            return;
        }

        const tx = await contract.claimAirdrop();
        await tx.wait();

        claimStatus.innerHTML = `<span style="color:#4cff4c;">🎉 تمت المطالبة بنجاح!</span>`;

        setTimeout(() => {
            window.location.href = "success.html";
        }, 1200);

    } catch (err) {
        console.error(err);
        claimStatus.innerHTML = `<span style="color:#ff6666;">❌ فشل تنفيذ العملية</span>`;
    }
});
