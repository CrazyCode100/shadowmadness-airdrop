/* ==========================================================
   claim.js - نظام المطالبة بالتوكن + فحص متابعة تويتر
   ========================================================== */

import { connectWallet } from "./connect-wallet.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

/* ==========================================================
   1 — إعداد عقد CrazyCode
   ========================================================== */

const CONTRACT_ADDRESS = "0x2431bB3634b46dE79390CC843de2052298cB9121";
const ABI = [
    "function claimAirdrop() external",
    "function hasClaimed(address) view returns (bool)"
];

/* ==========================================================
   2 — عناصر الواجهة
   ========================================================== */

const btnFollow = document.getElementById("followTwitterBtn");
const btnCheckFollow = document.getElementById("checkFollowBtn");
const btnClaim = document.getElementById("claimBtn");
const twitterStatus = document.getElementById("twitterStatus");
const claimStatus = document.getElementById("claimStatus");

/* ==========================================================
   3 — بيانات تويتر
   ========================================================== */

const TWITTER_USERNAME = "CrazyCoderLab";
let userConfirmedFollow = false;

/* ==========================================================
   4 — زر المتابعة (ينقل المستخدم لحساب تويتر)
   ========================================================== */

btnFollow.addEventListener("click", () => {
    window.open(`https://twitter.com/${TWITTER_USERNAME}`, "_blank");
});

/* ==========================================================
   5 — فحص المتابعة (يدوياً بدون API)
   ========================================================== */

btnCheckFollow.addEventListener("click", () => {
    userConfirmedFollow = true;

    twitterStatus.innerHTML = `<span style="color:#4cff4c;">✔ تم التأكيد أنك تتابع الحساب</span>`;

    btnCheckFollow.classList.add("disabled");
    btnClaim.classList.remove("disabled");
});

/* ==========================================================
   6 — زر المطالبة Claim
   ========================================================== */

btnClaim.addEventListener("click", async () => {

    if (!userConfirmedFollow) {
        alert("يجب متابعة حساب تويتر قبل المطالبة!");
        return;
    }

    const user = await connectWallet();
    if (!user) {
        alert("لم يتم ربط المحفظة!");
        return;
    }

    try {
        claimStatus.innerHTML = `<span style="color:#ffdd88;">⏳ جارٍ تنفيذ العملية...</span>`;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        // تحقق من أن المستخدم لم يحصل مسبقًا
        const already = await contract.hasClaimed(user);
        if (already) {
            claimStatus.innerHTML = `<span style="color:#ff6666;">❌ لقد حصلت على التوزيع مسبقاً</span>`;
            return;
        }

        const tx = await contract.claimAirdrop();
        await tx.wait();

        claimStatus.innerHTML = `<span style="color:#4cff4c;">🎉 تمت المطالبة بنجاح!</span>`;

        window.location.href = "success.html";

    } catch (err) {
        console.error(err);
        claimStatus.innerHTML = `<span style="color:#ff6666;">❌ فشل تنفيذ العملية</span>`;
    }
});
