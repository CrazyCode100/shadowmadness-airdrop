import { ethers } from "https://esm.sh/ethers";
import { CONTRACT_ADDRESS, ABI, TWITTER_USERNAME } from "../config/config.js";
import { signer } from "./connect-wallet.js";

async function userFollowsTwitter(username) {
    return confirm(`هل تابعت حساب X @${username} ؟`);
}

document.getElementById("claimBtn").onclick = async () => {

    if (!signer) return alert("يجب ربط المحفظة أولاً");

    const ok = await userFollowsTwitter(TWITTER_USERNAME);
    if (!ok) return alert("يجب متابعة حساب X قبل المطالبة!");

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    try {
        const tx = await contract.claimAirdrop();
        alert("تم إرسال العملية… يرجى الانتظار");
        await tx.wait();
        alert("🎉 تم استلام مكافأتك بنجاح!");
    } catch (err) {
        alert("حدث خطأ: " + err.message);
    }
};
